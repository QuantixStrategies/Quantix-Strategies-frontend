import { AssessmentResponses, AssessmentResult, AssessmentTrack, ScoreInterpretation } from '@/types/assessment';
import { strategicQuestions, operationalQuestions } from './assessmentQuestions';

export function calculateScore(responses: AssessmentResponses, track: AssessmentTrack): AssessmentResult {
  const questions = track === 'strategic' ? strategicQuestions : operationalQuestions;
  
  const scaledQuestions = questions.filter(q => q.type === 'scaled');
  const binaryQuestions = questions.filter(q => q.type === 'binary');
  
  // Calculate base score from scaled questions
  const scaledSum = scaledQuestions.reduce((sum, q) => sum + (responses[q.id] || 0), 0);
  const baseScore = (scaledSum / (scaledQuestions.length * 5)) * 100;
  
  // Calculate binary multiplier
  let binaryMultiplier = 1.0;
  binaryQuestions.forEach(q => {
    if (responses[q.id] === 0) {
      binaryMultiplier *= 0.80;
    }
  });
  
  // Calculate final score (inverted because higher score = more challenges)
  const challengeScore = 100 - baseScore;
  const adjustedScore = challengeScore / binaryMultiplier;
  const finalScore = Math.round(Math.min(95, Math.max(5, adjustedScore)));
  
  const interpretation = getScoreInterpretation(finalScore, track);
  const valuePropositions = generateValuePropositions(responses, finalScore, track);
  
  return {
    track,
    score: finalScore,
    interpretation,
    valuePropositions
  };
}

export function calculateComprehensiveScore(
  strategicResponses: AssessmentResponses,
  operationalResponses: AssessmentResponses
): AssessmentResult {
  const strategicResult = calculateScore(strategicResponses, 'strategic');
  const operationalResult = calculateScore(operationalResponses, 'operational');
  
  // Average of both tracks
  const comprehensiveScore = Math.round((strategicResult.score + operationalResult.score) / 2);
  
  const interpretation = getScoreInterpretation(comprehensiveScore, 'comprehensive');
  const valuePropositions = [
    ...generateValuePropositions(strategicResponses, strategicResult.score, 'strategic').slice(0, 3),
    ...generateValuePropositions(operationalResponses, operationalResult.score, 'operational').slice(0, 3)
  ];
  
  return {
    track: 'comprehensive',
    score: comprehensiveScore,
    interpretation,
    valuePropositions
  };
}

function getScoreInterpretation(score: number, track: AssessmentTrack): ScoreInterpretation {
  if (score >= 75) {
    return {
      range: '75-95',
      label: track === 'strategic' ? 'High Strategic Challenge Zone' : 
             track === 'operational' ? 'Major Operational Gaps' : 
             'Critical Optimization Zone',
      description: track === 'strategic' ? 'Major bandwidth constraints' :
                   track === 'operational' ? 'Critical inefficiencies' :
                   'Multiple challenges requiring immediate attention',
      action: 'URGENT - Immediate intervention required',
      roiRange: '300-700%'
    };
  } else if (score >= 55) {
    return {
      range: '55-74',
      label: track === 'strategic' ? 'Moderate Strategic Challenge' :
             track === 'operational' ? 'Operational Enhancement Needed' :
             'Moderate Optimization Zone',
      description: track === 'strategic' ? 'Good foundation with clear optimization opportunities' :
                   track === 'operational' ? 'Solid base with specific improvements needed' :
                   'Generally effective with multiple enhancement opportunities',
      action: 'HIGH PRIORITY - 25-35% improvement potential',
      roiRange: '200-500%'
    };
  } else if (score >= 35) {
    return {
      range: '35-54',
      label: track === 'strategic' ? 'Strategic Effectiveness Zone' :
             track === 'operational' ? 'Operational Competency Zone' :
             'Good Leadership Effectiveness',
      description: track === 'strategic' ? 'Strong focus with minor optimization opportunities' :
                   track === 'operational' ? 'Well-functioning systems' :
                   'Solid foundation across dimensions',
      action: 'OPTIMIZATION OPPORTUNITY - Fine-tuning recommended',
      roiRange: '150-350%'
    };
  } else {
    return {
      range: '5-34',
      label: track === 'strategic' ? 'Strategic Excellence Zone' :
             track === 'operational' ? 'Operational Excellence Zone' :
             'Leadership Excellence Zone',
      description: track === 'strategic' ? 'Exceptional focus and management' :
                   track === 'operational' ? 'Outstanding systems' :
                   'Outstanding across all dimensions',
      action: 'STRATEGIC ENHANCEMENT - Maintain excellence, consider advanced initiatives',
      roiRange: '150-250%'
    };
  }
}

function generateValuePropositions(
  responses: AssessmentResponses,
  score: number,
  track: AssessmentTrack
): string[] {
  const propositions: string[] = [];
  
  if (track === 'strategic') {
    if ((responses.time_split || 0) <= 2) {
      propositions.push('Free up 15-25 hours/week of founder bandwidth for strategic initiatives');
      propositions.push('Co-create GTM strategy, fundraising roadmap, or expansion blueprints');
    }
    if ((responses.planning_consistency || 0) <= 2) {
      propositions.push('Architect comprehensive 12-18 month strategic roadmap');
      propositions.push("Define founder's 'North Star Mandate' - what only you should do");
    }
    if (responses.vision_docs === 0) {
      propositions.push('Develop strategic frameworks and vision documentation');
      propositions.push('Create founder succession readiness model');
    }
    if ((responses.scalability || 0) <= 2) {
      propositions.push('Design scaling infrastructure and interim CXO functions');
      propositions.push('Lead zero-based strategy reset - identify what to pause/kill');
    }
    if ((responses.sustainability || 0) <= 2) {
      propositions.push('Build sustainable leadership model and recovery roadmap');
      propositions.push('Temporarily manage strategic operations to enable founder recovery');
    }
    
    // Ensure minimum of 3 propositions
    if (propositions.length < 3) {
      propositions.push('Optimize strategic time allocation and priority management');
      propositions.push('Develop advanced decision-making frameworks');
    }
  } else if (track === 'operational') {
    if ((responses.role_clarity || 0) <= 2) {
      propositions.push('Design clear organizational structure and role definitions');
      propositions.push('Implement accountability frameworks and reporting systems');
    }
    if ((responses.coordination || 0) <= 2) {
      propositions.push('Build cross-functional coordination systems');
      propositions.push('Establish autonomous team collaboration protocols');
    }
    if (responses.sops === 0) {
      propositions.push('Create comprehensive SOPs and process documentation');
      propositions.push('Build knowledge management and training systems');
    }
    if ((responses.project_tracking || 0) <= 2) {
      propositions.push('Implement project management and tracking systems');
      propositions.push('Create performance dashboards and reporting mechanisms');
    }
    if (responses.board_systems === 0 || responses.board_quality === 0) {
      propositions.push('Establish structured stakeholder management systems');
      propositions.push('Develop proactive communication and reporting protocols');
    }
    if ((responses.crisis_mgmt || 0) <= 2) {
      propositions.push('Create crisis management and escalation frameworks');
      propositions.push('Implement Founder Shield PMO for operational stability');
    }
    
    // Ensure minimum of 3 propositions
    if (propositions.length < 3) {
      propositions.push('Enhance delegation systems and operational efficiency');
      propositions.push('Build scalable communication and coordination systems');
    }
  }
  
  return propositions;
}
