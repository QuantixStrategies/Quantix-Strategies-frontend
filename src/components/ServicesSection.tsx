import { Users, FileText, Settings, Handshake, LineChart, Briefcase, type LucideIcon } from "lucide-react";

type Tier = "corporate" | "asset";

type ServiceItem = {
  title: string;
  icon: LucideIcon;
  tier: Tier;
  items: string[];
};

const services: ServiceItem[] = [
  {
    title: "Business Strategy",
    icon: Users,
    tier: "corporate",
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
    tier: "corporate",
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
    tier: "corporate",
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
    tier: "asset",
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
    tier: "asset",
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
    tier: "asset",
    items: [
      "Post-transaction Support",
      "Performance Assessment and Monitoring",
      "Reporting and Dashboards",
    ],
  },
];

const TIER_LABEL: Record<Tier, string> = {
  corporate: "CORPORATE",
  asset: "ASSET / PROJECT LEVEL",
};

const TIER_TEXT: Record<Tier, string> = {
  corporate: "#386FA4",
  asset: "#954F72",
};

const TIER_TOP: Record<Tier, string> = {
  corporate: "#386FA4",
  asset: "#954F72",
};

const BULLET_BG: Record<Tier, string> = {
  corporate: "#386FA4",
  asset: "#954F72",
};

function TierHeader({ tier }: { tier: Tier }) {
  return (
    <div className="mb-6 flex w-full items-center gap-4">
      <div
        className="h-px min-h-px flex-1"
        style={{ background: "rgba(56, 111, 164, 0.3)" }}
        aria-hidden
      />
      <span
        className="shrink-0 text-[12px] font-medium uppercase tracking-[3px]"
        style={{
          color: TIER_TEXT[tier],
          letterSpacing: "3px",
        }}
      >
        {TIER_LABEL[tier]}
      </span>
      <div
        className="h-px min-h-px flex-1"
        style={{ background: "rgba(56, 111, 164, 0.3)" }}
        aria-hidden
      />
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  const tier = service.tier;
  const isCorporate = tier === "corporate";

  return (
    <article
      className="group rounded-[10px] border-x border-b border-[rgba(56,111,164,0.15)] border-t-[3px] bg-[#1A1A2E] px-7 py-8 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:border-t-[#B8962E] hover:shadow-[0_12px_40px_rgba(56,111,164,0.15)]"
      style={{ borderTopColor: TIER_TOP[tier] }}
    >
      <div
        className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[10px] border"
        style={{
          background: "rgba(56, 111, 164, 0.08)",
          borderColor: "rgba(56, 111, 164, 0.2)",
        }}
      >
        <Icon
          className="h-6 w-6 shrink-0"
          style={{ color: isCorporate ? "#386FA4" : "#954F72" }}
          strokeWidth={1.75}
        />
      </div>

      <h3 className="mb-5 text-[18px] font-semibold leading-snug text-[#F0EDE8]">{service.title}</h3>
      <div className="h-0.5 w-9 bg-[#B8962E]" style={{ width: 36, height: 2, marginBottom: 16 }} />

      <ul className="m-0 list-none space-y-2 p-0">
        {service.items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-2.5">
            <span
              className="mt-[0.35em] h-[5px] w-[5px] shrink-0 rotate-45 rounded-[1px]"
              style={{ backgroundColor: BULLET_BG[tier] }}
              aria-hidden
            />
            <span className="text-[13px] leading-[1.7] text-[#A8B2BD]">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

const ServicesSection = () => {
  const corporate = services.filter((s) => s.tier === "corporate");
  const asset = services.filter((s) => s.tier === "asset");

  return (
    <section id="services" className="bg-[#0D1B2A] py-[100px]">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-center text-[36px] font-bold leading-tight text-[#F0EDE8]">
          Comprehensive Consulting Services
        </h2>
        <div
          className="mx-auto h-[3px] w-[60px] bg-[#B8962E]"
          style={{ margin: "12px auto 16px" }}
        />
        <p
          className="mx-auto mb-[60px] max-w-[600px] text-center text-[#A8B2BD]"
          style={{ lineHeight: 1.6 }}
        >
          End-to-end strategic support across business operations, investment decisions, and portfolio
          optimization
        </p>

        <div className="mb-12">
          <TierHeader tier="corporate" />
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 lg:grid-cols-3">
            {corporate.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>

        <div>
          <TierHeader tier="asset" />
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 lg:grid-cols-3">
            {asset.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
