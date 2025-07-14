import Hero from "../components/Hero";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import StatBox from "../components/ui/StatBox";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <Hero />

            <Section id="features" className="text-center">
                <Heading level={2} className="text-3xl mb-8">Key Features</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <Heading level={3} className="text-xl mb-2">Smart Analytics</Heading>
                        <p>AI-powered insights to help you understand and control your spending habits.</p>
                    </Card>
                    <Card>
                        <Heading level={3} className="text-xl mb-2">Automated Tracking</Heading>
                        <p>Auto-fetch expenses from your emails and cards without manual entry.</p>
                    </Card>
                    <Card>
                        <Heading level={3} className="text-xl mb-2">Group Expenses</Heading>
                        <p>Split bills with friends and manage group expenses easily, just like Splitwise.</p>
                    </Card>
                </div>
            </Section>

            <Section id="about" className="bg-gray-50 text-center">
                <Heading level={2} className="text-3xl mb-4">Why Expensia?</Heading>
                <p className="max-w-2xl mx-auto mb-6">
                    Expensia combines cutting-edge AI analytics with seamless tracking to help you stay on top of your finances. Whether it's investments, expenses, or group bills, we make it effortless.
                </p>
                <Button>Learn More</Button>
            </Section>

            <Section id="stats" className="text-center">
                <Heading level={2} className="text-3xl mb-8">Trusted by 10,000+ users</Heading>
                <div className="flex flex-wrap justify-center gap-8">
                    <StatBox value="95%" label="Satisfaction Rate" />
                    <StatBox value="500+" label="Groups Managed" />
                    <StatBox value="24/7" label="Support Availability" />
                </div>
            </Section>

            <Section id="cta" className="bg-green-600 text-white text-center">
                <Heading level={2} className="text-3xl mb-4">Ready to take control?</Heading>
                <p className="mb-6">Join Expensia today and start your smarter financial journey.</p>
                <LinkButton to="/signup">Sign Up Now</LinkButton>
            </Section>
        </div>
    );
}
