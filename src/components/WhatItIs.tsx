export default function WhatItIs() {
	return (
		<section
			className="py-[clamp(72px,10vh,120px)] border-t border-line"
			id="what"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-8 md:gap-[72px]">
					<p
						className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text3"
						data-animate="fade-up"
					>
						What it is
					</p>
					<div>
						<p
							className="font-display text-[clamp(22px,3.5vw,32px)] font-medium leading-[1.3] tracking-[-0.03em] text-text1 mb-6 max-w-[640px]"
							data-animate="fade-up"
						>
							Mental fatigue is the leading cause of error in
							high-stakes work. Pilots, surgeons, drivers, and
							operators face the same invisible threat:
							attention decay they cannot feel.
						</p>
						<p
							className="font-display text-[clamp(15px,2vw,17px)] leading-[1.7] text-text2 max-w-[600px]"
							data-animate="fade-up"
						>
							FatigueSense tracks subtle eye-movement biomarkers
							through a standard webcam. PERCLOS, blink rate,
							micro-sleep duration - turned from invisible
							physiology into a readable, actionable signal. No
							wearables, no calibration, no configuration.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
