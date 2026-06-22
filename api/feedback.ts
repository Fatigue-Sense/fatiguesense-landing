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

// ---- handler --------------------------------------------------------
const ROUTE = "feedback";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	await loadLocalEnv();
	logInfo(ROUTE, "Request received", { method: req.method, hasBody: req.body != null, bodyType: typeof req.body });

	if (handleOptions(req, res)) return;
	if (methodNotAllowed(req, res)) return;

	setCors(res);

	try {
		const { rating, message, email } = req.body ?? {};
		logInfo(ROUTE, "Parsed body", { rating, messageLength: typeof message === "string" ? message.length : 0, hasEmail: Boolean(email) });

		const ratingNum = Number(rating);
		if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
			logInfo(ROUTE, "Validation failed: invalid rating", { rating });
			return res.status(400).json({ error: "Please select a rating from 1 to 5." });
		}

		if (typeof message !== "string" || message.trim().length === 0) {
			logInfo(ROUTE, "Validation failed: empty message");
			return res.status(400).json({ error: "Please enter your feedback." });
		}

		if (message.trim().length > 5000) {
			return res.status(400).json({ error: "Feedback is too long." });
		}

		let submitterEmail: string | null = null;
		if (email !== undefined && email !== null && email !== "") {
			if (typeof email !== "string" || !isValidEmail(email)) {
				return res.status(400).json({ error: "Please enter a valid email address." });
			}
			submitterEmail = normalizeEmail(email);
		}

		logInfo(ROUTE, "Inserting into Supabase", { rating: ratingNum });

		const supabase = getSupabase();

		const { error } = await supabase.from("feedback").insert({
			rating: ratingNum,
			message: message.trim(),
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
