import AppLogo from "./AppLogo";

export default function Footer() {
	return (
		<footer className="border-t border-line">
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 py-11 pb-10">
					<div className="flex items-center gap-2.5">
						<AppLogo size={24} />
						<span className="font-display text-sm font-medium text-text3">
							FatigueSense
						</span>
					</div>
					<a
						href="https://github.com/Fatigue-Sense"
						target="_blank"
						rel="noopener noreferrer"
						className="font-display text-[13px] text-text3 hover:text-text1 transition-colors duration-200"
					>
						GitHub
					</a>
					<p className="font-display text-[12px] text-text4 max-w-[240px] sm:text-right leading-snug">
						Built for people who cannot afford to drift.
					</p>
				</div>
			</div>
		</footer>
	);
}
