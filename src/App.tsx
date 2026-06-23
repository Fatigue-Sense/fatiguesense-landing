import SvgSprite from "./components/SvgSprite";
import AmbientBlobs from "./components/AmbientBlobs";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatItIs from "./components/WhatItIs";
import Features from "./components/Features";
import Privacy from "./components/Privacy";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";
import Share from "./components/Share";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import useScrollReveal from "./hooks/useScrollReveal";

export default function App() {
	useScrollReveal();

	return (
		<>
			<SvgSprite />
			<AmbientBlobs />
			<Nav />
			<Hero />
			<WhatItIs />
			<Features />
			<Privacy />
			<Roadmap />
			<Team />
			<Share />
			<Signup />
			<Footer />
		</>
	);
}
