import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
	return EMAIL_RE.test(email);
}

export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

export type WaitlistSource = "hero" | "signup";

export function isWaitlistSource(value: unknown): value is WaitlistSource {
	return value === "hero" || value === "signup";
}

export function setCors(res: VercelResponse) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handleOptions(req: VercelRequest, res: VercelResponse): boolean {
	if (req.method === "OPTIONS") {
		setCors(res);
		res.status(204).end();
		return true;
	}
	return false;
}

export function methodNotAllowed(
	req: VercelRequest,
	res: VercelResponse,
): boolean {
	if (req.method !== "POST") {
		setCors(res);
		res.status(405).json({ error: "Method not allowed" });
		return true;
	}
	return false;
}
