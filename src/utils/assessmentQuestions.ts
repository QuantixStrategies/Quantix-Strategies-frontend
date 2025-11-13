import { Question } from '@/types/assessment';

export const strategicQuestions: Question[] = [
  {
    id: 'time_split',
    question: 'What percentage of your time is spent on strategic vs operational work? (1 = Mostly operational, 5 = Mostly strategic)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Mostly Operational', max: 'Mostly Strategic' }
  },
  {
    id: 'planning_consistency',
    question: 'How frequently do you engage in formal strategic planning? (1 = Rarely/Never, 5 = Weekly/Daily)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Rarely/Never', max: 'Weekly/Daily' }
  },
  {
    id: 'delegation_rate',
    question: 'What percentage of non-core tasks have you successfully delegated? (1 = 0-20%, 5 = 80-100%)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: '0-20%', max: '80-100%' }
  },
  {
    id: 'decision_delays',
    question: 'How often do critical decisions wait for your personal input? (1 = Almost always, 5 = Rarely)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Almost Always', max: 'Rarely' }
  },
  {
    id: 'sustainability',
    question: 'How sustainable is your current work-life integration? (1 = Unsustainable, 5 = Highly sustainable)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Unsustainable', max: 'Highly Sustainable' }
  },
  {
    id: 'scalability',
    question: 'How prepared is your organization to scale without bottlenecks? (1 = Not prepared, 5 = Fully prepared)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Not Prepared', max: 'Fully Prepared' }
  },
  {
    id: 'calendar_discipline',
    question: 'What percentage of your scheduled time is actually spent as planned? (1 = <40%, 5 = >80%)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: '<40%', max: '>80%' }
  },
  {
    id: 'vision_docs',
    question: 'Do you have documented strategic frameworks and vision documents?',
    type: 'binary'
  },
  {
    id: 'decision_matrix',
    question: 'Do you have a RACI or decision authority framework in place?',
    type: 'binary'
  },
  {
    id: 'succession_planning',
    question: 'Could your business operate effectively without your daily involvement?',
    type: 'binary'
  }
];

export const operationalQuestions: Question[] = [
  {
    id: 'role_clarity',
    question: 'How clearly defined are roles and responsibilities across your organization? (1 = Very unclear, 5 = Crystal clear)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Very Unclear', max: 'Crystal Clear' }
  },
  {
    id: 'coordination',
    question: 'How effective is cross-functional coordination in your organization? (1 = Poor, 5 = Excellent)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Poor', max: 'Excellent' }
  },
  {
    id: 'team_communication',
    question: 'How structured and effective is your leadership team communication? (1 = Ad-hoc/Poor, 5 = Highly structured/Effective)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Ad-hoc/Poor', max: 'Highly Structured' }
  },
  {
    id: 'deep_work',
    question: 'How many hours per week do you have for uninterrupted strategic thinking? (1 = <5 hours, 5 = >20 hours)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: '<5 hours', max: '>20 hours' }
  },
  {
    id: 'project_tracking',
    question: 'How effective is your initiative and project tracking system? (1 = No system, 5 = Comprehensive system)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'No System', max: 'Comprehensive System' }
  },
  {
    id: 'stakeholder_mgmt',
    question: 'How much time do you spend managing stakeholder relationships? (1 = Excessive/reactive, 5 = Optimal/proactive)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Excessive/Reactive', max: 'Optimal/Proactive' }
  },
  {
    id: 'crisis_mgmt',
    question: 'How often do operational crises require your direct intervention? (1 = Constantly, 5 = Rarely)',
    type: 'scaled',
    scale: [1, 2, 3, 4, 5],
    labels: { min: 'Constantly', max: 'Rarely' }
  },
  {
    id: 'sops',
    question: 'Do you have documented Standard Operating Procedures (SOPs)?',
    type: 'binary'
  },
  {
    id: 'performance_systems',
    question: 'Do you have systematic performance management processes in place?',
    type: 'binary'
  },
  {
    id: 'board_systems',
    question: 'Do you have structured board and investor communication processes?',
    type: 'binary'
  },
  {
    id: 'board_quality',
    question: 'Is the quality of your stakeholder communication consistently high?',
    type: 'binary'
  }
];
