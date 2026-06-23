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
	const mockupRef = useRef<HTMLDivElement>(null);

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
			mockupRef.current,
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
		gsap.set(mockupRef.current, { opacity: 0, y: 60, scale: 0.96 });

		const st = ScrollTrigger.create({
			trigger: "#hero",
			start: "top top",
			end: "bottom top",
			onUpdate: (self) => {
				const p = self.progress;
				gsap.to(mockupRef.current, {
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
								: "Join waitlist"}
					</button>
				</form>
				{error && (
					<p className="font-display text-sm text-danger text-center mt-2.5">
						{error}
					</p>
				)}
				{submitted && !error && (
					<p className="font-display text-sm text-ok text-center mt-2.5">
						You&rsquo;re on the list. No confirmation email will be sent
						&mdash; double-check your address above. We will reach out
						when we launch.
					</p>
				)}
			</div>

			<div
				className="w-full max-w-[920px] mt-[clamp(48px,8vh,80px)] px-6 relative z-[1] opacity-0"
				ref={mockupRef}
			>
				<div className="dash-mockup bg-bg2 border border-line rounded-t-[14px] border-b-0 overflow-hidden">
					<div className="flex items-center gap-2.5 py-3.5 px-[18px] border-b border-line bg-bg1">
						<div className="flex gap-[7px] shrink-0">
							<span className="dash-chrome-dot w-[11px] h-[11px] rounded-full" />
							<span className="dash-chrome-dot w-[11px] h-[11px] rounded-full" />
							<span className="dash-chrome-dot w-[11px] h-[11px] rounded-full" />
						</div>
						<div className="flex-1 bg-bg rounded-[5px] py-[5px] px-3 font-mono text-[11px] text-text3 text-center">
							app.fatiguesense.dev
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] md:grid-cols-[130px_1fr_190px] gap-[18px] sm:gap-6 md:gap-7 p-5 sm:p-6 md:p-[32px_28px_40px]">
						<div className="flex flex-col items-center gap-2.5">
							<div className="relative w-24 h-24">
								<svg viewBox="0 0 96 96" className="w-full h-full">
									<circle
										cx="48"
										cy="48"
										r="40"
										fill="none"
										stroke="#1b1d22"
										strokeWidth="7"
									/>
									<circle
										cx="48"
										cy="48"
										r="40"
										fill="none"
										stroke="#5ec898"
										strokeWidth="7"
										strokeDasharray="188 63"
										strokeDashoffset="-30"
										strokeLinecap="round"
										transform="rotate(-90 48 48)"
									/>
									<text
										x="48"
										y="44"
										textAnchor="middle"
										fill="#e8e9ec"
										fontFamily="Space Grotesk, sans-serif"
										fontSize="19"
										fontWeight="600"
									>
										76
									</text>
									<text
										x="48"
										y="60"
										textAnchor="middle"
										fill="#6a6c73"
										fontFamily="IBM Plex Mono, monospace"
										fontSize="10"
										fontWeight="500"
									>
										SCORE
									</text>
								</svg>
							</div>
							<span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-text3">
								Engaged
							</span>
						</div>

						<div className="dash-feed relative bg-bg border border-line rounded-[10px] aspect-[4/3] flex flex-col items-center justify-center gap-2.5 overflow-hidden">
							<div className="w-9 h-9 text-text4 relative z-[1]">
								<svg viewBox="0 0 48 48">
									<use href="#icon-camera" />
								</svg>
							</div>
							<span className="font-mono text-[10px] font-medium tracking-[0.06em] text-text4 uppercase relative z-[1]">
								Live feed
							</span>
							<div className="flex items-center gap-[7px] relative z-[1]">
								<span className="dash-feed-pulse w-[7px] h-[7px] rounded-full bg-ok" />
								<span className="font-mono text-[10px] text-text3">
									Active
								</span>
							</div>
						</div>

						<div className="hidden md:flex flex-col gap-4 justify-center">
							<div className="flex items-center gap-2.5">
								<span
									className="w-[7px] h-[7px] rounded-full shrink-0"
									style={{ background: "var(--color-ok)" }}
								/>
								<span className="font-display text-[13px] text-text2">
									PERCLOS
								</span>
								<span className="font-mono text-[13px] font-medium text-text1 ml-auto">
									0.09
								</span>
							</div>
							<div className="flex items-center gap-2.5">
								<span
									className="w-[7px] h-[7px] rounded-full shrink-0"
									style={{ background: "var(--color-warn)" }}
								/>
								<span className="font-display text-[13px] text-text2">
									Blink rate
								</span>
								<span className="font-mono text-[13px] font-medium text-text1 ml-auto">
									18/min
								</span>
							</div>
							<div className="flex items-center gap-2.5">
								<span
									className="w-[7px] h-[7px] rounded-full shrink-0"
									style={{ background: "var(--color-accent)" }}
								/>
								<span className="font-display text-[13px] text-text2">
									Micro-sleeps
								</span>
								<span className="font-mono text-[13px] font-medium text-text1 ml-auto">
									0
								</span>
							</div>
							<div className="mt-2.5 inline-flex items-center gap-2 font-display text-[13px] font-medium text-ok bg-[rgba(94,200,152,0.08)] border border-[rgba(94,200,152,0.15)] rounded-[7px] py-[9px] px-4 w-fit">
								<span className="w-[7px] h-[7px] rounded-full bg-ok shadow-[0_0_6px_rgba(94,200,152,0.4)]" />
								All systems normal
							</div>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-2.5 px-5 pb-6 sm:hidden">
						<div className="text-center p-3 bg-bg border border-line rounded-lg">
							<span
								className="font-mono text-base font-semibold block"
								style={{ color: "var(--color-ok)" }}
							>
								0.09
							</span>
							<span className="font-display text-[10px] text-text3 mt-[5px]">
								PERCLOS
							</span>
						</div>
						<div className="text-center p-3 bg-bg border border-line rounded-lg">
							<span
								className="font-mono text-base font-semibold block"
								style={{ color: "var(--color-warn)" }}
							>
								18/m
							</span>
							<span className="font-display text-[10px] text-text3 mt-[5px]">
								Blink rate
							</span>
						</div>
						<div className="text-center p-3 bg-bg border border-line rounded-lg">
							<span
								className="font-mono text-base font-semibold block"
								style={{ color: "var(--color-accent)" }}
							>
								0
							</span>
							<span className="font-display text-[10px] text-text3 mt-[5px]">
								Micro-sleeps
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
