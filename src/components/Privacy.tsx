export default function Privacy() {
	return (
		<section
			className="py-[clamp(96px,14vh,160px)] border-t border-line text-center relative"
			id="privacy"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="w-[60px] h-[60px] mx-auto mb-8 text-ok" data-animate="scale-in">
					<svg viewBox="0 0 96 96" className="w-full h-full">
						<use href="#mark-local-sentinel" />
					</svg>
				</div>
				<p
					className="font-display text-[clamp(24px,4.5vw,40px)] font-semibold leading-[1.15] tracking-[-0.03em] text-text1 mb-6 max-w-[640px] mx-auto"
					data-animate="fade-up"
				>
					Your face never leaves your machine.
				</p>
				<p
					className="font-display text-[clamp(15px,2vw,17px)] leading-[1.7] text-text2 max-w-[600px] mx-auto mb-10"
					data-animate="fade-up"
				>
					FatigueSense runs entirely on your computer. The camera
					feed processes locally and discards instantly, frame by
					frame. No cloud uploads, no data storage, no account
					required. Privacy is not a feature we added. It is the
					architecture we chose.
				</p>
				<div
					className="flex flex-wrap justify-center gap-4 sm:gap-x-8 max-w-[620px] mx-auto"
					data-animate="fade-up"
				>
					<div className="flex items-center gap-2.5 font-mono text-xs font-medium text-text2 tracking-[0.02em]">
						<span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0 shadow-[0_0_8px_rgba(94,200,152,0.3)]" />
						100% local processing
					</div>
					<div className="flex items-center gap-2.5 font-mono text-xs font-medium text-text2 tracking-[0.02em]">
						<span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0 shadow-[0_0_8px_rgba(94,200,152,0.3)]" />
						No cloud uploads
					</div>
					<div className="flex items-center gap-2.5 font-mono text-xs font-medium text-text2 tracking-[0.02em]">
						<span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0 shadow-[0_0_8px_rgba(94,200,152,0.3)]" />
						No data storage
					</div>
					<div className="flex items-center gap-2.5 font-mono text-xs font-medium text-text2 tracking-[0.02em]">
						<span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0 shadow-[0_0_8px_rgba(94,200,152,0.3)]" />
						No account required
					</div>
				</div>
			</div>
		</section>
	);
}
