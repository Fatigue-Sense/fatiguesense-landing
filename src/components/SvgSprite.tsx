export default function SvgSprite() {
	return (
		<svg
			className="absolute"
			width="0"
			height="0"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				<linearGradient
					id="app-logo-grad"
					x1="0"
					y1="0"
					x2="96"
					y2="96"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#7C83F7" />
					<stop offset="1" stopColor="#5560D8" />
				</linearGradient>
				<linearGradient
					id="grad-accent-ok"
					x1="16"
					x2="82"
					y1="14"
					y2="82"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#7c83f7" />
					<stop offset="1" stopColor="#5ec898" />
				</linearGradient>
				<linearGradient
					id="grad-caution"
					x1="18"
					x2="80"
					y1="18"
					y2="78"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#e3b95a" />
					<stop offset="1" stopColor="#e57464" />
				</linearGradient>

				<symbol id="mark-iris-trace" viewBox="0 0 96 96">
					<path
						d="M12 49c10.5-15.5 22.5-23 36-23s25.5 7.5 36 23c-10.5 15.5-22.5 23-36 23S22.5 64.5 12 49Z"
						fill="none"
						stroke="url(#grad-accent-ok)"
						strokeWidth="5.5"
						strokeLinejoin="round"
					/>
					<circle
						cx="48"
						cy="49"
						r="13.5"
						fill="none"
						stroke="currentColor"
						strokeWidth="5"
					/>
					<path
						d="M27 51c6.5-1 8.5-11 15-11 8.5 0 7.5 18 15 18 5.5 0 7.5-9 13-11"
						fill="none"
						stroke="#5ec898"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					<circle cx="48" cy="49" r="4.5" fill="#7c83f7" />
				</symbol>

				<symbol id="mark-local-sentinel" viewBox="0 0 96 96">
					<path
						d="M48 12 75 25v20c0 18-10.5 31-27 39-16.5-8-27-21-27-39V25l27-13Z"
						fill="none"
						stroke="#2f333b"
						strokeWidth="5.5"
						strokeLinejoin="round"
					/>
					<path
						d="M30 49c5.5-9 11.5-13.5 18-13.5S60.5 40 66 49c-5.5 9-11.5 13.5-18 13.5S35.5 58 30 49Z"
						fill="none"
						stroke="#5ec898"
						strokeWidth="5"
						strokeLinejoin="round"
					/>
					<circle cx="48" cy="49" r="7" fill="#7c83f7" />
					<path
						d="M29 25h38"
						stroke="#73d6ff"
						strokeWidth="4"
						strokeLinecap="round"
					/>
				</symbol>

				<symbol id="icon-camera" viewBox="0 0 48 48">
					<rect
						x="8"
						y="14"
						width="32"
						height="24"
						rx="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					/>
					<circle
						cx="24"
						cy="26"
						r="7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					/>
					<circle cx="24" cy="26" r="2.5" fill="currentColor" />
					<path
						d="M16 14l2-5h12l2 5"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</symbol>

				<symbol id="icon-chart" viewBox="0 0 48 48">
					<path
						d="M8 40V20l10 6 12-12 10 10v16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M8 40h32"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
					<circle cx="28" cy="24" r="2" fill="currentColor" />
					<circle cx="40" cy="16" r="2" fill="currentColor" />
				</symbol>

				<symbol id="icon-eye" viewBox="0 0 48 48">
					<path
						d="M6 24c7-10 15-14 18-14s11 4 18 14c-7 10-15 14-18 14s-11-4-18-14Z"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinejoin="round"
					/>
					<circle
						cx="24"
						cy="24"
						r="7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					/>
					<circle cx="24" cy="24" r="2.5" fill="currentColor" />
				</symbol>

				<symbol id="icon-bell" viewBox="0 0 48 48">
					<path
						d="M14 34V20a10 10 0 1 1 20 0v14"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
					<path
						d="M10 34h28"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
					<path
						d="M24 38a4 4 0 0 1-4-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
					<circle cx="24" cy="20" r="2" fill="currentColor" />
				</symbol>

				<symbol id="icon-shield" viewBox="0 0 48 48">
					<path
						d="M24 6L40 12v14c0 12-7 22-16 26-9-4-16-14-16-26V12L24 6Z"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinejoin="round"
					/>
					<path
						d="M17 26l5 5 9-9"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</symbol>

				<symbol id="icon-monitor" viewBox="0 0 48 48">
					<rect
						x="6"
						y="8"
						width="36"
						height="24"
						rx="3"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					/>
					<path
						d="M18 32v4M30 32v4M14 36h20"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
				</symbol>
			</defs>
		</svg>
	);
}
