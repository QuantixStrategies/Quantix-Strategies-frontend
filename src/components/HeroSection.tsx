import heroBackground from "@/assets/hero-network-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Network visualization background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          <div className="flex gap-4 items-start mb-8">
            <div className="w-1 h-32 bg-accent flex-shrink-0"></div>
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-2">
                Every Decision
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground">
                Better Informed
              </h2>
            </div>
          </div>
          <p className="text-lg text-primary-foreground max-w-2xl ml-5">
            Offshore management consulting delivering actionable insights for family offices, fund managers, and institutional investors worldwide
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
