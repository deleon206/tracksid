import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import HybridPlatformSection from "@/components/HybridPlatformSection";
import UserTypeSolutions from "@/components/UserTypeSolutions";
import PlatformShowcase from "@/components/PlatformShowcase";
import SwitchBonusSection from "@/components/SwitchBonusSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

// Artist & Label Tools section removed
const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <HeroSection />
      <TrustBar />
      <CapabilitiesSection />
      <HybridPlatformSection />
      <UserTypeSolutions />
      <PlatformShowcase />
      <SwitchBonusSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
};

export default Index;
