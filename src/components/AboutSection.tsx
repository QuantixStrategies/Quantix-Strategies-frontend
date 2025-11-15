import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Stats */}
          <div className="relative">
            <div className="bg-accent/5 p-12 lg:p-16 border-l-4 border-accent">
              <div className="text-6xl lg:text-7xl font-bold text-primary mb-3">145+</div>
              <div className="text-xl font-semibold text-foreground">Global Clients Served</div>
              <p className="text-base text-muted-foreground mt-2">
                Family offices and institutional investors
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Trusted Offshore Consulting Partner
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <p className="text-base text-muted-foreground mb-6">
              Quantix Strategies delivers specialized management consulting, investment advisory, and business analytics to family offices, fund managers, and institutional investors globally.
            </p>

            <p className="text-base text-muted-foreground mb-8">
              With proven expertise across 145+ client engagements, we provide actionable intelligence in business strategy, portfolio optimization, and transaction advisory—helping you make confident, data-backed decisions.
            </p>

            <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
