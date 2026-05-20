import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import TrustBar from "@/components/TrustBar";
import LatestMagSection from "@/components/LatestMagSection";
import HybridPlatformSection from "@/components/HybridPlatformSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <HybridPlatformSection />
      <TrustBar />
      <TestimonialsSection />
      <FaqSection />
      <LatestMagSection />
      <Footer />
    </div>
  );
};

export default Index;
