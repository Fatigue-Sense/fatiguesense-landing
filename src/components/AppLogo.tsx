export default function AppLogo({ size = 28 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 96 96" fill="none">
			<rect width="96" height="96" rx="22" fill="url(#app-logo-grad)" />
			<rect
				x="0.5"
				y="0.5"
				width="95"
				height="95"
				rx="21.5"
				fill="none"
				stroke="#FFFFFF"
				strokeOpacity="0.18"
			/>
			<g
				stroke="#FFFFFF"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				transform="translate(48 48) scale(0.68) translate(-48 -48)"
			>
				<path d="M26 38 H52 L26 64 H52" strokeWidth="6" />
				<path
					d="M56 22 H74 L56 40 H74"
					strokeWidth="4.8"
					strokeOpacity="0.7"
				/>
			</g>
		</svg>
	);
}
