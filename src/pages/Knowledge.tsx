import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudiesLibrary from "@/components/case-studies/CaseStudiesLibrary";

const Knowledge = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <CaseStudiesLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default Knowledge;
