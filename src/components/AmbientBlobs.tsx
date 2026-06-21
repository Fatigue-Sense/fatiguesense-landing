import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBlobs() {
	const blobARef = useRef<HTMLDivElement>(null);
	const blobBRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		let mouseX = 0,
			mouseY = 0;

		const onMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};

		document.addEventListener("mousemove", onMouseMove);

		const tickId = gsap.ticker.add(() => {
			if (blobARef.current) {
				gsap.to(blobARef.current, {
					x: mouseX * 30,
					y: mouseY * 20,
					duration: 2.5,
					ease: "power2.out",
					overwrite: true,
				});
			}
			if (blobBRef.current) {
				gsap.to(blobBRef.current, {
					x: mouseX * -20,
					y: mouseY * -25,
					duration: 3,
					ease: "power2.out",
					overwrite: true,
				});
			}
		});

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			gsap.ticker.remove(tickId);
		};
	}, []);

	return (
		<>
			<div
				ref={blobARef}
				className="ambient-blob ambient-blob-a"
				aria-hidden="true"
			/>
			<div
				ref={blobBRef}
				className="ambient-blob ambient-blob-b"
				aria-hidden="true"
			/>
			<div
				className="ambient-blob ambient-blob-c"
				aria-hidden="true"
			/>
		</>
	);
}
