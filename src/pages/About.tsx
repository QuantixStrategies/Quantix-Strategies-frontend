import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
