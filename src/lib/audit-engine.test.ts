import { describe, it, expect } from 'vitest';
import { runAuditEngine } from './audit-engine';
import { AuditFormData } from '../types';

describe('Audit Engine', () => {
  it('detects enterprise misuse for small teams (ChatGPT)', () => {
    const data: AuditFormData = {
      teamSize: 5,
      primaryUseCase: 'coding',
      tools: [
        { id: '1', toolName: 'ChatGPT', plan: 'Enterprise', monthlySpend: 300, seats: 5 }
      ]
    };
    
    const result = runAuditEngine(data);
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].recommendedPlan).toBe('Team');
    expect(result.totalMonthlySavings).toBe(150); // 300 - (30 * 5)
  });

  it('detects overlapping coding assistants (Cursor + Copilot)', () => {
    const data: AuditFormData = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [
        { id: '1', toolName: 'Cursor', plan: 'Pro', monthlySpend: 200, seats: 10 },
        { id: '2', toolName: 'GitHub Copilot', plan: 'Business', monthlySpend: 190, seats: 10 }
      ]
    };
    
    const result = runAuditEngine(data);
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].alternativeTool).toBe('GitHub Copilot');
    expect(result.totalMonthlySavings).toBe(200); // Recommends dropping Cursor or Copilot
  });

  it('calculates annual savings correctly', () => {
    const data: AuditFormData = {
      teamSize: 1,
      primaryUseCase: 'coding',
      tools: [
        { id: '1', toolName: 'Cursor', plan: 'Business', monthlySpend: 40, seats: 1 }
      ]
    };
    
    const result = runAuditEngine(data);
    expect(result.totalMonthlySavings).toBe(20);
    expect(result.totalAnnualSavings).toBe(240);
  });

  it('handles honest no-savings scenario', () => {
    const data: AuditFormData = {
      teamSize: 20,
      primaryUseCase: 'coding',
      tools: [
        { id: '1', toolName: 'GitHub Copilot', plan: 'Business', monthlySpend: 380, seats: 20 }
      ]
    };
    
    const result = runAuditEngine(data);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.recommendations[0].reasoning).toContain('already appears cost-efficient');
  });

  it('detects downgrade recommendation for Claude Team with small seats', () => {
    const data: AuditFormData = {
      teamSize: 2,
      primaryUseCase: 'writing',
      tools: [
        { id: '1', toolName: 'Claude', plan: 'Team', monthlySpend: 60, seats: 2 }
      ]
    };
    
    const result = runAuditEngine(data);
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].recommendedPlan).toBe('Pro');
    expect(result.totalMonthlySavings).toBe(20); // 60 - (20 * 2) = 20
  });
});
