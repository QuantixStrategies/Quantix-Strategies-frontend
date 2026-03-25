import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
import CoreEthosSection from "@/components/CoreEthosSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <TrustIndicators />
        <CoreEthosSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
