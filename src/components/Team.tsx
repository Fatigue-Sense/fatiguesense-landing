const MEMBERS = [
	{
		initials: "AE",
		name: "Alhassani Engineering",
		role: "Project Lead & Research",
		gh: "alhassani-engineering",
	},
	{
		initials: "JS",
		name: "JlordS32",
		role: "Development & Engineering",
		gh: "JlordS32",
	},
];

export default function Team() {
	return (
		<section
			className="py-[clamp(80px,11vh,128px)] border-t border-line"
			id="team"
		>
			<div className="w-[min(1200px,calc(100vw-48px))] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-8 md:gap-[72px]">
					<p
						className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text3"
						data-animate="fade-up"
					>
						Team
					</p>
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							{MEMBERS.map((m) => (
								<div
									className="bg-bg1 border border-line rounded-xl p-7 sm:px-6 flex items-center gap-[18px] hover:border-line2 hover:bg-bg2 transition-[border-color,background] duration-300"
									key={m.gh}
									data-animate="fade-up"
								>
									<div className="w-[52px] h-[52px] rounded-full bg-bg3 border border-line2 flex items-center justify-center shrink-0 font-mono text-lg font-semibold text-accent">
										{m.initials}
									</div>
									<div className="min-w-0">
										<p className="font-display text-base font-semibold text-text1 tracking-[-0.02em] mb-1">
											{m.name}
										</p>
										<p className="font-display text-[13px] text-text3 mb-2">
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
				</div>
			</div>
		</section>
	);
}
