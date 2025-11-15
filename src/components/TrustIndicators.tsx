import { Shield, Award, Users, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "145+",
    label: "Global Clients Served",
    description: "Family offices and institutional investors",
  },
  {
    icon: TrendingUp,
    value: "$2.5B+",
    label: "Assets Under Advisory",
    description: "Cumulative portfolio value managed",
  },
  {
    icon: Award,
    value: "20+",
    label: "Years Combined Experience",
    description: "Senior team expertise in consulting",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Client Confidentiality",
    description: "Secure data handling and NDA compliance",
  },
];

const TrustIndicators = () => {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-base font-semibold text-foreground mb-1">
                  {metric.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
