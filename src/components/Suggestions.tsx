import { useState, useEffect, useRef, useCallback } from "react";
import { submitSuggestion } from "../lib/api";
import { useFormSubmit } from "../hooks/useFormSubmit";

export default function Suggestions() {
	const [suggestion, setSuggestion] = useState("");
	const [email, setEmail] = useState("");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const submitForm = useCallback(
		async (payload: { suggestion: string; email?: string }) =>
			submitSuggestion(payload),
		[],
	);
	const { loading, error, submitted, submit, reset } =
		useFormSubmit(submitForm);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (!submitted) return;
		timerRef.current = setTimeout(() => {
			setSuggestion("");
			setEmail("");
			reset();
		}, 4000);
	}, [submitted, reset]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await submit({
			suggestion: suggestion,
			email: email.trim() || undefined,
		});
	};

	return (
		<section
			className="py-[clamp(72px,10vh,120px)] border-t border-line text-center"
			id="suggestions"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<p
					className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.25] tracking-[-0.03em] text-text1 mb-3.5"
					data-animate="fade-up"
				>
					What should we build next?
				</p>
				<p
					className="font-display text-[15px] text-text2 mb-9 max-w-[500px] mx-auto"
					data-animate="fade-up"
				>
					Got a feature idea or something you wish FatigueSense could do?
					Tell us - we read every one.
				</p>
				<form
					className="flex flex-col gap-5 max-w-[520px] mx-auto text-left"
					data-animate="fade-up"
					onSubmit={handleSubmit}
				>
					<textarea
						className="font-display text-[15px] text-text1 bg-bg2 border border-line2 rounded-lg py-4 px-[18px] outline-none resize-y min-h-[100px] transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]"
						placeholder="e.g. A mobile app, Google Calendar integration, dark mode scheduling..."
						required
						aria-label="Your suggestion"
						value={suggestion}
						onChange={(e) => setSuggestion(e.target.value)}
						disabled={loading || submitted}
					/>
					<div className="flex flex-col sm:flex-row gap-2.5 sm:gap-0">
						<input
							className="flex-1 font-display text-[15px] text-text1 bg-bg2 border border-line2 py-3.5 px-[18px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0"
							type="email"
							placeholder="you@example.com (optional)"
							aria-label="Email address"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading || submitted}
						/>
						<button
							className="signup-btn-hover font-display text-[15px] font-semibold text-white bg-accent border-none py-3.5 px-7 cursor-pointer whitespace-nowrap transition-[background,transform] duration-[0.25s,0.15s] rounded-lg sm:rounded-l-none sm:rounded-r-lg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
							type="submit"
							disabled={loading || submitted}
						>
							{loading
								? "Sending..."
								: submitted
									? "Sent"
									: "Send suggestion"}
						</button>
					</div>
				</form>
				{error && (
					<p className="font-display text-sm text-danger mt-4">
						{error}
					</p>
				)}
				{submitted && !error && (
					<p className="font-display text-sm text-ok mt-4 animate-[fade-in_0.4s_ease]">
						Thanks for the suggestion. We appreciate it.
					</p>
				)}
			</div>
		</section>
	);
}
