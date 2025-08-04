import Hero from "../components/Hero";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import StatBox from "../components/ui/StatBox";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import { useTranslation } from "../hooks/useTranslation";

export default function Home() {
    const { t } = useTranslation();
    
    return (
        <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <Section id="features" className="text-center">
                    <Heading level={2} className="text-3xl mb-8 dark:text-white">{t('home.keyFeatures')}</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <Heading level={3} className="text-xl mb-2 dark:text-white">{t('home.smartAnalytics')}</Heading>
                            <p className="dark:text-gray-300">{t('home.smartAnalyticsDesc')}</p>
                        </Card>
                        <Card>
                            <Heading level={3} className="text-xl mb-2 dark:text-white">{t('home.automatedTracking')}</Heading>
                            <p className="dark:text-gray-300">{t('home.automatedTrackingDesc')}</p>
                        </Card>
                        <Card>
                            <Heading level={3} className="text-xl mb-2 dark:text-white">{t('home.groupExpenses')}</Heading>
                            <p className="dark:text-gray-300">{t('home.groupExpensesDesc')}</p>
                        </Card>
                    </div>
                </Section>

                <Section id="about" className="bg-gray-50 dark:bg-gray-800 text-center">
                    <Heading level={2} className="text-3xl mb-4 dark:text-white">{t('home.whyExpensia')}</Heading>
                    <p className="max-w-2xl mx-auto mb-6 dark:text-gray-300">
                        {t('home.whyExpensiaDesc')}
                    </p>
                    <Button>{t('home.learnMore')}</Button>
                </Section>

                <Section id="stats" className="text-center">
                    <Heading level={2} className="text-3xl mb-8 dark:text-white">{t('home.trustedBy')}</Heading>
                    <div className="flex flex-wrap justify-center gap-8">
                        <StatBox value="95%" label={t('home.satisfactionRate')} />
                        <StatBox value="500+" label={t('home.groupsManaged')} />
                        <StatBox value="24/7" label={t('home.supportAvailability')} />
                    </div>
                </Section>

                <Section id="cta" className="bg-green-600 text-white text-center">
                    <Heading level={2} className="text-3xl mb-4">{t('home.readyToTakeControl')}</Heading>
                    <p className="mb-6">{t('home.joinToday')}</p>
                    <LinkButton to="/signup">{t('home.signUpNow')}</LinkButton>
                </Section>
            </div>
        </>
    );
}
