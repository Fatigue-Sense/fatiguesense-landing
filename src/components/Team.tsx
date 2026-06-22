const MEMBERS = [
	{
		gh: "JlordS32",
		name: "Jaylou Rasonabe",
		role: "Project Lead & Engineering",
	},
	{
		gh: "alhassani-engineering",
		name: "Ahmad Alhassani",
		role: "Development & Research",
	},
	{
		gh: "duyNguyen16",
		name: "Khanh Duy Nguyen",
		role: "Development & Engineering",
	},
];

export default function Team() {
	return (
		<section
			className="py-[clamp(80px,11vh,128px)] border-t border-line"
			id="team"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<h2
					className="font-display text-[clamp(24px,3.8vw,34px)] font-semibold tracking-[-0.03em] text-text1 mb-10 max-w-[480px]"
					data-animate="fade-up"
				>
					Built by engineers who care about getting it right.
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{MEMBERS.map((m) => (
						<div
							className="bg-bg1 border border-line rounded-xl p-6 flex flex-col gap-4 hover:border-line2 hover:bg-bg2 transition-[border-color,background] duration-300"
							key={m.gh}
							data-animate="fade-up"
						>
							<img
								src={`https://github.com/${m.gh}.png`}
								alt={m.name}
								className="w-14 h-14 rounded-full"
							/>
							<div>
								<p className="font-display text-base font-semibold text-text1 tracking-[-0.02em] mb-1">
									{m.name}
								</p>
								<p className="font-display text-[13px] text-text3 mb-3">
									{m.role}
								</p>
								<a
									href={`https://github.com/${m.gh}`}
									target="_blank"
									rel="noopener"
									className="font-mono text-xs text-accent hover:text-text1 transition-colors duration-200 inline-flex items-center gap-1.5"
								>
									<svg
										className="w-3.5 h-3.5"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
									</svg>
									{m.gh}
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
