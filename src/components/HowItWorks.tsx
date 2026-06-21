export default function HowItWorks() {
	return (
		<section
			className="py-[clamp(72px,10vh,120px)] border-t border-line"
			id="how"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-8 md:gap-[72px]">
					<p
						className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text3"
						data-animate="fade-up"
					>
						How it works
					</p>
					<div>
						<div className="steps-row grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 sm:relative">
							<div className="step relative z-[1]" data-animate="fade-up">
								<p className="font-mono text-[13px] font-medium text-accent mb-[18px] tracking-[0.04em] sm:bg-bg sm:inline-block sm:pr-2.5">
									Step 1
								</p>
								<div className="w-11 h-11 mb-5 text-text3 hover:text-accent transition-colors duration-300">
									<svg viewBox="0 0 48 48" className="w-full h-full">
										<use href="#icon-monitor" />
									</svg>
								</div>
								<h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text1 mb-2.5">
									Open FatigueSense
								</h3>
								<p className="font-display text-sm leading-[1.6] text-text2">
									Launch in your browser. No install, no
									account, no configuration needed.
								</p>
							</div>
							<div className="step relative z-[1]" data-animate="fade-up">
								<p className="font-mono text-[13px] font-medium text-accent mb-[18px] tracking-[0.04em] sm:bg-bg sm:inline-block sm:pr-2.5">
									Step 2
								</p>
								<div className="w-11 h-11 mb-5 text-text3 hover:text-accent transition-colors duration-300">
									<svg viewBox="0 0 48 48" className="w-full h-full">
										<use href="#icon-camera" />
									</svg>
								</div>
								<h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text1 mb-2.5">
									Allow webcam access
								</h3>
								<p className="font-display text-sm leading-[1.6] text-text2">
									Grant camera permission once. The feed
									processes locally and discards in real
									time, frame by frame.
								</p>
							</div>
							<div className="step relative z-[1]" data-animate="fade-up">
								<p className="font-mono text-[13px] font-medium text-accent mb-[18px] tracking-[0.04em] sm:bg-bg sm:inline-block sm:pr-2.5">
									Step 3
								</p>
								<div className="w-11 h-11 mb-5 text-text3 hover:text-accent transition-colors duration-300">
									<svg viewBox="0 0 48 48" className="w-full h-full">
										<use href="#icon-chart" />
									</svg>
								</div>
								<h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-text1 mb-2.5">
									Read your fatigue score
								</h3>
								<p className="font-display text-sm leading-[1.6] text-text2">
									A live score and trend chart shows your
									cognitive state. Get alerts before
									fatigue compromises your attention.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
