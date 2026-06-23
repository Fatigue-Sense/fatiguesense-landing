const PHASES = [
	{
		num: 1,
		label: "Demo Ready",
		status: "done" as const,
		items: [
			"Real-time PERCLOS, blink rate, and micro-sleep detection",
			"Custom fatigue alert thresholds with browser notifications",
			"Session history with per-session reports and trend charts",
		],
	},
	{
		num: 2,
		label: "Early Access & Productivity",
		status: "next" as const,
		items: [
			"Public beta release for waitlisted users",
			"Lighting and skin-tone calibration wizard",
			"Multi-session trend analysis, CSV export, and session comparison",
			"AI session summaries via OpenRouter (bring your own key, rule-based fallback included)",
			"Built-in Pomodoro timer - auto-suggests breaks when fatigue spikes",
			"Task tagging and productivity insights - see which work patterns correlate with peak focus",
		],
	},
	{
		num: 3,
		label: "Desktop & Predictive",
		status: "next" as const,
		items: [
			"Native Windows app - system tray, always-on, runs in background",
			"Native macOS app - Apple Silicon, menu bar integration",
			"Offline mode - all processing local, no internet required",
			"Fatigue forecasting - warnings before concentration starts to break",
			"Integrations: focus apps, calendar scheduling, task managers",
		],
	},
];

export default function Roadmap() {
	return (
		<section
			className="py-[clamp(72px,10vh,120px)] border-t border-line"
			id="roadmap"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				{/* centered header - distinct from Features' split-header */}
				<div className="text-center mb-16" data-animate="fade-up">
					<p className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.25] tracking-[-0.03em] text-text1 mb-3.5">
						What we are building toward.
					</p>
					<p className="font-display text-[15px] text-text2 max-w-[520px] mx-auto">
						FatigueSense is in active development. Here is where we are
						headed - from working demo to native desktop apps.
					</p>
				</div>

				{/* timeline */}
				<div className="relative max-w-[720px] mx-auto">
					{/* vertical line */}
					<div className="absolute left-[11px] top-3 bottom-3 w-px bg-line md:left-5" />

					{PHASES.map((phase) => (
						<div
							key={phase.num}
							className={`relative pl-10 pb-14 last:pb-0 md:pl-14 group ${
								phase.status === "done"
									? "opacity-100"
									: "opacity-90"
							}`}
							data-animate="fade-up"
						>
							{/* timeline dot */}
							<div
								className={`absolute left-0 top-[5px] md:left-[14px] w-[22px] h-[22px] md:w-[26px] md:h-[26px] rounded-full flex items-center justify-center border-2 ${
									phase.status === "done"
										? "border-ok bg-ok/10 shadow-[0_0_12px_rgba(94,200,152,0.25)]"
										: "border-line2 bg-bg"
								}`}
							>
								{phase.status === "done" ? (
									<svg
										className="w-2.5 h-2.5 md:w-3 md:h-3 text-ok"
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M3 8l3.5 3.5L13 5" />
									</svg>
								) : (
									<span className="w-1.5 h-1.5 rounded-full bg-line2 group-hover:bg-text4 transition-colors duration-300" />
								)}
							</div>

							{/* phase header */}
							<div className="flex items-center gap-3 mb-5">
								<h3
									className={`font-display text-lg font-semibold tracking-[-0.02em] ${
										phase.status === "done"
											? "text-text1"
											: "text-text2"
									}`}
								>
									{phase.label}
								</h3>
								{phase.status === "done" && (
									<span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium tracking-[0.06em] uppercase text-ok bg-ok/10 px-2 py-0.5 rounded-full">
										<span className="w-1 h-1 rounded-full bg-ok" />
										Done
									</span>
								)}
							</div>

							{/* items */}
							<ul className="flex flex-col gap-2.5 list-none p-0 m-0">
								{phase.items.map((item) => (
									<li
										key={item}
										className={`font-display text-sm leading-[1.6] pl-5 relative ${
											phase.status === "done"
												? "text-text2"
												: "text-text3"
										}`}
									>
										<span
											className={`absolute left-0 top-[10px] w-1.5 h-px ${
												phase.status === "done"
													? "bg-text4"
													: "bg-line2"
											}`}
										/>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
