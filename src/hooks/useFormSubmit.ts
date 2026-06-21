import { useCallback, useState } from "react";

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

			try {
				await submitFn(...args);
				setSubmitted(true);
			} catch (err) {
				setSubmitted(false);
				setError(
					err instanceof Error
						? err.message
						: "Something went wrong. Please try again.",
				);
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
