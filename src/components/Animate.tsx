interface AnimateProps {
	children: React.ReactNode;
	type?: "fade-up" | "scale-in" | "rise";
	className?: string;
	id?: string;
}

export default function Animate({
	children,
	type = "fade-up",
	className,
	id,
}: AnimateProps) {
	const cls =
		type === "fade-up"
			? "opacity-0 translate-y-7"
			: type === "rise"
				? "opacity-0 translate-y-[60px] scale-[0.96]"
				: "opacity-0 scale-[0.8]";

	return (
		<div
			data-animate={type}
			className={`${cls}${className ? " " + className : ""}`}
			id={id}
		>
			{children}
		</div>
	);
}
