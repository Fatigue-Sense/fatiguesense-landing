import { useState, useEffect, useCallback } from "react";
import AppLogo from "./AppLogo";

const NAV_LINKS = [
	{ href: "#what", label: "What it is" },
	{ href: "#features", label: "Features" },
	{ href: "#privacy", label: "Privacy" },
	{ href: "#team", label: "Team" },
	{ href: "#feedback", label: "Feedback" },
];

const linkClass =
	"font-display text-[14px] font-medium text-text2 hover:text-text1 transition-colors duration-200";

export default function Nav() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleScroll = useCallback(() => {
		setScrolled(window.scrollY > 20);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const closeMenu = () => setMenuOpen(false);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		closeMenu();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<>
			<nav
				className={`site-nav fixed top-0 left-0 right-0 z-100 py-5${scrolled ? " scrolled" : ""}`}
				id="site-nav"
			>
				<div className="flex justify-between items-center mx-auto w-[min(1200px,calc(100vw-48px))]">
					<a
						href="#hero"
						className="flex items-center gap-2.5"
						onClick={(e) => handleNavClick(e, "#hero")}
					>
						<AppLogo size={32} />
						<span className="font-display font-bold text-[17px] text-text1 tracking-[-0.03em]">
							FatigueSense
						</span>
					</a>
					<div className="hidden md:flex items-center gap-9">
						{NAV_LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={linkClass}
								onClick={(e) => handleNavClick(e, link.href)}
							>
								{link.label}
							</a>
						))}
						<a
							href="#signup"
							className="bg-accent px-5 py-2.5 border-none rounded-[8px] font-display font-semibold text-[14px] text-white whitespace-nowrap active:scale-[0.96] transition-[background,transform,box-shadow] duration-200 cursor-pointer nav-cta"
							onClick={(e) => handleNavClick(e, "#signup")}
						>
							Stay updated
						</a>
					</div>
					<button
						className="md:hidden flex justify-center items-center bg-transparent hover:bg-bg2 border border-line2 rounded-lg w-10 h-10 text-text1 transition-colors duration-200 cursor-pointer"
						id="hamburger"
						aria-label="Open menu"
						onClick={() => setMenuOpen(true)}
					>
						<svg
							className="w-[18px] h-[18px]"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</nav>

			<div
				className={`mobile-menu${menuOpen ? " open" : ""}`}
				id="mobile-menu"
			>
				<button
					className="top-4 right-4 absolute flex justify-center items-center bg-transparent border border-line2 rounded-lg w-9 h-9 text-text1 cursor-pointer"
					aria-label="Close menu"
					onClick={closeMenu}
				>
					<svg
						className="w-[18px] h-[18px]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
				{NAV_LINKS.map((link) => (
					<a
						key={link.href}
						href={link.href}
						className="font-display font-medium text-text2 hover:text-text1 text-xl transition-colors duration-200"
						onClick={(e) => handleNavClick(e, link.href)}
					>
						{link.label}
					</a>
				))}
				<a
					href="#signup"
					className="font-display font-medium text-white hover:text-text1 text-xl transition-colors duration-200"
					onClick={(e) => handleNavClick(e, "#signup")}
				>
					Stay updated
				</a>
			</div>
		</>
	);
}
