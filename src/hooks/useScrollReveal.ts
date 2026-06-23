import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal() {
	const triggersRef = useRef<ScrollTrigger[]>([]);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) {
			gsap.set("[data-animate]", { opacity: 1, y: 0, scale: 1 });
			return;
		}

		const triggers: ScrollTrigger[] = [];

		/* General fade-up / scale-in */
		const revealElements = gsap.utils.toArray(
			"[data-animate]",
		) as HTMLElement[];

		revealElements.forEach((el) => {
			if (el.closest("#hero")) return;

			const animType = el.dataset.animate;

			const st = ScrollTrigger.create({
				trigger: el,
				start: "top 82%",
				once: true,
				onEnter: () => {
					if (animType === "fade-up") {
						gsap.to(el, {
							opacity: 1,
							y: 0,
							duration: 0.8,
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
			triggers.push(st);
		});

		/* Feature cards stagger */
		const featuresGrid = document.querySelector(".features-grid");
		if (featuresGrid) {
			const st = ScrollTrigger.create({
				trigger: featuresGrid,
				start: "top 80%",
				once: true,
				onEnter: () => {
					gsap.to(".feature-card", {
						opacity: 1,
						y: 0,
						duration: 0.7,
						stagger: 0.12,
						ease: "power3.out",
					});
				},
			});
			triggers.push(st);
			gsap.set(".feature-card", { opacity: 0, y: 24 });
		}

		/* Privacy points stagger */
		const privacyPoints = document.querySelector(".privacy-points");
		if (privacyPoints) {
			const st = ScrollTrigger.create({
				trigger: privacyPoints,
				start: "top 85%",
				once: true,
				onEnter: () => {
					gsap.to(".privacy-point", {
						opacity: 1,
						y: 0,
						duration: 0.55,
						stagger: 0.1,
						ease: "power3.out",
					});
				},
			});
			triggers.push(st);
			gsap.set(".privacy-point", { opacity: 0, y: 12 });
		}

		/* Team cards stagger */
		const teamGrid = document.querySelector(".team-grid");
		if (teamGrid) {
			const st = ScrollTrigger.create({
				trigger: teamGrid,
				start: "top 80%",
				once: true,
				onEnter: () => {
					gsap.to(".team-card", {
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.12,
						ease: "power3.out",
					});
				},
			});
			triggers.push(st);
			gsap.set(".team-card", { opacity: 0, y: 24 });
		}

		/* Roadmap timeline stagger - deeper trigger, longer duration */
		const roadmapTimeline = document.querySelector(".roadmap-timeline");
		if (roadmapTimeline) {
			const st = ScrollTrigger.create({
				trigger: roadmapTimeline,
				start: "top 78%",
				once: true,
				onEnter: () => {
					gsap.to(".roadmap-phase", {
						opacity: 1,
						y: 0,
						duration: 0.7,
						stagger: 0.18,
						ease: "power3.out",
					});
				},
			});
			triggers.push(st);
			gsap.set(".roadmap-phase", { opacity: 0, y: 20 });
		}

		/* Footer reveal */
		const footer = document.querySelector("footer");
		if (footer) {
			const st = ScrollTrigger.create({
				trigger: footer,
				start: "top 88%",
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
			triggers.push(st);
			gsap.set(footer, { opacity: 0, y: 20 });
		}

		triggersRef.current = triggers;

		return () => {
			triggers.forEach((st) => st.kill());
			triggersRef.current = [];
		};
	}, []);
}
