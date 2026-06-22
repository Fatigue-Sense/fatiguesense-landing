import { useCallback, useState } from "react";
import { ApiError } from "../lib/api";
import { logError, logInfo } from "../lib/logger";

export function useFormSubmit<T extends unknown[]>(
	submitFn: (...args: T) => Promise<void>,
) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const submit = useCallback(
		async (...args: T) => {
			setLoading(true);
			setError(null);
			logInfo("Form submit started");

			try {
				await submitFn(...args);
				setSubmitted(true);
				logInfo("Form submit succeeded");
			} catch (err) {
				setSubmitted(false);
				const message =
					err instanceof Error
						? err.message
						: "Something went wrong. Please try again.";
				setError(message);
				logError("Form submit failed", err);
				if (err instanceof ApiError && err.debug) {
					logError("API debug details", err.debug);
				}
			} finally {
				setLoading(false);
			}
		},
		[submitFn],
	);

	const reset = useCallback(() => {
		setSubmitted(false);
		setError(null);
	}, []);

	return { loading, error, submitted, submit, reset, setSubmitted };
}
