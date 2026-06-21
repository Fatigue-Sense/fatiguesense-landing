import { useState } from "react";

const inputCls =
	"flex-1 font-display text-[15px] text-text1 bg-bg2 border border-line2 py-3.5 px-[18px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0";

const STARS = [1, 2, 3, 4, 5];

export default function Feedback() {
	const [msg, setMsg] = useState("");
	const [email, setEmail] = useState("");
	const [rating, setRating] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => {
			setMsg("");
			setEmail("");
			setRating(0);
			setSubmitted(false);
		}, 4000);
	};

	return (
		<section
			className="py-[clamp(80px,11vh,128px)] border-t border-line text-center"
			id="feedback"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<p
					className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text3"
					data-animate="fade-up"
				>
					Feedback
				</p>
				<p
					className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.25] tracking-[-0.03em] text-text1 mb-3.5"
					data-animate="fade-up"
				>
					Saw the showcase? Tell us what you think.
				</p>
				<p
					className="font-display text-[15px] text-text2 mb-9 max-w-[500px] mx-auto"
					data-animate="fade-up"
				>
					Your thoughts help shape what FatigueSense becomes.
					Questions, ideas, or criticism - all welcome.
				</p>
				<form
					className="flex flex-col gap-3 max-w-[520px] mx-auto text-left"
					data-animate="fade-up"
					onSubmit={handleSubmit}
				>
					{/* Star rating */}
					<div className="flex items-center gap-1.5">
						{STARS.map((n) => (
							<button
								key={n}
								type="button"
								aria-label={`${n} star${n > 1 ? "s" : ""}`}
								onClick={() => setRating(n)}
								className="p-0.5 cursor-pointer bg-transparent border-none transition-transform duration-150 hover:scale-110 active:scale-95"
							>
								<svg
									viewBox="0 0 24 24"
									className="w-7 h-7"
									fill={n <= rating ? "var(--color-warn)" : "none"}
									stroke={
										n <= rating
											? "var(--color-warn)"
											: "var(--color-text3)"
									}
									strokeWidth="1.5"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
								</svg>
							</button>
						))}
						{rating > 0 && (
							<span className="font-display text-[13px] text-text3 ml-2">
								{rating}/5
							</span>
						)}
					</div>

					<textarea
						className="font-display text-[15px] text-text1 bg-bg2 border border-line2 rounded-lg py-4 px-[18px] outline-none resize-y min-h-[120px] transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]"
						placeholder="What did you think of FatigueSense? Any features you would want to see?"
						required
						aria-label="Your feedback"
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
					/>
					<div className="flex flex-col sm:flex-row gap-2.5 sm:gap-0">
						<input
							className={inputCls}
							type="email"
							placeholder="you@example.com"
							aria-label="Email address"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							className="signup-btn-hover font-display text-[15px] font-semibold text-white bg-accent border-none py-3.5 px-7 cursor-pointer whitespace-nowrap transition-[background,transform] duration-[0.25s,0.15s] rounded-lg sm:rounded-l-none sm:rounded-r-lg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
							type="submit"
							disabled={submitted}
						>
							{submitted ? "Sent" : "Send feedback"}
						</button>
					</div>
				</form>
				{submitted && (
					<p className="font-display text-sm text-ok mt-4">
						Thanks for your feedback. We appreciate it.
					</p>
				)}
			</div>
		</section>
	);
}
