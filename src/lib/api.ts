export type WaitlistSource = "hero" | "signup";

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

async function parseResponse(res: Response): Promise<void> {
	if (res.ok) return;

	let message = "Something went wrong. Please try again.";
	try {
		const data = await res.json();
		if (typeof data.error === "string") message = data.error;
	} catch {
		// ignore parse errors
	}
	throw new ApiError(message, res.status);
}

export async function submitWaitlist(
	email: string,
	source: WaitlistSource,
): Promise<void> {
	const res = await fetch("/api/waitlist", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, source }),
	});

	await parseResponse(res);
}

export async function submitFeedback(opts: {
	rating: number;
	message: string;
	email?: string;
}): Promise<void> {
	const res = await fetch("/api/feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(opts),
	});

	await parseResponse(res);
}
