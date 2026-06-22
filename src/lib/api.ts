import { logError, logInfo } from "./logger";

export type WaitlistSource = "hero" | "signup";

export class ApiError extends Error {
	status: number;
	debug?: unknown;

	constructor(message: string, status: number, debug?: unknown) {
		super(message);
		this.status = status;
		this.debug = debug;
	}
}

async function parseResponse(res: Response, endpoint: string): Promise<void> {
	const contentType = res.headers.get("content-type") ?? "";
	const raw = await res.text();

	logInfo(`Response from ${endpoint}`, {
		status: res.status,
		statusText: res.statusText,
		contentType,
		bodyPreview: raw.slice(0, 300),
	});

	if (res.ok) return;

	let message = "Something went wrong. Please try again.";
	let debug: unknown;

	if (contentType.includes("application/json")) {
		try {
			const data = JSON.parse(raw) as { error?: string; debug?: unknown };
			if (typeof data.error === "string") message = data.error;
			debug = data.debug;
		} catch {
			message = `Invalid JSON from API (${res.status}).`;
		}
	} else if (raw.trimStart().startsWith("<!")) {
		message =
			"API returned HTML instead of JSON. The /api route may not be running — use npm run dev:api or check Vercel dev.";
		debug = { hint: "Start with npm run dev:api, not npm run dev alone." };
	} else if (raw) {
		message = `API error (${res.status}): ${raw.slice(0, 120)}`;
	} else {
		message = `API error (${res.status} ${res.statusText}).`;
	}

	logError(`Request to ${endpoint} failed`, { status: res.status, message, debug });
	throw new ApiError(message, res.status, debug);
}

async function postJson(endpoint: string, body: unknown): Promise<void> {
	logInfo(`POST ${endpoint}`, { body });

	const res = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	await parseResponse(res, endpoint);
	logInfo(`POST ${endpoint} succeeded`);
}

export async function submitWaitlist(
	email: string,
	source: WaitlistSource,
): Promise<void> {
	await postJson("/api/waitlist", { email, source });
}

export async function submitFeedback(opts: {
	rating: number;
	message: string;
	email?: string;
}): Promise<void> {
	await postJson("/api/feedback", opts);
}
