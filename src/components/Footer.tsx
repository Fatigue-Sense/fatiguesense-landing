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
					<div className="flex flex-wrap gap-4 sm:gap-x-7">
						<a
							href="#"
							className="font-display text-[13px] text-text3 hover:text-text1 transition-colors duration-200"
						>
							Research papers
						</a>
						<a
							href="#"
							className="font-display text-[13px] text-text3 hover:text-text1 transition-colors duration-200"
						>
							GitHub
						</a>
						<a
							href="#"
							className="font-display text-[13px] text-text3 hover:text-text1 transition-colors duration-200"
						>
							Twitter / X
						</a>
						<a
							href="mailto:hello@fatiguesense.app"
							className="font-display text-[13px] text-text3 hover:text-text1 transition-colors duration-200"
						>
							hello@fatiguesense.app
						</a>
					</div>
					<p className="font-mono text-[11px] text-text4">
						Built for the people who cannot afford to drift.
					</p>
				</div>
			</div>
		</footer>
	);
}
