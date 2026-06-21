import SvgSprite from "./components/SvgSprite";
import AmbientBlobs from "./components/AmbientBlobs";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatItIs from "./components/WhatItIs";
import Features from "./components/Features";
import Privacy from "./components/Privacy";
import Team from "./components/Team";
import Feedback from "./components/Feedback";
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
			<Team />
			<Feedback />
			<Signup />
			<Footer />
		</>
	);
}
