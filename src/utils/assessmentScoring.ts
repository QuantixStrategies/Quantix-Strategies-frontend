import {
  AssessmentResponses,
  AssessmentResult,
  AssessmentTrack,
  ScoreInterpretation,
} from '@/types/assessment';

const STRATEGIC_SCALED = [
  'time_split',
  'planning_consistency',
  'delegation_rate',
  'decision_delays',
  'sustainability',
  'scalability',
  'calendar_discipline',
] as const;

const STRATEGIC_BINARY = ['vision_docs', 'decision_matrix', 'succession_planning'] as const;

const OPERATIONAL_SCALED = [
  'role_clarity',
  'coordination',
  'team_communication',
  'deep_work',
  'project_tracking',
  'stakeholder_mgmt',
  'crisis_mgmt',
] as const;

const OPERATIONAL_BINARY = [
  'sops',
  'performance_systems',
  'board_systems',
  'board_quality',
] as const;

const COMPREHENSIVE_SCALED = [
  'time_split',
  'planning_consistency',
  'delegation_rate',
  'decision_delays',
  'role_clarity',
  'coordination',
  'team_communication',
  'deep_work',
  'project_tracking',
  'sustainability',
  'scalability',
  'calendar_discipline',
  'stakeholder_mgmt',
  'crisis_mgmt',
] as const;

const COMPREHENSIVE_BINARY = [
  'vision_docs',
  'decision_matrix',
  'sops',
  'performance_systems',
  'succession_planning',
  'board_systems',
  'board_quality',
] as const;

const STRATEGIC_ALL = [
  'time_split',
  'planning_consistency',
  'vision_docs',
  'delegation_rate',
  'decision_delays',
  'decision_matrix',
  'sustainability',
  'scalability',
  'succession_planning',
  'calendar_discipline',
] as const;

const OPERATIONAL_ALL = [
  'role_clarity',
  'coordination',
  'team_communication',
  'sops',
  'deep_work',
  'project_tracking',
  'performance_systems',
  'board_systems',
  'board_quality',
  'stakeholder_mgmt',
  'crisis_mgmt',
] as const;

const STRATEGIC_BINARY_SET = new Set<string>(STRATEGIC_BINARY);
const OPERATIONAL_BINARY_SET = new Set<string>(OPERATIONAL_BINARY);

function scoreFromLists(
  responses: AssessmentResponses,
  scaledIds: readonly string[],
  binaryIds: readonly string[]
): number {
  let scaledSum = 0;
  scaledIds.forEach((field) => {
    scaledSum += responses[field] ?? 0;
  });

  let binarySum = 0;
  binaryIds.forEach((field) => {
    if (responses[field] === 1) {
      binarySum += 5;
    }
  });

  const maxScaledScore = scaledIds.length * 5;
  const maxBinaryScore = binaryIds.length * 5;
  const totalScore = scaledSum + binarySum;
  const maxTotalScore = maxScaledScore + maxBinaryScore;

  if (maxTotalScore === 0) return 0;

  const finalScore = Math.round((totalScore / maxTotalScore) * 100);
  return Math.min(100, Math.max(0, finalScore));
}

function scoreComponent(
  responses: AssessmentResponses,
  questionIds: readonly string[],
  binarySet: Set<string>
): number {
  let scaledSum = 0;
  let scaledCount = 0;
  let binarySum = 0;
  let binaryCount = 0;

  questionIds.forEach((field) => {
    const value = responses[field];
    if (value === undefined) return;

    if (binarySet.has(field)) {
      if (value === 1) binarySum += 5;
      binaryCount++;
    } else {
      scaledSum += value;
      scaledCount++;
    }
  });

  if (scaledCount === 0 && binaryCount === 0) return 50;

  const totalSum = scaledSum + binarySum;
  const totalPossible = scaledCount * 5 + binaryCount * 5;
  return Math.round((totalSum / totalPossible) * 100);
}

export function calculateStrategicComponent(responses: AssessmentResponses): number {
  return scoreComponent(responses, STRATEGIC_ALL, STRATEGIC_BINARY_SET);
}

export function calculateOperationalComponent(responses: AssessmentResponses): number {
  return scoreComponent(responses, OPERATIONAL_ALL, OPERATIONAL_BINARY_SET);
}

function getScoreInterpretation(score: number): ScoreInterpretation {
  if (score >= 90) {
    return {
      range: '90-100',
      label: 'Continuous Excellence',
      description:
        'Outstanding leadership effectiveness across all dimensions. You represent the top 1% of assessed founders.',
      action: 'VISIONARY OPPORTUNITIES',
      recommendations:
        'Congratulations! Consider visionary repositioning, new market expansion, and establishing yourself as a thought leader in your industry.',
      bandColor: '#28a745',
    };
  }
  if (score >= 75) {
    return {
      range: '75-89',
      label: 'Near-Optimal Zone',
      description:
        'Excellent foundation with minor refinement opportunities. You are operating at high effectiveness levels.',
      action: 'OPTIMIZATION REFINEMENT',
      recommendations:
        'Refine existing systems with performance analytics, stakeholder dashboards, and scale-readiness optimization.',
      bandColor: '#17a2b8',
    };
  }
  if (score >= 60) {
    return {
      range: '60-74',
      label: 'High Potential Zone',
      description:
        'Good operational foundation with clear pathways to excellence. Moderate optimization will yield significant returns.',
      action: 'STRATEGIC ENHANCEMENT',
      recommendations:
        'Implement strategy sprints, OKR frameworks, and leadership delegation playbooks for systematic improvement.',
      bandColor: '#ffc107',
    };
  }
  if (score >= 40) {
    return {
      range: '40-59',
      label: 'Moderate Challenges',
      description:
        'Solid base foundation, but founder bottlenecks are limiting organizational scaling potential.',
      action: 'SYSTEMATIC INTERVENTION',
      recommendations:
        'Deploy systematic frameworks, tracking systems, and calendar discipline protocols to unlock growth potential.',
      bandColor: '#fd7e14',
    };
  }
  if (score >= 20) {
    return {
      range: '20-39',
      label: 'Significant Challenges',
      description:
        'Significant operational strain requiring immediate intervention. Daily firefighting is limiting strategic effectiveness.',
      action: 'URGENT INTERVENTION REQUIRED',
      recommendations:
        'Implement emergency protocols, interim leadership support, and aggressive founder time recovery strategies.',
      bandColor: '#dc3545',
    };
  }
  return {
    range: '0-19',
    label: 'Critical Challenges',
    description:
      'Critical situation requiring immediate external support. Current founder involvement patterns are unsustainable.',
    action: 'CRITICAL EMERGENCY SUPPORT',
    recommendations:
      'Emergency delegation protocols, operational lockdown procedures, and immediate external leadership support required.',
    bandColor: '#6f42c1',
  };
}

function generateCumulativeRoadmap(score: number): string[] {
  if (score >= 90) {
    return [
      'Visionary strategic repositioning and thought leadership development',
      'Advanced market expansion and innovation frameworks',
      'Executive peer network facilitation and industry positioning',
      'Strategic advisory board establishment and governance optimization',
      'Legacy planning and long-term value creation strategies',
    ];
  }
  if (score >= 75) {
    return [
      'Performance analytics and optimization dashboard implementation',
      'Advanced stakeholder management and communication systems',
      'Scale-readiness assessment and preparation protocols',
      'Executive development and leadership enhancement programs',
      'Strategic initiative portfolio management and prioritization',
    ];
  }
  if (score >= 60) {
    return [
      'Strategy sprint facilitation and OKR framework implementation',
      'Leadership delegation playbooks and accountability systems',
      'Communication optimization and meeting effectiveness enhancement',
      'Time management audit and calendar discipline protocols',
      'Strategic planning cycle establishment and milestone tracking',
    ];
  }
  if (score >= 40) {
    return [
      'Systematic framework deployment across all operational areas',
      'Real-time tracking and reporting system implementation',
      'Calendar discipline protocols and priority management systems',
      'Delegation frameworks and decision authority matrix development',
      'Crisis management protocols and escalation procedures',
    ];
  }
  if (score >= 20) {
    return [
      'Emergency firefighting protocol implementation',
      'Interim leadership support and operational stabilization',
      'Aggressive founder time recovery strategies (15-25 hours/week)',
      'Critical decision delegation and authority redistribution',
      'Daily operational oversight and strategic guidance',
    ];
  }
  return [
    'Emergency delegation protocols and immediate external leadership',
    'Operational lockdown procedures to prevent further deterioration',
    'Complete founder schedule restructuring and protection',
    'Critical business function stabilization and oversight',
    'Immediate stress reduction and sustainable workload design',
  ];
}

function generateChartInsight(strategicScore: number, operationalScore: number): string {
  if (strategicScore >= 70 && operationalScore >= 70) {
    return "Excellent positioning! You're among the top 20% of assessed founders with strong strategic and operational capabilities. Focus on maintaining excellence and scaling best practices.";
  }
  if (strategicScore >= 50 && operationalScore >= 50) {
    return "Solid foundation! You're in the middle tier with balanced capabilities. Quantix can help you move into the high-performance quadrant through targeted optimization.";
  }
  if (strategicScore >= 50 && operationalScore < 50) {
    return 'Strategic strength with operational gaps. Your strategic thinking is solid, but operational systems need enhancement. Focus on delegation frameworks and process optimization.';
  }
  if (strategicScore < 50 && operationalScore >= 50) {
    return 'Operational strength with strategic gaps. Your systems are working, but strategic focus needs improvement. Prioritize time allocation and strategic planning cycles.';
  }
  return "High transformation potential! You're positioned for significant improvement across both dimensions. Quantix's comprehensive approach can drive substantial optimization gains.";
}

function generateValuePropositions(
  responses: AssessmentResponses,
  track: AssessmentTrack
): { strategic: string[]; operational: string[] } {
  const strategic: string[] = [];
  const operational: string[] = [];

  if (track === 'strategic' || track === 'comprehensive') {
    if ((responses.time_split ?? 0) <= 2) {
      strategic.push('Free up 15-25 hours/week of founder bandwidth for strategic initiatives');
      strategic.push('Co-create GTM strategy, fundraising roadmap, or expansion blueprints');
    }
    if ((responses.planning_consistency ?? 0) <= 2) {
      strategic.push('Architect comprehensive 12-18 month strategic roadmap');
      strategic.push("Define founder's 'North Star Mandate' - what only you should do");
    }
    if (responses.vision_docs === 0) {
      strategic.push('Develop strategic frameworks and vision documentation');
      strategic.push('Create founder succession readiness model');
    }
    if ((responses.scalability ?? 0) <= 2) {
      strategic.push('Design scaling infrastructure and interim CXO functions');
      strategic.push('Lead zero-based strategy reset - identify what to pause/kill');
    }
    if ((responses.sustainability ?? 0) <= 2) {
      strategic.push('Build sustainable leadership model and recovery roadmap');
      strategic.push('Temporarily manage strategic operations to enable founder recovery');
    }
  }

  if (track === 'operational' || track === 'comprehensive') {
    if ((responses.role_clarity ?? 0) <= 2) {
      operational.push('Design clear organizational structure and role definitions');
      operational.push('Implement accountability frameworks and reporting systems');
    }
    if ((responses.coordination ?? 0) <= 2) {
      operational.push('Build cross-functional coordination systems');
      operational.push('Establish autonomous team collaboration protocols');
    }
    if (responses.sops === 0) {
      operational.push('Create comprehensive SOPs and process documentation');
      operational.push('Build knowledge management and training systems');
    }
    if ((responses.project_tracking ?? 0) <= 2) {
      operational.push('Implement project management and tracking systems');
      operational.push('Create performance dashboards and reporting mechanisms');
    }
    if (responses.board_systems === 0 || responses.board_quality === 0) {
      operational.push('Establish structured stakeholder management systems');
      operational.push('Develop proactive communication and reporting protocols');
    }
    if ((responses.crisis_mgmt ?? 0) <= 2) {
      operational.push('Create crisis management and escalation frameworks');
      operational.push('Implement Founder Shield PMO for operational stability');
    }
  }

  // HTML scorecard: minimum fallbacks apply to both columns regardless of track
  if (strategic.length < 3) {
    strategic.push('Optimize strategic time allocation and priority management');
    strategic.push('Develop advanced decision-making frameworks');
    strategic.push('Implement strategic planning and review cycles');
  }
  if (operational.length < 3) {
    operational.push('Enhance delegation systems and operational efficiency');
    operational.push('Build scalable communication and coordination systems');
    operational.push('Create comprehensive operational documentation');
  }

  return {
    strategic: strategic.slice(0, 5),
    operational: operational.slice(0, 5),
  };
}

function getTrackScoreLabel(track: AssessmentTrack): string {
  switch (track) {
    case 'strategic':
      return 'Strategic Leadership Score';
    case 'operational':
      return 'Operational Excellence Score';
    case 'comprehensive':
      return 'Leadership Effectiveness Index';
  }
}

function buildResult(
  track: AssessmentTrack,
  score: number,
  responses: AssessmentResponses,
  strategicScore: number,
  operationalScore: number
): AssessmentResult {
  const { strategic, operational } = generateValuePropositions(responses, track);
  const interpretation = getScoreInterpretation(score);

  return {
    track,
    score,
    scoreLabel: getTrackScoreLabel(track),
    interpretation,
    strategicScore,
    operationalScore,
    strategicValuePropositions: strategic,
    operationalValuePropositions: operational,
    valuePropositions: [...strategic.slice(0, 3), ...operational.slice(0, 3)],
    cumulativeRoadmap: generateCumulativeRoadmap(score),
    chartInsight: generateChartInsight(strategicScore, operationalScore),
  };
}

export function calculateScore(
  responses: AssessmentResponses,
  track: AssessmentTrack
): AssessmentResult {
  if (track === 'strategic') {
    const score = scoreFromLists(responses, STRATEGIC_SCALED, STRATEGIC_BINARY);
    const strategicScore = calculateStrategicComponent(responses);
    return buildResult(track, score, responses, strategicScore, 50);
  }

  if (track === 'operational') {
    const score = scoreFromLists(responses, OPERATIONAL_SCALED, OPERATIONAL_BINARY);
    const operationalScore = calculateOperationalComponent(responses);
    return buildResult(track, score, responses, 50, operationalScore);
  }

  const score = scoreFromLists(responses, COMPREHENSIVE_SCALED, COMPREHENSIVE_BINARY);
  const strategicScore = calculateStrategicComponent(responses);
  const operationalScore = calculateOperationalComponent(responses);
  return buildResult(track, score, responses, strategicScore, operationalScore);
}

export function calculateComprehensiveScore(
  strategicResponses: AssessmentResponses,
  operationalResponses: AssessmentResponses
): AssessmentResult {
  const merged = { ...strategicResponses, ...operationalResponses };
  return calculateScore(merged, 'comprehensive');
}
