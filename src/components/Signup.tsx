import { useState } from "react";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => {
			setEmail("");
		}, 3000);
	};

	return (
		<section
			className="py-[clamp(96px,14vh,160px)] text-center"
			id="signup"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<p
					className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.3] tracking-[-0.03em] text-text1 mb-3.5"
					data-animate="fade-up"
				>
					Still in development.
				</p>
				<p
					className="font-display text-[15px] text-text2 mb-9"
					data-animate="fade-up"
				>
					FatigueSense is not yet available for public use. Leave
					your email and we will notify you when it launches. One
					email, no spam.
				</p>
				<form
					className="flex flex-col sm:flex-row gap-2.5 sm:gap-0 max-w-[460px] mx-auto"
					data-animate="fade-up"
					onSubmit={handleSubmit}
				>
					<input
						className="flex-1 font-display text-[15px] text-text1 bg-bg2 border border-line2 py-[15px] px-5 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0"
						type="email"
						placeholder="you@example.com"
						required
						aria-label="Email address"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						className="signup-btn-hover font-display text-[15px] font-semibold text-white bg-accent border-none py-[15px] px-8 cursor-pointer whitespace-nowrap transition-[background,transform,box-shadow] duration-[0.25s,0.15s,0.25s] rounded-lg sm:rounded-l-none sm:rounded-r-lg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
						type="submit"
						disabled={submitted}
					>
						{submitted ? "You're in" : "Stay updated"}
					</button>
				</form>
				{submitted && (
					<p className="font-display text-sm text-ok mt-4">
						You are on the list. We will be in touch.
					</p>
				)}
			</div>
		</section>
	);
}
