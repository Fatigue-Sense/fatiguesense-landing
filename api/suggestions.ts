import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ---- env ------------------------------------------------------------
let envLoaded = false;

async function loadLocalEnv(): Promise<void> {
	if (envLoaded) return;
	envLoaded = true;
	if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;

	const { config } = await import("dotenv");
	const { resolve } = await import("node:path");
	const root = process.cwd();
	config({ path: resolve(root, ".env.local") });
	config({ path: resolve(root, ".env") });
}

// ---- log ------------------------------------------------------------
const PREFIX = "[api]";

function logInfo(route: string, message: string, data?: Record<string, unknown>) {
	const payload = data ? ` ${JSON.stringify(data)}` : "";
	console.log(`${PREFIX} [${route}] ${message}${payload}`);
}

function logError(route: string, message: string, err?: unknown) {
	if (err instanceof Error) {
		console.error(`${PREFIX} [${route}] ${message}`, {
			name: err.name,
			message: err.message,
			stack: err.stack,
		});
		return;
	}
	console.error(`${PREFIX} [${route}] ${message}`, err);
}

function isDev(): boolean {
	return process.env.VERCEL_ENV !== "production" && process.env.NODE_ENV !== "production";
}

function errorResponse(
	res: { status: (code: number) => { json: (body: unknown) => void } },
	status: number,
	userMessage: string,
	debug?: unknown,
) {
	const body: { error: string; debug?: unknown } = { error: userMessage };
	if (isDev() && debug !== undefined) body.debug = debug;
	return res.status(status).json(body);
}

// ---- supabase -------------------------------------------------------
function getSupabase() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
	logInfo("supabase", "Initializing client", { hasUrl: Boolean(url), hasServiceRoleKey: Boolean(key) });
	if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
	return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// ---- validate -------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
	return EMAIL_RE.test(email);
}

function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

function setCors(res: VercelResponse) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function handleOptions(req: VercelRequest, res: VercelResponse): boolean {
	if (req.method === "OPTIONS") {
		setCors(res);
		res.status(204).end();
		return true;
	}
	return false;
}

function methodNotAllowed(req: VercelRequest, res: VercelResponse): boolean {
	if (req.method !== "POST") {
		setCors(res);
		res.status(405).json({ error: "Method not allowed" });
		return true;
	}
	return false;
}

// ---- rate limit (file-based, survives vercel dev isolation) -----------
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const RATE_DIR = join(tmpdir(), "fatiguesense-rate");
const RATE_WINDOW = 60_000;
const RATE_MAX = 5;

function ensureRateDir() {
	if (!existsSync(RATE_DIR)) mkdirSync(RATE_DIR, { recursive: true });
}

function rateFilePath(route: string, ip: string): string {
	return join(RATE_DIR, `${route}_${ip.replace(/[^a-zA-Z0-9]/g, "_")}.json`);
}

interface RateEntry {
	count: number;
	resetAt: number;
}

function checkRateLimit(ip: string, route: string): boolean {
	try {
		ensureRateDir();
		const fp = rateFilePath(route, ip);
		const now = Date.now();
		let entry: RateEntry;
		if (existsSync(fp)) {
			entry = JSON.parse(readFileSync(fp, "utf-8")) as RateEntry;
		} else {
			entry = { count: 0, resetAt: now + RATE_WINDOW };
		}
		if (now > entry.resetAt) {
			entry = { count: 0, resetAt: now + RATE_WINDOW };
		}
		if (entry.count >= RATE_MAX) {
			writeFileSync(fp, JSON.stringify(entry));
			return false;
		}
		entry.count++;
		writeFileSync(fp, JSON.stringify(entry));
		return true;
	} catch {
		return true; // fail open if filesystem has issues
	}
}

// ---- handler --------------------------------------------------------
const ROUTE = "suggestions";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	await loadLocalEnv();
	logInfo(ROUTE, "Request received", { method: req.method, hasBody: req.body != null, bodyType: typeof req.body });

	if (handleOptions(req, res)) return;
	if (methodNotAllowed(req, res)) return;

	setCors(res);

	const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
	if (!checkRateLimit(ip, ROUTE)) {
		return res.status(429).json({ error: "Too many requests. Please wait a moment." });
	}

	try {
		const { suggestion, email } = req.body ?? {};
		logInfo(ROUTE, "Parsed body", { suggestionLength: typeof suggestion === "string" ? suggestion.length : 0, hasEmail: Boolean(email) });

		if (typeof suggestion !== "string" || suggestion.trim().length === 0) {
			logInfo(ROUTE, "Validation failed: empty suggestion");
			return res.status(400).json({ error: "Please enter your suggestion." });
		}

		if (suggestion.trim().length > 5000) {
			return res.status(400).json({ error: "Suggestion is too long." });
		}

		let submitterEmail: string | null = null;
		if (email !== undefined && email !== null && email !== "") {
			if (typeof email !== "string" || !isValidEmail(email)) {
				return res.status(400).json({ error: "Please enter a valid email address." });
			}
			submitterEmail = normalizeEmail(email);
		}

		logInfo(ROUTE, "Inserting into Supabase");

		const supabase = getSupabase();

		const { error } = await supabase.from("suggestions").insert({
			suggestion: suggestion.trim(),
			email: submitterEmail,
		});

		if (error) {
			logError(ROUTE, "Supabase insert failed", error);
			return errorResponse(res, 500, "Something went wrong. Please try again.", {
				code: error.code,
				message: error.message,
				hint: error.hint,
			});
		}

		logInfo(ROUTE, "Insert succeeded");
		logInfo(ROUTE, "Request completed successfully");
		return res.status(200).json({ ok: true });
	} catch (err) {
		logError(ROUTE, "Unhandled error", err);
		return errorResponse(res, 500, "Something went wrong. Please try again.", {
			message: err instanceof Error ? err.message : String(err),
		});
	}
}
