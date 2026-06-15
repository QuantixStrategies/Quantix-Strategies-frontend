import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ProofSection from "@/components/ProofSection";
import CoreEthosSection from "@/components/CoreEthosSection";
import ServicesSection from "@/components/ServicesSection";
import AssessmentPromoSection from "@/components/AssessmentPromoSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProofSection />
        <CoreEthosSection />
        <ServicesSection />
        <AssessmentPromoSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
