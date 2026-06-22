const PREFIX = "[api]";

export function logInfo(route: string, message: string, data?: Record<string, unknown>) {
	const payload = data ? ` ${JSON.stringify(data)}` : "";
	console.log(`${PREFIX} [${route}] ${message}${payload}`);
}

export function logError(route: string, message: string, err?: unknown) {
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

export function isDev(): boolean {
	return process.env.VERCEL_ENV !== "production" && process.env.NODE_ENV !== "production";
}

export function errorResponse(
	res: { status: (code: number) => { json: (body: unknown) => void } },
	status: number,
	userMessage: string,
	debug?: unknown,
) {
	const body: { error: string; debug?: unknown } = { error: userMessage };
	if (isDev() && debug !== undefined) {
		body.debug = debug;
	}
	return res.status(status).json(body);
}
