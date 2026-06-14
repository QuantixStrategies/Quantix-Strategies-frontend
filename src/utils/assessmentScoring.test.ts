import { describe, expect, it } from 'vitest';
import {
  calculateComprehensiveScore,
  calculateOperationalComponent,
  calculateScore,
  calculateStrategicComponent,
} from './assessmentScoring';

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
    expect(result.chartInsight.length).toBeGreaterThan(0);
  });
});
