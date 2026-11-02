import { useState } from "react";
import Navbar from "../components/Navbar";
// import LiveDispatchBanner from "../components/LiveDispatchBanner";
import Hero from "../components/Hero";
// import QuickActionCards from "../components/QuickActionCards";
// import ImpactStats from "../components/ImpactStats";
// import BloodGroupMatrix from "../components/BloodGroupMatrix";
// import HowItWorks from "../components/HowItWorks";
// import UrgentRequests from "../components/UrgentRequests";
// import WhyLifeLink from "../components/WhyLifeLink";
// import Testimonials from "../components/Testimonials";
// import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
// import { useApp } from "../context/AppContext";

export default function Home() {
  //   const { isDarkMode } = useApp();
  const { isDarkMode, setIsDarkMode } = useState(false);

  return (
    <div
      className={`w-full transition-colors font-body-md antialiased min-h-screen ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />
      <main className="w-full">
          <Hero />
        {/* <LiveDispatchBanner />
        <QuickActionCards />
        <ImpactStats />
        <BloodGroupMatrix />
        <HowItWorks />
        <UrgentRequests />
        <WhyLifeLink />
        <Testimonials />
        <CallToAction /> */}
      </main>
      <Footer />
    </div>
  );
}
