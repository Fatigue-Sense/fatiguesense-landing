import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ---- env ------------------------------------------------------------
let envLoaded = false;

async function loadLocalEnv(): Promise<void> {
	if (envLoaded) return;
	envLoaded = true;
	if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;

	// dotenv only loaded when env vars are missing (local dev on Windows)
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

type WaitlistSource = "hero" | "signup";

function isWaitlistSource(value: unknown): value is WaitlistSource {
	return value === "hero" || value === "signup";
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

// ---- rate limit -------------------------------------------------------
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, route: string): boolean {
	const key = `${route}:${ip}`;
	const now = Date.now();
	const entry = rateMap.get(key);
	if (!entry || now > entry.resetAt) {
		rateMap.set(key, { count: 1, resetAt: now + 60_000 });
		return true;
	}
	if (entry.count >= 5) return false;
	entry.count++;
	return true;
}

// ---- handler --------------------------------------------------------
const ROUTE = "waitlist";

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
		const { email, source } = req.body ?? {};
		logInfo(ROUTE, "Parsed body", { email: typeof email === "string" ? email : null, source });

		if (typeof email !== "string" || !isValidEmail(email)) {
			logInfo(ROUTE, "Validation failed: invalid email");
			return res.status(400).json({ error: "Please enter a valid email address." });
		}

		if (!isWaitlistSource(source)) {
			logInfo(ROUTE, "Validation failed: invalid source", { source });
			return res.status(400).json({ error: "Invalid signup source." });
		}

		const normalized = normalizeEmail(email);
		logInfo(ROUTE, "Inserting into Supabase", { email: normalized, source });

		const supabase = getSupabase();

		const { data, error } = await supabase
			.from("waitlist_signups")
			.insert({ email: normalized, source })
			.select("id")
			.single();

		if (error) {
			if (error.code === "23505") {
				logInfo(ROUTE, "Duplicate email", { email: normalized });
				return res.status(409).json({ error: "This email is already on the waitlist." });
			}
			logError(ROUTE, "Supabase insert failed", error);
			return errorResponse(res, 500, "Something went wrong. Please try again.", {
				code: error.code,
				message: error.message,
				hint: error.hint,
			});
		}

		logInfo(ROUTE, "Insert succeeded", { id: data?.id });
		logInfo(ROUTE, "Request completed successfully");
		return res.status(200).json({ ok: true });
	} catch (err) {
		logError(ROUTE, "Unhandled error", err);
		return errorResponse(res, 500, "Something went wrong. Please try again.", {
			message: err instanceof Error ? err.message : String(err),
		});
	}
}
