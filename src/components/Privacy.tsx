const POINTS = [
	"100% local processing",
	"No cloud uploads",
	"No data storage",
	"No account required",
];

export default function Privacy() {
	return (
		<section
			className="py-[clamp(96px,14vh,160px)] border-t border-line text-center relative"
			id="privacy"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div
					className="w-[60px] h-[60px] mx-auto mb-8 text-ok"
					data-animate="scale-in"
				>
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
					FatigueSense runs entirely on your computer. The camera feed
					processes locally and discards instantly, frame by frame. No
					cloud uploads, no data storage, no account required. Privacy
					is not a feature we added. It is the architecture we chose.
				</p>
				<ul
					className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 max-w-[480px] mx-auto text-left list-none p-0 m-0"
					data-animate="fade-up"
				>
					{POINTS.map((point) => (
						<li
							key={point}
							className="font-display text-sm text-text2 py-1 border-b border-line last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
						>
							{point}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
