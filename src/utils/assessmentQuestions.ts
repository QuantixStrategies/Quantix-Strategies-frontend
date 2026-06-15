import { Question } from '@/types/assessment';

export const strategicQuestions: Question[] = [
  {
    id: 'time_split',
    title: 'Strategic vs. Operational Time Split',
    subtitle:
      'What percentage of your weekly time is spent on strategic work (planning, vision, partnerships) vs. operational tasks (execution, firefighting)?',
    section: 'Strategic Focus & Time Allocation',
    type: 'scaled',
    options: [
      { value: 1, label: '0-20% strategic (constant firefighting mode)' },
      { value: 2, label: '20-40% strategic (mostly reactive)' },
      { value: 3, label: '40-60% strategic (balanced but stretched)' },
      { value: 4, label: '60-80% strategic (mostly proactive)' },
      { value: 5, label: '80%+ strategic (optimal founder focus)' },
    ],
  },
  {
    id: 'planning_consistency',
    title: 'Strategic Planning Consistency',
    subtitle: 'How regularly do you engage in formal strategic planning and review cycles?',
    section: 'Strategic Focus & Time Allocation',
    type: 'scaled',
    options: [
      { value: 1, label: 'Ad-hoc only when crisis hits' },
      { value: 2, label: 'Quarterly reviews, inconsistent' },
      { value: 3, label: 'Monthly strategic reviews' },
      { value: 4, label: 'Bi-weekly structured planning' },
      { value: 5, label: 'Weekly strategic planning blocks' },
    ],
  },
  {
    id: 'vision_docs',
    title: 'Vision Communication & Alignment',
    subtitle:
      'Do you have documented strategic frameworks that your team consistently references and follows?',
    section: 'Strategic Focus & Time Allocation',
    type: 'binary',
    options: [
      { value: 0, label: 'No documented frameworks' },
      { value: 1, label: 'Clear, documented strategic frameworks' },
    ],
  },
  {
    id: 'delegation_rate',
    title: 'Delegation Effectiveness',
    subtitle: 'What percentage of your non-core tasks are effectively delegated to others?',
    section: 'Delegation & Decision Making',
    type: 'scaled',
    options: [
      { value: 1, label: '0-20% (I handle most things myself)' },
      { value: 2, label: '20-40% (delegate some, take back often)' },
      { value: 3, label: '40-60% (delegate regularly, moderate oversight)' },
      { value: 4, label: '60-80% (delegate most, clear accountability)' },
      { value: 5, label: '80%+ (masterful delegation with systems)' },
    ],
  },
  {
    id: 'decision_delays',
    title: 'Decision Bottleneck Frequency',
    subtitle:
      "How often do key business decisions get delayed because they're waiting for your input or approval?",
    section: 'Delegation & Decision Making',
    type: 'scaled',
    options: [
      { value: 1, label: "Daily: I'm the bottleneck for most decisions" },
      { value: 2, label: 'Several times per week' },
      { value: 3, label: 'Weekly: some decisions pile up' },
      { value: 4, label: 'Rarely: only major strategic decisions' },
      { value: 5, label: 'Never: clear decision frameworks exist' },
    ],
  },
  {
    id: 'decision_matrix',
    title: 'Decision Authority Matrix',
    subtitle: 'Do you have a clear RACI matrix or decision authority framework that your team follows?',
    section: 'Delegation & Decision Making',
    type: 'binary',
    options: [
      { value: 0, label: 'No formal decision framework' },
      { value: 1, label: 'Clear decision authority matrix' },
    ],
  },
  {
    id: 'sustainability',
    title: 'Work-Life Integration & Sustainability',
    subtitle: 'How sustainable is your current workload and schedule for long-term performance?',
    section: 'Leadership Sustainability & Growth',
    type: 'scaled',
    options: [
      { value: 1, label: 'Unsustainable: heading toward burnout' },
      { value: 2, label: 'Challenging: working 70+ hours/week' },
      { value: 3, label: 'Manageable: some personal time exists' },
      { value: 4, label: 'Sustainable: healthy work-life balance' },
      { value: 5, label: 'Optimal: excellent integration and energy' },
    ],
  },
  {
    id: 'scalability',
    title: 'Scalability Preparedness',
    subtitle: 'How prepared is your organization to scale without significant founder bottlenecks?',
    section: 'Leadership Sustainability & Growth',
    type: 'scaled',
    options: [
      { value: 1, label: 'Not prepared: heavy founder dependency' },
      { value: 2, label: 'Somewhat prepared: some systems in place' },
      { value: 3, label: 'Moderately prepared: decent foundation' },
      { value: 4, label: 'Well prepared: strong systems and delegation' },
      { value: 5, label: 'Fully prepared: autonomous scaling capability' },
    ],
  },
  {
    id: 'succession_planning',
    title: 'Succession Planning & Knowledge Transfer',
    subtitle:
      'Do you have documented processes and knowledge that would allow the business to operate effectively in your temporary absence?',
    section: 'Leadership Sustainability & Growth',
    type: 'binary',
    options: [
      { value: 0, label: 'Business heavily dependent on my presence' },
      { value: 1, label: 'Strong knowledge transfer systems' },
    ],
  },
  {
    id: 'calendar_discipline',
    title: 'Calendar Discipline & Priority Management',
    subtitle: 'How often do you stick to your planned schedule and priorities without getting derailed?',
    section: 'Leadership Sustainability & Growth',
    type: 'scaled',
    options: [
      { value: 1, label: 'Rarely: constantly derailed (0-20% adherence)' },
      { value: 2, label: 'Sometimes: frequent interruptions (20-40%)' },
      { value: 3, label: 'Often: moderate adherence (40-60%)' },
      { value: 4, label: 'Usually: good adherence (60-80%)' },
      { value: 5, label: 'Consistently: excellent adherence (80%+)' },
    ],
  },
];

export const operationalQuestions: Question[] = [
  {
    id: 'role_clarity',
    title: 'Role Clarity & Boundaries',
    subtitle: 'How clear are roles, responsibilities, and boundaries across your organization?',
    section: 'Organizational Structure & Communication',
    type: 'scaled',
    options: [
      { value: 1, label: 'Very unclear: lots of overlap and confusion' },
      { value: 2, label: 'Somewhat unclear: frequent conflicts' },
      { value: 3, label: 'Generally clear with some gray areas' },
      { value: 4, label: 'Mostly clear: well-defined responsibilities' },
      { value: 5, label: 'Crystal clear: unambiguous roles' },
    ],
  },
  {
    id: 'coordination',
    title: 'Cross-Functional Coordination',
    subtitle: 'How effectively do different departments/teams coordinate without your direct involvement?',
    section: 'Organizational Structure & Communication',
    type: 'scaled',
    options: [
      { value: 1, label: "Poorly: I'm needed for most coordination" },
      { value: 2, label: 'Adequately: some coordination happens' },
      { value: 3, label: 'Well: teams coordinate on routine matters' },
      { value: 4, label: 'Very well: smooth cross-functional flow' },
      { value: 5, label: 'Exceptionally: autonomous coordination' },
    ],
  },
  {
    id: 'team_communication',
    title: 'Team Communication Structure',
    subtitle: 'How structured is your communication with your leadership team?',
    section: 'Organizational Structure & Communication',
    type: 'scaled',
    options: [
      { value: 1, label: 'Ad-hoc only: constant interruptions' },
      { value: 2, label: 'Mostly ad-hoc with some meetings' },
      { value: 3, label: 'Regular meetings with some structure' },
      { value: 4, label: 'Well-structured communication cadence' },
      { value: 5, label: 'Highly optimized communication systems' },
    ],
  },
  {
    id: 'sops',
    title: 'Standard Operating Procedures',
    subtitle:
      'Do you have documented processes and SOPs that reduce dependency on you for routine operations?',
    section: 'Organizational Structure & Communication',
    type: 'binary',
    options: [
      { value: 0, label: 'Minimal documented processes' },
      { value: 1, label: 'Comprehensive SOPs in place' },
    ],
  },
  {
    id: 'deep_work',
    title: 'Deep Work vs. Reactive Time',
    subtitle: 'How many hours of focused, uninterrupted strategic thinking time do you get per week?',
    section: 'Execution & Operational Excellence',
    type: 'scaled',
    options: [
      { value: 1, label: '0-2 hours (always in reactive mode)' },
      { value: 2, label: '3-5 hours (minimal deep work)' },
      { value: 3, label: '6-10 hours (some focused time)' },
      { value: 4, label: '11-15 hours (regular deep work blocks)' },
      { value: 5, label: '15+ hours (abundant strategic thinking time)' },
    ],
  },
  {
    id: 'project_tracking',
    title: 'Project & Initiative Tracking',
    subtitle:
      'How effectively are strategic initiatives and key projects tracked and reported across your organization?',
    section: 'Execution & Operational Excellence',
    type: 'scaled',
    options: [
      { value: 1, label: 'Poor: minimal visibility into progress' },
      { value: 2, label: 'Basic: some tracking, inconsistent' },
      { value: 3, label: 'Good: regular tracking with gaps' },
      { value: 4, label: 'Strong: comprehensive tracking systems' },
      { value: 5, label: 'Excellent: real-time visibility and reporting' },
    ],
  },
  {
    id: 'performance_systems',
    title: 'Performance Management Systems',
    subtitle:
      'Do you have systematic processes for goal setting, performance tracking, and accountability across your organization?',
    section: 'Execution & Operational Excellence',
    type: 'binary',
    options: [
      { value: 0, label: 'Informal/ad-hoc performance management' },
      { value: 1, label: 'Systematic performance management' },
    ],
  },
  {
    id: 'board_systems',
    title: 'Board & Investor Relations: Systems',
    subtitle:
      'Do you have structured systems and processes for board preparation and stakeholder communication?',
    section: 'External Relationships & Stakeholder Management',
    type: 'binary',
    options: [
      { value: 0, label: 'No systematic board/investor processes' },
      { value: 1, label: 'Structured board/investor management systems' },
    ],
  },
  {
    id: 'board_quality',
    title: 'Board & Investor Relations: Quality',
    subtitle: 'How would you rate the quality and effectiveness of your stakeholder communication?',
    section: 'External Relationships & Stakeholder Management',
    type: 'binary',
    options: [
      { value: 0, label: 'Reactive, last-minute communication' },
      { value: 1, label: 'Proactive, high-quality communication' },
    ],
  },
  {
    id: 'stakeholder_mgmt',
    title: 'External Stakeholder Management',
    subtitle:
      'How much of your time is consumed by managing external partnerships, key clients, and strategic relationships?',
    section: 'External Relationships & Stakeholder Management',
    type: 'scaled',
    options: [
      { value: 1, label: 'Significant time (20%+ of my week)' },
      { value: 2, label: 'Moderate time (10-20% of my week)' },
      { value: 3, label: 'Some time (5-10% of my week)' },
      { value: 4, label: 'Minimal time (2-5% of my week)' },
      { value: 5, label: 'Very little time (<2%: well delegated)' },
    ],
  },
  {
    id: 'crisis_mgmt',
    title: 'Crisis Management & Escalation',
    subtitle: 'How often do operational crises or urgent issues require your immediate personal intervention?',
    section: 'External Relationships & Stakeholder Management',
    type: 'scaled',
    options: [
      { value: 1, label: "Daily: I'm always firefighting" },
      { value: 2, label: 'Several times per week' },
      { value: 3, label: 'Weekly: some crises escalate to me' },
      { value: 4, label: 'Monthly: only major issues escalate' },
      { value: 5, label: 'Rarely: strong crisis management systems' },
    ],
  },
];

/** Interleaved comprehensive track order from HTML scorecard */
export const COMPREHENSIVE_QUESTION_IDS = [
  'time_split',
  'planning_consistency',
  'vision_docs',
  'delegation_rate',
  'decision_delays',
  'decision_matrix',
  'role_clarity',
  'coordination',
  'team_communication',
  'sops',
  'deep_work',
  'project_tracking',
  'performance_systems',
  'sustainability',
  'scalability',
  'succession_planning',
  'calendar_discipline',
  'board_systems',
  'board_quality',
  'stakeholder_mgmt',
  'crisis_mgmt',
] as const;

const allQuestionsMap = new Map<string, Question>(
  [...strategicQuestions, ...operationalQuestions].map((q) => [q.id, q])
);

export function getQuestionById(id: string): Question | undefined {
  return allQuestionsMap.get(id);
}

export function getComprehensiveQuestions(): Question[] {
  return COMPREHENSIVE_QUESTION_IDS.map((id) => allQuestionsMap.get(id)!);
}
