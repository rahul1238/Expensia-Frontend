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

                <Section id="data-privacy" className="bg-blue-50 dark:bg-blue-900/20 text-center">
                    <Heading level={2} className="text-3xl mb-6 dark:text-white">{t('home.dataPrivacyTitle')}</Heading>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg mb-6 dark:text-gray-300">
                            {t('home.dataPrivacyDesc')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <Card className="text-left">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <Heading level={4} className="text-lg font-semibold mb-2 dark:text-white">{t('home.gmailIntegrationTitle')}</Heading>
                                        <p className="text-sm dark:text-gray-300">{t('home.gmailIntegrationDesc')}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="text-left">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <Heading level={4} className="text-lg font-semibold mb-2 dark:text-white">{t('home.dataSecurityTitle')}</Heading>
                                        <p className="text-sm dark:text-gray-300">{t('home.dataSecurityDesc')}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <LinkButton to="/privacy-policy" variant="outline">
                                {t('home.viewPrivacyPolicy')}
                            </LinkButton>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('home.transparentDataUsage')}
                            </p>
                        </div>
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
