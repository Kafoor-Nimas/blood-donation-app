import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import MissionVisionBento from "../components/about/MissionVisionBento";
import HowItWorksPipeline from "../components/about/HowItWorksPipeline";
import WhyChooseLifeLink from "../components/about/WhyChooseLifeLink";
import CommunitySolidarity from "../components/about/CommunitySolidarity";
import { useApp } from "../context/AppContext";
import CallToAction from "../components/CallToAction";

export default function About() {
  const { isDarkMode } = useApp();

  return (
    <div
      className={`w-full transition-colors font-body-md antialiased min-h-screen flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />

      <main className="w-full flex-1 pt-16">
        <AboutHero />
        <MissionVisionBento />
        <HowItWorksPipeline />
        <WhyChooseLifeLink />
        <CommunitySolidarity />
        <CallToAction />

      </main>

      <Footer />
    </div>
  );
}
