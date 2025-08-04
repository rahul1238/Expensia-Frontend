import LinkButton from "./ui/LinkButton";
import Heading from "./ui/Heading";
import Section from "./ui/Section";
import { useSelector } from "react-redux";
import  type { RootState } from "../app/store";
import { useTranslation } from "../hooks/useTranslation";

export default function Hero() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { t } = useTranslation();
    
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
                    {t('home.heroTitle')}
                </Heading>
                <p className="text-lg md:text-xl mb-6">
                    {t('home.heroSubtitle')}
                </p>
                <LinkButton to={isAuthenticated ? "/dashboard" : "/signup"}>
                    {isAuthenticated ? t('home.goToDashboard') : t('home.getStarted')}
                </LinkButton>
            </div>
        </Section>
    );
}
