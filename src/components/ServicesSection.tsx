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
    <section id="services" className="py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Consulting Services
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            End-to-end strategic support across business operations, investment decisions, and portfolio optimization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isCorporate = service.category === "Corporate";
            
            return (
              <div
                key={index}
                className="bg-background rounded-lg p-6 lg:p-8 hover:shadow-md transition-shadow border-l-4"
                style={{
                  borderLeftColor: isCorporate ? "hsl(var(--secondary))" : "hsl(var(--accent))",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{
                      backgroundColor: isCorporate
                        ? "hsl(var(--secondary) / 0.1)"
                        : "hsl(var(--accent) / 0.1)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{
                        color: isCorporate ? "hsl(var(--secondary))" : "hsl(var(--accent))",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {service.category}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
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
