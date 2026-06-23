const FEATURES = [
	{
		icon: "icon-eye",
		title: "Tracks what you cannot feel",
		desc: "PERCLOS, blink rate, and micro-sleep patterns reveal fatigue 15-30 minutes before you notice it yourself.",
	},
	{
		icon: "icon-camera",
		title: "Your webcam is the only hardware",
		desc: "No wearables, no sensors, no headsets. If your laptop has a camera, you are ready.",
	},
	{
		icon: "icon-bell",
		title: "Alerts before the critical moment",
		desc: "Configurable thresholds for early, mid, and critical fatigue. Take a break, switch tasks, or hand off.",
	},
	{
		icon: "icon-chart",
		title: "Session history with trend analysis",
		desc: "Review fatigue patterns across days, compare sessions, and understand your personal cognitive rhythm.",
	},
];

export default function Features() {
	return (
		<section
			className="py-[clamp(72px,10vh,120px)] border-t border-line"
			id="features"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-8 md:gap-[72px]">
					<p
						className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text3"
						data-animate="fade-up"
					>
						Why it matters
					</p>
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
							{FEATURES.map((f) => (
								<div
									className="py-7 sm:py-9 sm:pr-7 sm:even:pl-7 sm:even:border-l border-t border-line hover:border-line2 transition-colors duration-300"
									key={f.title}
									data-animate="fade-up"
								>
									<div className="w-10 h-10 mb-5 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
										<svg viewBox="0 0 48 48" className="w-5 h-5">
											<use href={`#${f.icon}`} />
										</svg>
									</div>
									<h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text1 mb-2.5">
										{f.title}
									</h3>
									<p className="font-display text-sm leading-[1.6] text-text2 max-w-[460px]">
										{f.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
