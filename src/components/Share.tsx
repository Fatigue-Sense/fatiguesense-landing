import { useState, useEffect, useRef, useCallback } from "react";
import { submitFeedback, submitSuggestion } from "../lib/api";
import { useFormSubmit } from "../hooks/useFormSubmit";

const STARS = [1, 2, 3, 4, 5];

type Tab = "feedback" | "ideas";

// ---- shared input classes ----
const textareaCls =
	"font-display text-[15px] text-text1 bg-bg2 border border-line2 rounded-lg py-4 px-[18px] outline-none resize-y min-h-[100px] transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]";

const inputCls =
	"flex-1 font-display text-[15px] text-text1 bg-bg2 border border-line2 py-3.5 px-[18px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0";

const btnCls =
	"signup-btn-hover font-display text-[15px] font-semibold text-white bg-accent border-none py-3.5 px-7 cursor-pointer whitespace-nowrap transition-[background,transform] duration-[0.25s,0.15s] rounded-lg sm:rounded-l-none sm:rounded-r-lg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed";

// ---- tab config ----
const TABS: { key: Tab; label: string }[] = [
	{ key: "feedback", label: "Feedback" },
	{ key: "ideas", label: "Ideas" },
];

// ---- pill toggle ----
function TabToggle({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
	return (
		<div className="inline-flex bg-bg2 border border-line2 rounded-lg p-1 gap-1">
			{TABS.map((t) => (
				<button
					key={t.key}
					type="button"
					onClick={() => onChange(t.key)}
					className={`font-display text-[13px] font-medium px-4 py-2 rounded-md transition-all duration-200 cursor-pointer border-none ${
						active === t.key
							? "bg-accent text-white shadow-[0_1px_3px_rgba(124,131,247,0.25)]"
							: "bg-transparent text-text3 hover:text-text2"
					}`}
				>
					{t.label}
				</button>
			))}
		</div>
	);
}

// ---- feedback form (with stars) ----
function FeedbackForm() {
	const [msg, setMsg] = useState("");
	const [email, setEmail] = useState("");
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [ratingError, setRatingError] = useState<string | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const submitForm = useCallback(
		async (payload: { rating: number; message: string; email?: string }) =>
			submitFeedback(payload),
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
			setMsg("");
			setEmail("");
			setRating(0);
			reset();
		}, 4000);
	}, [submitted, reset]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (rating === 0) {
			setRatingError("Please select a rating before submitting.");
			return;
		}
		setRatingError(null);
		await submit({
			rating,
			message: msg,
			email: email.trim() || undefined,
		});
	};

	const active = hover || rating;

	return (
		<form className="flex flex-col gap-5 max-w-[520px] mx-auto text-left" onSubmit={handleSubmit}>
			{/* stars */}
			<div className="flex flex-col items-center gap-1">
				<div className="flex items-center justify-center gap-1">
					{STARS.map((n) => (
						<button
							key={n}
							type="button"
							aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
							onClick={() => {
								setRating(n);
								setRatingError(null);
							}}
							onMouseEnter={() => setHover(n)}
							onMouseLeave={() => setHover(0)}
							className="p-1 cursor-pointer bg-transparent border-none transition-transform duration-150 hover:scale-115 active:scale-95"
							disabled={loading || submitted}
						>
							<svg
								viewBox="0 0 24 24"
								className="w-8 h-8 transition-[fill,stroke] duration-200"
								fill={
									n <= active
										? "var(--color-warn)"
										: "none"
								}
								stroke={
									n <= active
										? "var(--color-warn)"
										: "var(--color-text4)"
								}
								strokeWidth="1.5"
							>
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
							</svg>
						</button>
					))}
					<span className="font-mono text-xs text-text3 ml-2 w-8 tabular-nums">
						{rating > 0 ? `${rating}/5` : ""}
					</span>
				</div>
				{ratingError && (
					<p className="font-display text-sm text-danger">
						{ratingError}
					</p>
				)}
			</div>

			<textarea
				className={textareaCls}
				placeholder="What did you think of FatigueSense? Any features you would want to see?"
				required
				aria-label="Your feedback"
				value={msg}
				onChange={(e) => setMsg(e.target.value)}
				disabled={loading || submitted}
			/>

			<div className="flex flex-col sm:flex-row gap-2.5 sm:gap-0">
				<input
					className={inputCls}
					type="email"
					placeholder="you@example.com (optional)"
					aria-label="Email address"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={loading || submitted}
				/>
				<button
					className={btnCls}
					type="submit"
					disabled={loading || submitted}
				>
					{loading
						? "Sending..."
						: submitted
							? "Sent"
							: "Send feedback"}
				</button>
			</div>

			{error && (
				<p className="font-display text-sm text-danger">
					{error}
				</p>
			)}
			{submitted && !error && (
				<p className="font-display text-sm text-ok text-center animate-[fade-in_0.4s_ease]">
					Thanks for your feedback. We appreciate it.
				</p>
			)}
		</form>
	);
}

// ---- ideas form ----
function IdeasForm() {
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
			suggestion,
			email: email.trim() || undefined,
		});
	};

	return (
		<form className="flex flex-col gap-5 max-w-[520px] mx-auto text-left" onSubmit={handleSubmit}>
			<textarea
				className={textareaCls}
				placeholder="e.g. A mobile app, Google Calendar integration, dark mode scheduling..."
				required
				aria-label="Your suggestion"
				value={suggestion}
				onChange={(e) => setSuggestion(e.target.value)}
				disabled={loading || submitted}
			/>

			<div className="flex flex-col sm:flex-row gap-2.5 sm:gap-0">
				<input
					className={inputCls}
					type="email"
					placeholder="you@example.com (optional)"
					aria-label="Email address"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={loading || submitted}
				/>
				<button
					className={btnCls}
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

			{error && (
				<p className="font-display text-sm text-danger">
					{error}
				</p>
			)}
			{submitted && !error && (
				<p className="font-display text-sm text-ok text-center animate-[fade-in_0.4s_ease]">
					Thanks for the suggestion. We appreciate it.
				</p>
			)}
		</form>
	);
}

// ---- share section ----
export default function Share() {
	const [tab, setTab] = useState<Tab>("feedback");

	return (
		<section
			className="py-[clamp(80px,11vh,128px)] border-t border-line text-center"
			id="share"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<p
					className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.25] tracking-[-0.03em] text-text1 mb-3.5"
					data-animate="fade-up"
				>
					Share your thoughts.
				</p>
				<p
					className="font-display text-[15px] text-text2 mb-3 max-w-[500px] mx-auto"
					data-animate="fade-up"
				>
					{tab === "feedback"
						? "Saw the showcase? Tell us what you think - questions, ideas, or criticism, all welcome."
						: "Got a feature idea or something you wish FatigueSense could do? Tell us - we read every one."}
				</p>

				<div className="mb-9 flex justify-center" data-animate="fade-up">
					<TabToggle active={tab} onChange={setTab} />
				</div>

				<div data-animate="fade-up" key={tab}>
					{tab === "feedback" ? <FeedbackForm /> : <IdeasForm />}
				</div>
			</div>
		</section>
	);
}
