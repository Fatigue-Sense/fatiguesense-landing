export default function WhatItIs() {
	return (
		<section
			className="py-[clamp(88px,12vh,140px)] border-t border-line"
			id="what"
		>
			<div className="w-[min(800px,calc(100vw-48px))] mx-auto">
				<p
					className="font-display text-[clamp(26px,4.2vw,38px)] font-medium leading-[1.25] tracking-[-0.03em] text-text1 mb-8"
					data-animate="fade-up"
				>
					Mental fatigue is the leading cause of error in high-stakes
					work. Pilots, surgeons, drivers, and operators face the same
					invisible threat: attention decay they cannot feel.
				</p>
				<p
					className="font-display text-[clamp(16px,2.1vw,18px)] leading-[1.75] text-text2"
					data-animate="fade-up"
				>
					FatigueSense tracks subtle eye-movement biomarkers through a
					standard webcam. PERCLOS, blink rate, micro-sleep duration —
					turned from invisible physiology into a readable, actionable
					signal. No wearables, no calibration, no configuration.
				</p>
			</div>
		</section>
	);
}
