import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal() {
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) {
			gsap.set("[data-animate]", { opacity: 1, y: 0, scale: 1 });
			return;
		}

		const revealElements = gsap.utils.toArray(
			"[data-animate]",
		) as HTMLElement[];

		revealElements.forEach((el) => {
			if (el.closest("#hero")) return;

			const animType = el.dataset.animate;

			ScrollTrigger.create({
				trigger: el,
				start: "top bottom-=80",
				once: true,
				onEnter: () => {
					if (animType === "fade-up") {
						gsap.to(el, {
							opacity: 1,
							y: 0,
							duration: 0.75,
							ease: "power3.out",
						});
					} else if (animType === "scale-in") {
						gsap.to(el, {
							opacity: 1,
							scale: 1,
							duration: 0.7,
							ease: "back.out(1.4)",
						});
					}
				},
			});
		});

		/* Feature cards stagger */
		const featuresGrid = document.querySelector(".features-grid");
		if (featuresGrid) {
			ScrollTrigger.create({
				trigger: featuresGrid,
				start: "top bottom-=60",
				once: true,
				onEnter: () => {
					gsap.to(".feature-card", {
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: "power3.out",
					});
				},
			});
			gsap.set(".feature-card", { opacity: 0, y: 24 });
		}

		/* Steps stagger */
		const stepsRow = document.querySelector(".steps-row");
		if (stepsRow) {
			ScrollTrigger.create({
				trigger: stepsRow,
				start: "top bottom-=60",
				once: true,
				onEnter: () => {
					gsap.to(".step", {
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.12,
						ease: "power3.out",
					});
				},
			});
			gsap.set(".step", { opacity: 0, y: 24 });
		}

		/* Privacy points stagger */
		const privacyPoints = document.querySelector(".privacy-points");
		if (privacyPoints) {
			ScrollTrigger.create({
				trigger: privacyPoints,
				start: "top bottom-=40",
				once: true,
				onEnter: () => {
					gsap.to(".privacy-point", {
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.08,
						ease: "power3.out",
					});
				},
			});
			gsap.set(".privacy-point", { opacity: 0, y: 12 });
		}

		/* Team cards stagger */
		const teamGrid = document.querySelector(".team-grid");
		if (teamGrid) {
			ScrollTrigger.create({
				trigger: teamGrid,
				start: "top bottom-=60",
				once: true,
				onEnter: () => {
					gsap.to(".team-card", {
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power3.out",
					});
				},
			});
			gsap.set(".team-card", { opacity: 0, y: 24 });
		}

		/* Footer reveal */
		const footer = document.querySelector("footer");
		if (footer) {
			ScrollTrigger.create({
				trigger: footer,
				start: "top bottom-=40",
				once: true,
				onEnter: () => {
					gsap.to(footer, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power3.out",
					});
				},
			});
			gsap.set(footer, { opacity: 0, y: 20 });
		}

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);
}
