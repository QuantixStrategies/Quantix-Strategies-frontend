import { Users, FileText, Settings, Handshake, LineChart, Briefcase } from "lucide-react";

const services = [
  {
    title: "Business Strategy",
    icon: Users,
    category: "Corporate",
    items: [
      "Strategy Consulting",
      "Business Plans & Strategy",
      "Expansion Strategy",
      "Growth Strategy",
      "Organizational Structuring",
    ],
  },
  {
    title: "Business Operations",
    icon: Settings,
    category: "Corporate",
    items: [
      "Organizational Transformation Support",
      "Optimal Capital Structuring",
      "Reports and Board Presentations",
      "Treasury and Investment Analysis Reports",
    ],
  },
  {
    title: "Review and Monitoring",
    icon: LineChart,
    category: "Corporate",
    items: [
      "Periodic Performance Evaluations (FP&A)",
      "Variance Analysis and Budget Review",
      "Interactive Dashboards",
      "Corporate Periodic Reporting",
    ],
  },
  {
    title: "Project Feasibility Assessment",
    icon: FileText,
    category: "Asset / Project Level",
    items: [
      "Feasibility Studies",
      "Opportunity Screening",
      "Project Conceptualization and Strategy",
      "Due-diligence",
      "Product Profiling and Pricing Decisions",
    ],
  },
  {
    title: "Transaction and Deal Advisory",
    icon: Handshake,
    category: "Asset / Project Level",
    items: [
      "Asset Valuations",
      "Business Valuations",
      "Investment Teasers, IMs, Pitch Decks",
      "Market and Industry Research",
      "Deal Structuring and Execution",
    ],
  },
  {
    title: "Portfolio Management",
    icon: Briefcase,
    category: "Asset / Project Level",
    items: [
      "Post-transaction Support",
      "Performance Assessment and Monitoring",
      "Reporting and Dashboards",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Core Services Offered
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer a broad range of services including financial solutions, strategy formulation, 
            implementation and other services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isCorporate = service.category === "Corporate";
            
            return (
              <div
                key={index}
                className="bg-background rounded-lg p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow border-l-4"
                style={{
                  borderLeftColor: isCorporate ? "hsl(var(--blue-medium))" : "hsl(var(--teal))",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: isCorporate
                        ? "hsl(var(--blue-light) / 0.1)"
                        : "hsl(var(--teal) / 0.1)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{
                        color: isCorporate ? "hsl(var(--blue-medium))" : "hsl(var(--teal))",
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {service.category}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                </div>

                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
