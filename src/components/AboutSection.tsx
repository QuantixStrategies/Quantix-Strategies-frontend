import { Target, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "Samridhhi M.",
    title: "Partner",
    bio: "Samridhhi brings 8+ years of experience in strategy, deal advisory, and financial analysis. As a seasoned professional in the strategy division at Quantix Strategies, she honed her expertise in research, competitive intelligence, strategy frameworks, etc., to identify and execute opportunities across family offices, conglomerates, government, etc., with a combined AUM of ~$50 Bn. Samridhhi holds a dual masters in Economics and Statistics from Indian Statistical Institute, Kolkata. Additionally, she has cleared two levels of Chartered Accountancy course of the Institute of Chartered Accountants of India (ICAI), reflecting her strong foundation in financial management and strategic decision-making",
    geography: ["India", "UK", "France", "USA", "UAE", "Turkey", "Saudi Arabia", "Germany"],
  },
];

const advisors = [
  {
    name: "CA Subhash M.",
    title: "Senior Advisor",
    bio: "Subhash is a seasoned professional with 25+ years of expertise in business valuation, financial planning, tax management, and investment advisory. During his professional journey, Subhash has successfully led multiple strategic mandates and investment transactions, including corporate strategies, and portfolio optimization, M&A transactions, etc.",
    bio2: "He has collaborated with family offices, portfolio managers, sovereign wealth funds, conglomerates, and private companies spanning across an AUM of >$300 Bn. Subhash is a practicing-chartered-accountant and a fellow member; he also graduated with a Bachelor's in Finance from one of the top-rated undergraduate business school in India",
    geography: ["India", "UK", "USA", "UAE", "France", "Germany"],
  },
  {
    name: "CA Ajay L.",
    title: "Advisor",
    bio: "Ajay brings ~17 years of experience in transaction advisory, tax management, due diligence, and investor relations. As a seasoned professional, he honed his expertise in FP&A analysis, research, executing strategic opportunities across M&A, equity, and debt markets",
    bio2: "Ajay holds a bachelor's degree in commerce, and is a fellow member of the Institute of Chartered Accountants of India, reflecting his solid foundations in financial management and strategic decision-making",
    geography: [],
  },
];

const visionPoints = [
  "At Quantix Strategies, our vision is to be the trusted extended teams of premier global advisory firms",
  "We are dedicated to deliver exceptional advisory services that enhance business performance and drive strategic growth",
  "At Quantix Strategies we empower early-stage and emerging businesses to reach their full potential by providing strategic insights, tailored solutions, and transformative support",
  "We aim to drive sustainable growth and create long-term value for our clients and communities",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 space-y-20">

        {/* Company Overview */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            About Quantix Strategies
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-10"></div>

          <div className="bg-primary/5 border-l-4 border-accent p-8 lg:p-12 text-left">
            <div className="text-4xl text-accent font-serif mb-4">"</div>
            <p className="text-base lg:text-lg text-foreground leading-relaxed italic">
              Established in 1998, Quantix Strategies Inc (formerly SMACo.) is a trusted consulting and business services firm, focused on driving meaningful transformation through deep insights, strategic foresight, and precise execution
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent/10 p-2.5 rounded-lg">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              Vision & Mission
            </h3>
          </div>

          <div className="border border-border rounded-lg p-8 lg:p-10 bg-card">
            <ul className="space-y-5">
              {visionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0"></span>
                  <p className="text-base text-muted-foreground leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Management Team */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent/10 p-2.5 rounded-lg">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              Management Team
            </h3>
          </div>

          <div className="space-y-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-border rounded-lg p-8 lg:p-10 bg-card">
                <div className="mb-4">
                  <span className="text-lg font-bold text-foreground">{member.name}</span>
                  <span className="text-base italic text-secondary ml-2">{member.title}</span>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">{member.bio}</p>
                {member.geography.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-foreground italic">Geographical Exposure: </span>
                    <span className="text-sm text-muted-foreground">{member.geography.join(" · ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent/10 p-2.5 rounded-lg">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              Advisors
            </h3>
          </div>

          <div className="space-y-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="border border-border rounded-lg p-8 lg:p-10 bg-card">
                <div className="mb-4">
                  <span className="text-lg font-bold text-foreground">{advisor.name}</span>
                  <span className="text-base italic text-secondary ml-2">{advisor.title}</span>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">{advisor.bio}</p>
                {advisor.bio2 && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{advisor.bio2}</p>
                )}
                {advisor.geography.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-foreground italic">Geographical Exposure: </span>
                    <span className="text-sm text-muted-foreground">{advisor.geography.join(" · ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
