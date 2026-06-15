import { describe, expect, it } from 'vitest';
import {
  calculateComprehensiveScore,
  calculateOperationalComponent,
  calculateScore,
  calculateStrategicComponent,
} from './assessmentScoring';
import {
  htmlCalculateOperationalComponent,
  htmlCalculateStrategicComponent,
  htmlCalculateTrackScore,
  htmlInterpretationLabel,
  randomResponsesForTrack,
  toHtmlFormData,
} from './htmlScorecardReference';
import type { AssessmentTrack } from '@/types/assessment';

const perfectStrategic = {
  time_split: 5,
  planning_consistency: 5,
  vision_docs: 1,
  delegation_rate: 5,
  decision_delays: 5,
  decision_matrix: 1,
  sustainability: 5,
  scalability: 5,
  succession_planning: 1,
  calendar_discipline: 5,
};

const worstStrategic = {
  time_split: 1,
  planning_consistency: 1,
  vision_docs: 0,
  delegation_rate: 1,
  decision_delays: 1,
  decision_matrix: 0,
  sustainability: 1,
  scalability: 1,
  succession_planning: 0,
  calendar_discipline: 1,
};

const perfectOperational = {
  role_clarity: 5,
  coordination: 5,
  team_communication: 5,
  sops: 1,
  deep_work: 5,
  project_tracking: 5,
  performance_systems: 1,
  board_systems: 1,
  board_quality: 1,
  stakeholder_mgmt: 5,
  crisis_mgmt: 5,
};

describe('assessmentScoring', () => {
  it('scores perfect strategic track as 100', () => {
    const result = calculateScore(perfectStrategic, 'strategic');
    expect(result.score).toBe(100);
    expect(result.interpretation.label).toBe('Continuous Excellence');
    expect(result.strategicScore).toBe(100);
  });

  it('scores worst strategic track at minimum effectiveness', () => {
    const result = calculateScore(worstStrategic, 'strategic');
    expect(result.score).toBe(14);
    expect(result.interpretation.label).toBe('Critical Challenges');
  });

  it('scores perfect operational track as 100', () => {
    const result = calculateScore(perfectOperational, 'operational');
    expect(result.score).toBe(100);
    expect(result.operationalScore).toBe(100);
  });

  it('calculates comprehensive score from merged responses (not average)', () => {
    const merged = { ...perfectStrategic, ...perfectOperational };
    const comprehensive = calculateComprehensiveScore(perfectStrategic, perfectOperational);
    const direct = calculateScore(merged, 'comprehensive');

    expect(comprehensive.score).toBe(100);
    expect(comprehensive.score).toBe(direct.score);
    expect(comprehensive.strategicScore).toBe(100);
    expect(comprehensive.operationalScore).toBe(100);
  });

  it('uses HTML band boundaries', () => {
    expect(calculateScore(perfectStrategic, 'strategic').interpretation.range).toBe('90-100');

    const nearOptimal = {
      ...perfectStrategic,
      time_split: 4,
      planning_consistency: 4,
      delegation_rate: 4,
      decision_delays: 4,
      sustainability: 4,
      scalability: 4,
      calendar_discipline: 4,
    };
    expect(calculateScore(nearOptimal, 'strategic').score).toBe(86);
    expect(calculateScore(nearOptimal, 'strategic').interpretation.label).toBe('Near-Optimal Zone');

    const highPotential = {
      ...worstStrategic,
      time_split: 3,
      planning_consistency: 3,
      delegation_rate: 3,
      decision_delays: 3,
      sustainability: 3,
      scalability: 3,
      calendar_discipline: 3,
      vision_docs: 1,
      decision_matrix: 1,
      succession_planning: 1,
    };
    expect(calculateScore(highPotential, 'strategic').score).toBe(72);
    expect(calculateScore(highPotential, 'strategic').interpretation.label).toBe('High Potential Zone');
  });

  it('matches strategic and operational component helpers', () => {
    const merged = { ...perfectStrategic, ...perfectOperational };
    expect(calculateStrategicComponent(merged)).toBe(100);
    expect(calculateOperationalComponent(merged)).toBe(100);
  });

  it('includes cumulative roadmap and split value propositions', () => {
    const result = calculateScore(worstStrategic, 'strategic');
    expect(result.cumulativeRoadmap.length).toBe(5);
    expect(result.strategicValuePropositions.length).toBeGreaterThanOrEqual(3);
    expect(result.operationalValuePropositions.length).toBeGreaterThanOrEqual(3);
    expect(result.chartInsight.length).toBeGreaterThan(0);
  });

  it('defaults missing component scores to 50 per HTML scorecard', () => {
    expect(calculateScore(perfectStrategic, 'strategic').operationalScore).toBe(50);
    expect(calculateScore(perfectOperational, 'operational').strategicScore).toBe(50);
  });

  describe('HTML scorecard parity', () => {
    const tracks: AssessmentTrack[] = ['strategic', 'operational', 'comprehensive'];
    const fixtures = [
      { name: 'perfect strategic', responses: perfectStrategic, track: 'strategic' as const },
      { name: 'worst strategic', responses: worstStrategic, track: 'strategic' as const },
      { name: 'perfect operational', responses: perfectOperational, track: 'operational' as const },
      {
        name: 'comprehensive merged',
        responses: { ...perfectStrategic, ...perfectOperational },
        track: 'comprehensive' as const,
      },
    ];

    fixtures.forEach(({ name, responses, track }) => {
      it(`matches HTML track score for ${name}`, () => {
        const formData = toHtmlFormData(responses, track);
        const ts = calculateScore(responses, track);
        const html = htmlCalculateTrackScore(formData, track);

        expect(ts.score).toBe(html);
        expect(ts.interpretation.label).toBe(htmlInterpretationLabel(html));
      });
    });

    it('matches HTML component scores across 120 randomized cases per track', () => {
      tracks.forEach((track) => {
        for (let seed = 0; seed < 120; seed++) {
          const responses = randomResponsesForTrack(track, seed);
          const formData = toHtmlFormData(responses, track);
          const ts = calculateScore(responses, track);

          expect(ts.score).toBe(htmlCalculateTrackScore(formData, track));
          expect(ts.strategicScore).toBe(htmlCalculateStrategicComponent(formData));
          expect(ts.operationalScore).toBe(htmlCalculateOperationalComponent(formData));
        }
      });
    });

    it('matches HTML comprehensive merge scoring', () => {
      for (let seed = 0; seed < 60; seed++) {
        const strategic = randomResponsesForTrack('strategic', seed);
        const operational = randomResponsesForTrack('operational', seed + 500);
        const merged = { ...strategic, ...operational };
        const formData = toHtmlFormData(merged, 'comprehensive');

        const ts = calculateComprehensiveScore(strategic, operational);
        expect(ts.score).toBe(htmlCalculateTrackScore(formData, 'comprehensive'));
        expect(ts.strategicScore).toBe(htmlCalculateStrategicComponent(formData));
        expect(ts.operationalScore).toBe(htmlCalculateOperationalComponent(formData));
      }
    });

    it('matches HTML value proposition fallbacks on single-track assessments', () => {
      const strategicOnly = calculateScore(perfectStrategic, 'strategic');
      expect(strategicOnly.operationalValuePropositions).toEqual([
        'Enhance delegation systems and operational efficiency',
        'Build scalable communication and coordination systems',
        'Create comprehensive operational documentation',
      ]);

      const operationalOnly = calculateScore(perfectOperational, 'operational');
      expect(operationalOnly.strategicValuePropositions).toEqual([
        'Optimize strategic time allocation and priority management',
        'Develop advanced decision-making frameworks',
        'Implement strategic planning and review cycles',
      ]);
    });
  });
});
