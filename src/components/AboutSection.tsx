import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-teal/20 to-transparent transform -skew-x-12 origin-top-left"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-to-tl from-blue-light/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Stats */}
          <div className="relative">
            <div className="bg-teal/10 backdrop-blur-sm p-12 lg:p-16 border-l-4 border-teal">
              <div className="text-7xl lg:text-8xl font-bold text-primary mb-4">145+</div>
              <div className="text-2xl lg:text-3xl font-light text-foreground">Clients Served</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                <span className="text-muted-foreground/30">Who</span>
                <span className="text-foreground"> We Are</span>
              </h2>
              <div className="w-16 h-1 bg-accent mt-4"></div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Quantix Strategies provides offshore management consulting, investment advisory and 
              business analytics support to family offices, fund managers, advisors and corporates 
              across the globe.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Through our long history of consulting projects with Family Offices and LPs, we&apos;ve 
              developed a unique vantage to enable our clients in critical areas of business ranging 
              from business strategy to portfolio management to transaction advisory.
            </p>

            <Button variant="default" size="lg" className="bg-teal hover:bg-teal/90">
              Find out more about us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
