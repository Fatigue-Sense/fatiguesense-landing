import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitWaitlist } from "../lib/api";
import { useFormSubmit } from "../hooks/useFormSubmit";

gsap.registerPlugin(ScrollTrigger);

const inputCls =
	"flex-1 font-display text-[15px] text-text1 bg-bg2 border border-line2 py-3.5 px-[18px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-text4 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0";

const btnCls =
	"signup-btn-hover font-display text-[15px] font-semibold text-white bg-accent border-none py-3.5 px-7 cursor-pointer whitespace-nowrap transition-[background,transform,box-shadow] duration-[0.25s,0.15s,0.25s] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg sm:rounded-l-none sm:rounded-r-lg";

export default function Hero() {
	const [email, setEmail] = useState("");
	const headlineRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);

	const submitHero = useCallback(
		async (address: string) => submitWaitlist(address, "hero"),
		[],
	);
	const { loading, error, submitted, submit } = useFormSubmit(submitHero);

	useEffect(() => {
		if (!submitted) return;
		const timer = setTimeout(() => setEmail(""), 3000);
		return () => clearTimeout(timer);
	}, [submitted]);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		tl.to([headlineRef.current, subtitleRef.current, formRef.current], {
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.12,
		}).to(
			previewRef.current,
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1.0,
				ease: "power2.out",
			},
			"-=0.3",
		);

		gsap.set([headlineRef.current, subtitleRef.current, formRef.current], {
			opacity: 0,
			y: 28,
		});
		gsap.set(previewRef.current, { opacity: 0, y: 60, scale: 0.96 });

		const st = ScrollTrigger.create({
			trigger: "#hero",
			start: "top top",
			end: "bottom top",
			onUpdate: (self) => {
				const p = self.progress;
				gsap.to(previewRef.current, {
					y: p * 40,
					scale: 1 - p * 0.03,
					opacity: 1 - p * 0.6,
					duration: 0,
					overwrite: true,
				});
			},
		});

		return () => {
			tl.kill();
			st.kill();
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await submit(email);
	};

	return (
		<section
			className="relative min-h-dvh flex flex-col items-center justify-start pt-[clamp(120px,18vh,168px)] overflow-hidden"
			id="hero"
		>
			<div className="text-center max-w-[720px] px-6 relative z-[2]">
				<h1
					className="font-display text-[clamp(32px,5.8vw,56px)] font-semibold leading-[1.08] tracking-[-0.04em] text-text1 mb-[clamp(20px,3vh,32px)] opacity-0"
					ref={headlineRef}
				>
					Mental fatigue monitoring for people who{" "}
					<em className="not-italic text-accent">cannot afford to drift</em>.
				</h1>

				<p
					className="font-display text-[clamp(16px,2.1vw,18px)] leading-[1.65] text-text2 max-w-[540px] mx-auto mb-[clamp(36px,5vh,52px)] opacity-0"
					ref={subtitleRef}
				>
					Real-time cognitive state tracking through your webcam. No
					wearables, no hardware. Currently in development — not yet
					available for public use.
				</p>

				<form
					className="flex flex-col sm:flex-row gap-2.5 sm:gap-0 max-w-[420px] mx-auto opacity-0"
					id="hero-waitlist"
					ref={formRef}
					onSubmit={handleSubmit}
				>
					<input
						className={inputCls}
						id="waitlist-email"
						type="email"
						placeholder="you@example.com"
						required
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
							? "Joining..."
							: submitted
								? "You're in"
								: "Stay updated"}
					</button>
				</form>
				{error && (
					<p className="font-display text-sm text-danger text-center mt-2.5">
						{error}
					</p>
				)}
				{submitted && !error && (
					<p className="font-display text-sm text-ok text-center mt-2.5">
						You are on the list. We will be in touch.
					</p>
				)}
			</div>

			<div
				className="w-full max-w-[640px] mt-[clamp(48px,8vh,80px)] px-6 relative z-[1] opacity-0"
				ref={previewRef}
			>
				<div className="hero-preview relative aspect-[16/10] bg-bg2 border border-line rounded-2xl overflow-hidden">
					<div className="hero-preview-glow absolute inset-0 pointer-events-none" />
					<div className="absolute inset-0 flex items-center justify-center">
						<svg
							viewBox="0 0 120 120"
							className="w-[min(40%,140px)] h-auto"
							aria-hidden
						>
							<circle
								cx="60"
								cy="60"
								r="48"
								fill="none"
								stroke="var(--color-bg3)"
								strokeWidth="8"
							/>
							<circle
								cx="60"
								cy="60"
								r="48"
								fill="none"
								stroke="var(--color-ok)"
								strokeWidth="8"
								strokeDasharray="226 75"
								strokeDashoffset="-20"
								strokeLinecap="round"
								transform="rotate(-90 60 60)"
							/>
							<text
								x="60"
								y="56"
								textAnchor="middle"
								fill="var(--color-text1)"
								fontFamily="Space Grotesk, sans-serif"
								fontSize="22"
								fontWeight="600"
							>
								76
							</text>
							<text
								x="60"
								y="74"
								textAnchor="middle"
								fill="var(--color-text3)"
								fontFamily="IBM Plex Mono, monospace"
								fontSize="9"
								fontWeight="500"
							>
								ENGAGED
							</text>
						</svg>
					</div>
					<p className="absolute bottom-0 inset-x-0 px-5 py-4 border-t border-line bg-bg1/80 font-mono text-[11px] text-text3 text-center backdrop-blur-sm">
						Local session · PERCLOS 0.09 · Blink 18/min
					</p>
				</div>
			</div>
		</section>
	);
}
