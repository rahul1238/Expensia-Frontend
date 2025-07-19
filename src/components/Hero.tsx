import LinkButton from "./ui/LinkButton";
import Heading from "./ui/Heading";
import Section from "./ui/Section";

export default function Hero() {
    return (
        <Section
            id="home"
            className="relative w-screen h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
            style={{ 
                backgroundImage: `url('/assets/graph.jpg')`,
                marginTop: 0,
                paddingTop: 0
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
            <div className="relative z-10 text-center px-4">
                <Heading level={1} className="text-4xl md:text-6xl mb-4">
                    Manage Your Finances Effortlessly with Expensia
                </Heading>
                <p className="text-lg md:text-xl mb-6">
                    Track expenses, analyze spending, and plan your future smarter than ever.
                </p>
                <LinkButton to="/signup">Get Started</LinkButton>
            </div>
        </Section>
    );
}
