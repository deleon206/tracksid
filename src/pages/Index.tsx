import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import HybridPlatformSection from "@/components/HybridPlatformSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

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
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
