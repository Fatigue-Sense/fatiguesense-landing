const PREFIX = "[FatigueSense]";

export function logInfo(message: string, data?: Record<string, unknown>) {
	if (data) {
		console.info(`${PREFIX} ${message}`, data);
	} else {
		console.info(`${PREFIX} ${message}`);
	}
}

export function logError(message: string, err?: unknown) {
	if (err instanceof Error) {
		console.error(`${PREFIX} ${message}`, {
			name: err.name,
			message: err.message,
			stack: err.stack,
		});
		return;
	}
	console.error(`${PREFIX} ${message}`, err);
}
