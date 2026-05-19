import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrustBar from "@/components/TrustBar";
import WhoWeAreSection from "@/components/WhoWeAreSection";
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
      <ServicesSection />
      <TrustBar />
      <WhoWeAreSection />
      <HybridPlatformSection />
      <TestimonialsSection />
      <FaqSection />
      <LatestMagSection />
      <Footer />
    </div>
  );
};

export default Index;
