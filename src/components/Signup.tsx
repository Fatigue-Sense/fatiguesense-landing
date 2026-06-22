export default function Signup() {
	const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const form = document.getElementById("hero-waitlist");
		const input = document.getElementById("waitlist-email");
		form?.scrollIntoView({ behavior: "smooth", block: "center" });
		window.setTimeout(() => input?.focus(), 400);
	};

	return (
		<section
			className="py-[clamp(80px,12vh,128px)] text-center border-t border-line"
			id="signup"
		>
			<div className="w-[min(560px,calc(100vw-48px))] mx-auto">
				<p
					className="font-display text-[clamp(22px,3.5vw,30px)] font-semibold leading-[1.3] tracking-[-0.03em] text-text1 mb-3.5"
					data-animate="fade-up"
				>
					Still in development.
				</p>
				<p
					className="font-display text-[15px] leading-[1.65] text-text2 mb-8"
					data-animate="fade-up"
				>
					FatigueSense is not yet available for public use. Join the
					waitlist and we will notify you at launch — one email, no
					spam.
				</p>
				<a
					href="#hero-waitlist"
					className="signup-btn-hover inline-flex font-display text-[15px] font-semibold text-white bg-accent border-none py-3.5 px-8 rounded-lg cursor-pointer transition-[background,transform,box-shadow] duration-200 active:scale-[0.97]"
					data-animate="fade-up"
					onClick={scrollToWaitlist}
				>
					Stay updated
				</a>
			</div>
		</section>
	);
}
