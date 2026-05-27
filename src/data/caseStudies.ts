/**
 * Case Studies  -  synced from source of truth:
 * `qunat_frontend/quantix_pdf.html` (`cases` array).
 */

export type CaseTag =
  | "Startups & Founders"
  | "Family Businesses"
  | "Government & Public Sector"
  | "Conglomerates & Large Corporates"
  | "MNCs & International Businesses"
  | "Universal  -  All Client Types"
  | "Conglomerates & Family Businesses"
  | "Startups & Family Businesses";

export interface CaseStudy {
  id: number;
  tag: CaseTag;
  stat: { v: string; label: string };
  quote: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  insight: string;
  client: string;
  industry: string;
}

/** Filter pills: first is “all”, rest match `CaseTag` values from the PDF. */
export const FILTER_LABELS = [
  "All Cases",
  "Startups & Founders",
  "Family Businesses",
  "Government & Public Sector",
  "Conglomerates & Large Corporates",
  "MNCs & International Businesses",
  "Universal  -  All Client Types",
  "Conglomerates & Family Businesses",
  "Startups & Family Businesses",
] as const;

export type FilterPill = (typeof FILTER_LABELS)[number];

export const cases: CaseStudy[] = [
  {
    id: 1,
    tag: "Startups & Founders",
    stat: {
      v: "18 months",
      label: "of bottlenecked decisions  -  resolved in one strategic intervention",
    },
    quote:
      "Every decision ran through one person. The company was scaling. The founder wasn't.",
    title: "When the Founder Is the Bottleneck",
    problem:
      "A high-growth startup was scaling rapidly but every major decision ran through the founder. When the founder was unavailable, the organization was paralyzed. The leadership team had operational authority but no strategic autonomy  -  creating a ceiling on growth that no amount of hiring could fix.",
    approach:
      "Quantix Strategies embedded alongside the founding team to map every decision type the organization was making, classify them by strategic vs. operational significance, and design a Decision Rights Framework. We then facilitated a leadership alignment session that transferred strategic ownership to function heads  -  with clear escalation paths and a founder-review cadence that preserved oversight without dependency.",
    outcome:
      "Within 90 days, the leadership team was operating with full strategic autonomy on 70% of decisions previously escalated to the founder. The founder reclaimed 12+ hours per week for market-facing work. The organization shipped its quarterly roadmap on time for the first time in three cycles.",
    insight:
      "Founder-dependence is not a leadership problem  -  it is a systems problem. Most founders don't hold on because they want to; they hold on because no architecture exists to let go safely. Build the architecture first.",
    client: "Growth-Stage Startup",
    industry: "Technology / SaaS",
  },
  {
    id: 2,
    tag: "Family Businesses",
    stat: {
      v: "3 generations",
      label: "of family leadership  -  aligned on a single strategic succession roadmap for the first time",
    },
    quote: "The business was thriving. The family was avoiding the one conversation that could end it.",
    title: "The Succession Nobody Talked About",
    problem:
      "A second-generation family business with strong revenues had no strategic plan for leadership transition to the third generation. The family avoided the conversation until a health scare brought the urgency into sharp focus  -  at the worst possible moment to make a good decision.",
    approach:
      "Quantix Strategies served as a neutral strategic advisor. We separated the family conversation from the business conversation  -  a critical distinction most advisors miss. Using a structured Succession Strategy Framework, we mapped the business's strategic requirements for its next phase, assessed leadership readiness, and designed a phased transition plan with governance structures every stakeholder could own.",
    outcome:
      "A 5-year succession roadmap was agreed upon and documented  -  the first formal strategic plan in the company's 40-year history. A family governance charter was established. Two third-generation members entered defined developmental tracks, and an independent board seat was created to provide continuity.",
    insight:
      "Succession planning is a strategy problem disguised as a family problem. The families that navigate it well are the ones that bring in a neutral voice early  -  before urgency forces a decision that emotions make messy.",
    client: "Second-Generation Family Business",
    industry: "Manufacturing & Distribution",
  },
  {
    id: 3,
    tag: "Government & Public Sector",
    stat: {
      v: "4×",
      label: "larger contract value secured by repositioning as a long-term strategic partner",
    },
    quote: "Everyone else competed on price. We competed on strategic alignment. There was no contest.",
    title: "The Government Tender That Changed Everything",
    problem:
      "A government agency announced a large procurement initiative. A private sector client was eager to compete but approached it as a transaction  -  lowest price, fastest delivery, standard scope. They were reading the surface of the tender, not the policy intent beneath it.",
    approach:
      "Quantix Strategies decoded the policy signals embedded in the tender documentation  -  the language, evaluation criteria, the unstated strategic objectives the government was trying to achieve. We repositioned the client's response from a vendor proposal to a strategic partnership submission, aligned with the agency's 5-year mandate.",
    outcome:
      "The client was awarded the contract at a value significantly above the original scope, as the government expanded the engagement to include strategic advisory components. The relationship also positioned them as a preferred partner for two subsequent initiatives  -  neither of which went to open tender.",
    insight:
      "Governments don't buy products or services. They buy confidence  -  that a partner understands what they are trying to achieve and will protect them from the risk of failure. Price is almost never the real decision variable.",
    client: "Private Sector Organization",
    industry: "Infrastructure & Public Services",
  },
  {
    id: 4,
    tag: "Conglomerates & Large Corporates",
    stat: {
      v: "11→4 months",
      label: "time-to-market after restructuring the venture operating model",
    },
    quote: "They wanted startup speed inside a conglomerate structure. The structure always won.",
    title: "When a Conglomerate Tried to Act Like a Startup",
    problem:
      "A large conglomerate wanted to launch a new venture in a high-growth sector. They applied existing procurement, HR, and governance processes and expected startup speed. Twelve months in, they had a team, a budget, and almost no progress. Talent was leaving for actual startups.",
    approach:
      "Quantix Strategies designed a separate strategic operating model for the new venture  -  with its own decision rights, performance metrics, talent philosophy, and governance cadence. We negotiated the precise 'air gap' between the venture and the parent, defining which conglomerate resources the venture could access and which processes it was exempt from.",
    outcome:
      "The venture launched its MVP within 4 months of the new operating model being implemented. Key talent was retained. The parent conglomerate adopted elements of the model for two other internal ventures, creating a repeatable playbook for corporate venture building.",
    insight:
      "You cannot run a new venture with old company infrastructure. The governance, metrics, and hiring all need rebuilding for the new entity's reality. The parent's job is to provide capital and strategic air cover  -  then step back.",
    client: "Diversified Conglomerate",
    industry: "Multi-sector / New Ventures",
  },
  {
    id: 5,
    tag: "MNCs & International Businesses",
    stat: {
      v: "18 months",
      label: "lost executing the wrong strategy before an embedded strategic reset changed direction",
    },
    quote: "They had the playbook. The market just refused to read it.",
    title: "The MNC That Mistook a Market for Its Headquarters",
    problem:
      "A multinational entered a new geography expecting it to behave like its home market  -  same positioning, same channel strategy, same org design. Eighteen months in, market share was flat, key distributor relationships were strained, and regional leadership was spending more time defending decisions to HQ than making new ones.",
    approach:
      "Quantix Strategies conducted an embedded strategic assessment  -  interviewing local stakeholders, mapping the regulatory and competitive landscape, and identifying where the global playbook was misaligned with local market reality. We facilitated a strategy reset with both regional and global leadership, creating a localized plan that preserved global brand integrity while giving the regional team genuine autonomy.",
    outcome:
      "The MNC restructured its channel strategy, rebuilt two key distributor relationships, and realigned its product positioning to local purchasing behavior. Within two quarters, market share began recovering. The regional leadership team's mandate was expanded.",
    insight:
      "The most expensive assumption a multinational can make is that success in one market is a template for the next. Every market has its own power structure, trust dynamics, and decision logic. Global winners stay genuinely curious about each new context.",
    client: "Multinational Corporation",
    industry: "Consumer Goods / Retail",
  },
  {
    id: 6,
    tag: "Universal  -  All Client Types",
    stat: {
      v: "6 months",
      label: "post-strategy with zero execution  -  resolved with a 90-day operating rhythm",
    },
    quote: "The strategy was excellent. It lived in a shared drive. Nobody could find it.",
    title: "Strategy Without Execution Is Just a Document",
    problem:
      "An organization had invested significantly in a strategy development process. Leadership was aligned. The document was thorough and well-presented. Six months later, the business was operating identically to how it had before. The strategy had not translated into a single changed behavior, decision, or priority.",
    approach:
      "Quantix Strategies ran a Strategy Activation process  -  a translation exercise, not another planning exercise. We converted strategic priorities into a 90-day roadmap with named owners, defined decision checkpoints, and visible progress indicators. We introduced a monthly Strategy Operations Review  -  a 90-minute leadership ritual that kept strategy visible and accountable.",
    outcome:
      "Within the first 90-day cycle, three major strategic initiatives that had been stalled for months were unblocked and actively progressing. The leadership team reported the monthly rhythm changed the quality of their conversations  -  from operational firefighting to genuine strategic steering.",
    insight:
      "Strategy activation is a distinct skill from strategy development. Most organizations are good at the latter and almost completely unprepared for the former. The question is never 'do we have a strategy?'  -  it is always 'does our strategy change anything we do on Monday morning?'",
    client: "Mid-Size Enterprise",
    industry: "Financial Services",
  },
  {
    id: 7,
    tag: "Startups & Founders",
    stat: {
      v: "3 failed pitches",
      label: "before a strategic narrative reframe  -  followed by term sheet within 60 days",
    },
    quote: "The product worked. The numbers were real. The story wasn't there yet.",
    title: "Raising Capital Without a Strategy Story",
    problem:
      "A health technology startup had strong product-market fit, real revenue, and a credible team. After pitching a dozen investors across three months, the consistent feedback was: 'We love the product but we're not sure about the opportunity.' The founders were confused  -  the market was large, the product worked. What were investors not seeing?",
    approach:
      "Quantix Strategies rebuilt the strategic narrative from first principles  -  not the pitch deck, but the underlying strategic logic it needed to express. We answered three questions: Why is this the right moment in history for this company to exist? Why is this team the inevitable owner of this opportunity? What does winning in this market actually look like at scale?",
    outcome:
      "The revised pitch reframed the company not as a health tech product but as the infrastructure layer for a structural shift in how healthcare delivery was being financed. The first investor pitched with the new narrative issued a term sheet. The round closed oversubscribed.",
    insight:
      "Investors don't fund businesses  -  they fund narratives about the future in which your business is the most important actor. The financial model validates the narrative; it does not replace it. If your pitch isn't working, the numbers are rarely the problem.",
    client: "Series A Startup",
    industry: "Health Technology",
  },
  {
    id: 8,
    tag: "Conglomerates & Family Businesses",
    stat: {
      v: "6×",
      label: "faster strategic decision-making after removing four unnecessary approval layers",
    },
    quote: "The strategy said go right. The structure kept pulling left. Structure was winning.",
    title: "The Org Chart That Was Killing the Strategy",
    problem:
      "A growing organization's leadership structure had not evolved alongside its strategy. Strategic decisions were being made three levels below where they should be. The people closest to the market had no authority. Accountability was diffuse. The leadership team had been stuck  -  by their own description  -  for two years.",
    approach:
      "Quantix Strategies conducted a Strategic Org Design process  -  mapping which decisions needed to be made, at what frequency, with what information, and by whom. We identified three structural misalignments where the org chart was directly contradicting the strategy, then implemented a redesign in phases to preserve stability while progressively shifting authority.",
    outcome:
      "Three senior leadership roles were redesigned with expanded strategic mandates. Four approval layers were reduced to two. A leadership team that had been unable to move on key decisions for 18 months closed two major deals and launched one new business line within the following quarter.",
    insight:
      "Organization design is one of the most powerful and most neglected strategic levers available to leadership. Structure is not neutral  -  it encodes priorities, power, and pace. When strategy changes, structure must follow. If it doesn't, the old structure will outlast the new strategy every time.",
    client: "Family-Owned Conglomerate",
    industry: "Real Estate & Hospitality",
  },
  {
    id: 9,
    tag: "Universal  -  All Client Types",
    stat: {
      v: "₹4Cr+",
      label: "estimated annual revenue impact from misalignment  -  identified and resolved",
    },
    quote:
      "Commercial wanted growth at all costs. Operations wanted margin preservation. Neither knew the other's mandate.",
    title: "When Two Departments Had Two Different Strategies",
    problem:
      "A company's commercial team was pursuing growth aggressively, often at unsustainable margins. Its operations team was focused on margin protection  -  sometimes at the cost of service quality. Neither function knew what the other was optimizing for. The result was internal conflict presenting as missed targets and high client churn.",
    approach:
      "Quantix Strategies ran a Cross-Functional Strategy Alignment process  -  building a shared operating thesis for the business. We developed a unified definition of an 'ideal client,' a joint growth and margin model, and a quarterly planning rhythm that required both functions to sign off on growth targets together.",
    outcome:
      "Client acquisition criteria were tightened  -  resulting in 20% fewer new clients but 35% improvement in retention. Gross margin improved materially within two quarters. The leadership team reported the monthly conflict between commercial and operations had effectively ceased.",
    insight:
      "Most internal conflict is not a people problem  -  it is a systems problem. When two teams pull in opposite directions, it is almost always because they have been given different mandates and are both doing exactly what they were told. Alignment starts with a shared definition of winning.",
    client: "B2B Services Company",
    industry: "Professional Services",
  },
  {
    id: 10,
    tag: "Startups & Family Businesses",
    stat: {
      v: "$2M+",
      label: "deployed into the wrong market  -  redirectable for under $50K with prior assessment",
    },
    quote: "The signals were all there. Nobody had built the process to read them.",
    title: "The Market Research That Cost Millions by Not Happening",
    problem:
      "A startup launched a new product based on founder conviction and informal feedback. The team moved fast and invested heavily in distribution. A year in, the product had traction in a completely different segment than targeted  -  and the original segment was structurally underserved for reasons visible in the data before launch.",
    approach:
      "Quantix Strategies designed a Strategic Market Assessment framework  -  a 30-day process combining desk research, competitor signal analysis, channel interviews, and customer archetype mapping. Applied to the company's next planned market move, it generated a segment prioritization recommendation that shifted their expansion focus before capital was committed.",
    outcome:
      "The company pivoted its next product launch to the segment the framework identified as highest-probability. Early sales velocity outperformed the original launch by a factor of three. The assessment framework was adopted as a standing pre-launch process.",
    insight:
      "Market research is not a checkbox or a cost  -  it is a risk management instrument. Every dollar spent understanding a market before entry is worth at least ten dollars saved from entering the wrong one. The most expensive research is the research that doesn't happen.",
    client: "Consumer-Facing Startup",
    industry: "Food & Beverage",
  },
  {
    id: 11,
    tag: "Conglomerates & Family Businesses",
    stat: {
      v: "14 months",
      label: "of board deadlock  -  broken with a single strategic alignment intervention",
    },
    quote: "They had the right people in the room. They just had the wrong conversation at the table.",
    title: "The Board That Couldn't Agree on Anything",
    problem:
      "A mid-market company with a high-quality board had been unable to reach consensus on three critical strategic decisions for over a year. Each board meeting ended without resolution. The CEO was caught between competing factions. The management team had stopped bringing strategic questions to the board because nothing came out of it.",
    approach:
      "Quantix Strategies facilitated a Board Strategy Alignment process  -  separate from the board meeting itself. We conducted individual conversations with each board member to understand their underlying concerns, mapped where genuine disagreement existed versus where misaligned assumptions were creating artificial conflict, and redesigned the decision-making protocol for high-stakes board discussions.",
    outcome:
      "All three stalled decisions were resolved within two board cycles. A new board decision framework was adopted permanently. The CEO reported a material improvement in board meeting quality and a reduction in time spent managing board dynamics  -  freeing leadership bandwidth for actual strategy.",
    insight:
      "Board deadlock is rarely about the decision on the table. It is almost always about unresolved assumptions, unspoken concerns, or misaligned definitions of success. The fastest way to break a deadlock is to surface what is actually blocking it  -  and that rarely happens inside the boardroom.",
    client: "Mid-Market Company",
    industry: "Technology / B2B",
  },
  {
    id: 12,
    tag: "Startups & Founders",
    stat: {
      v: "3×",
      label: "headcount growth in 18 months  -  managed without loss of founding-team culture or product quality",
    },
    quote:
      "They tripled headcount in 18 months. The culture that built the product didn't survive the hiring.",
    title: "Scaling Without Losing What Made You Great",
    problem:
      "A fast-growing startup had tripled its team in 18 months. The product quality that had driven early growth was declining. Founding-team members were disengaged. New hires were confused about how decisions were made and what the company actually stood for. The culture had not been designed  -  it had been inherited, and it wasn't scaling.",
    approach:
      "Quantix Strategies conducted a Culture & Operating Model Audit  -  interviewing across tenure levels to identify what was actually driving performance versus what was mythology. We separated the elements of culture that were genuinely competitive advantages from those that were artifacts of the startup phase. A Culture Architecture document was developed and translated into hiring, onboarding, and performance frameworks.",
    outcome:
      "Founding-team retention improved materially. New hire time-to-productivity reduced by 40%. Product quality metrics stabilized within two quarters. The Culture Architecture document became the basis for the company's employer brand narrative in subsequent fundraising.",
    insight:
      "Culture is not a feeling  -  it is a system. It is the sum of what gets rewarded, what gets tolerated, and what gets celebrated. If you don't design it intentionally as you scale, the organization will design it for you  -  and you may not like what it builds.",
    client: "High-Growth Startup",
    industry: "EdTech / Consumer",
  },
  {
    id: 13,
    tag: "Conglomerates & Family Businesses",
    stat: {
      v: "9 months",
      label: "into a troubled partnership  -  fully restructured and value-creating within 6 months of strategic reset",
    },
    quote:
      "On paper, it was the perfect partnership. In practice, neither side had defined what they actually needed from each other.",
    title: "The Strategic Partnership That Almost Destroyed Both Companies",
    problem:
      "Two companies had entered a strategic partnership that looked compelling on paper  -  complementary capabilities, shared markets, strong founding chemistry. Nine months in, the relationship had deteriorated significantly. Each party felt the other was not delivering. Revenue projections had not materialized. The CEOs were no longer speaking directly.",
    approach:
      "Quantix Strategies was brought in as a neutral strategic advisor to both parties. We conducted a Partnership Diagnostic  -  mapping the original value thesis against what had actually been built, identifying where structural misalignments (rather than bad faith) were driving the dysfunction. A revised Partnership Charter was negotiated, with clear deliverables, decision rights, and exit provisions.",
    outcome:
      "The partnership was restructured with a narrower, more focused value thesis. Within two quarters, both parties were generating measurable value from the relationship. The revised charter became the template for both organizations' future partnership structures.",
    insight:
      "Most strategic partnerships fail not because the strategy was wrong, but because the operating agreement was incomplete. The value thesis is the easy part. Defining what each party owes the other, who decides what, and how conflict gets resolved  -  that is the work that determines whether a partnership survives contact with reality.",
    client: "Two Mid-Market Organizations",
    industry: "Logistics & Supply Chain",
  },
  {
    id: 14,
    tag: "Universal  -  All Client Types",
    stat: {
      v: "₹8Cr",
      label: "in avoidable inventory write-down  -  traceable to a single strategic decision made against the data",
    },
    quote: "The data was clear. The conviction in the room was louder. Conviction won. It shouldn't have.",
    title: "When the Data Said One Thing and Leadership Said Another",
    problem:
      "A consumer business had invested in a new product line based on leadership conviction that contradicted their own customer research. The data showed limited appetite in the target segment. Leadership dismissed the research as 'not capturing the real customer.' The product was launched at scale. The market responded exactly as the data had predicted.",
    approach:
      "Quantix Strategies worked with the leadership team retrospectively and then prospectively  -  building a Strategic Decision Protocol that defined the evidentiary standard required before major capital commitments. We introduced a Red Team process: for every major strategic decision, a designated team was required to make the strongest possible case against it before the decision was finalized.",
    outcome:
      "The Red Team process surfaced fatal flaws in two subsequent product launch decisions before capital was committed  -  saving an estimated ₹12Cr in potential write-downs. The protocol was adopted across all business units. Leadership reported that the quality of strategic discussion improved materially.",
    insight:
      "The most dangerous moment in any organization is when a leader's conviction overrides the evidence in the room. The solution is not better data  -  it is a process that makes it structurally safe to challenge a strongly-held view before the decision is irreversible.",
    client: "Retail & Consumer Business",
    industry: "Retail / D2C",
  },
  {
    id: 15,
    tag: "Startups & Family Businesses",
    stat: {
      v: "22%",
      label: "average revenue uplift within two quarters of implementing a value-based pricing model",
    },
    quote: "They had no pricing strategy. Their clients had figured that out. And they were using it.",
    title: "The $0 Cost Strategy That Was Costing Everything",
    problem:
      "A professional services firm had been pricing based on cost-plus for years  -  calculating their time and adding a margin. They were consistently the lowest-priced credible option in their market. Clients were comparing them to cheaper alternatives on cost alone. The firm was growing but not profitably  -  and the team was exhausted from overdelivering at underpriced engagements.",
    approach:
      "Quantix Strategies designed a Value-Based Pricing Transition  -  working with the leadership team to map the actual outcomes their clients achieved, quantify the value delivered versus the fees charged, and rebuild the pricing architecture around client outcomes rather than service inputs. We also redesigned the firm's proposal process to lead with value before introducing price.",
    outcome:
      "Average engagement value increased by 22% within two quarters. Client acquisition volume reduced slightly but engagement profitability improved significantly. The team reported a material improvement in how clients perceived the quality of their work  -  because the price signal had changed the client's expectation.",
    insight:
      "Pricing is a strategic statement about the value you believe you create. When you price low, you are telling your clients  -  and your team  -  that you don't believe your own work is worth much. Pricing strategy is not a finance decision. It is a positioning decision.",
    client: "Professional Services Firm",
    industry: "Consulting / Advisory",
  },
];
