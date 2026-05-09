import { AuditFormData, AuditResult, ToolRecommendation } from '../types';

export function runAuditEngine(data: AuditFormData): AuditResult {
  const recommendations: ToolRecommendation[] = [];
  let totalMonthlySavings = 0;

  // Track if we have overlapping tools
  const hasClaude = data.tools.some(t => t.toolName === 'Claude');
  const hasCopilot = data.tools.some(t => t.toolName === 'GitHub Copilot');

  data.tools.forEach(tool => {
    let rec: ToolRecommendation | null = null;

    // ChatGPT Logic
    if (tool.toolName === 'ChatGPT') {
      if (tool.plan === 'Team' && tool.seats < 3) {
        rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Pro',
          monthlySavings: tool.monthlySpend - (20 * tool.seats),
          reasoning: 'Your team currently pays for Team pricing despite having fewer than three active seats. Downgrading to Plus (Pro) maintains nearly identical functionality while reducing monthly cost.',
        };
      } else if (tool.plan === 'Enterprise' && tool.seats < 50) {
        rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Team',
          monthlySavings: tool.monthlySpend - (30 * tool.seats),
          reasoning: 'Enterprise plans typically require 150+ seats for ROI. For a team of your size, the Team plan provides necessary workspace controls at a fraction of the cost.',
        };
      } else if (tool.plan === 'Pro' && hasClaude && data.primaryUseCase === 'coding') {
         rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Alternative Tool',
          alternativeTool: 'Claude',
          monthlySavings: tool.monthlySpend,
          reasoning: 'Since your primary use case is coding and you already subscribe to Claude (which excels at coding tasks), ChatGPT Pro is redundant. Consolidating to Claude saves you this entire subscription cost.',
        };
      }
    }

    // Cursor Logic
    if (tool.toolName === 'Cursor') {
      if (tool.plan === 'Business' && tool.seats === 1) {
        rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Pro',
          monthlySavings: tool.monthlySpend - 20,
          reasoning: 'Cursor Business provides centralized billing and privacy mode. For a solo developer, Cursor Pro offers the exact same AI capabilities at half the cost.',
        };
      } else if (tool.plan === 'Pro' && hasCopilot) {
         rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Alternative Tool',
          alternativeTool: 'GitHub Copilot',
          monthlySavings: tool.monthlySpend,
          reasoning: 'You are paying for both Cursor and GitHub Copilot. For most teams, standardizing on one AI coding assistant eliminates redundant spend. We recommend picking the one your team prefers and dropping the other.',
        };
      }
    }

    // Claude Logic
    if (tool.toolName === 'Claude') {
      if (tool.plan === 'Team' && tool.seats < 5) {
         rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Pro',
          monthlySavings: tool.monthlySpend - (20 * tool.seats),
          reasoning: 'Claude Team is optimized for larger groups needing high usage limits. With a small team, individual Pro accounts are more cost-efficient and provide sufficient usage caps.',
        };
      }
    }

    // GitHub Copilot Logic
    if (tool.toolName === 'GitHub Copilot') {
      if (tool.plan === 'Enterprise' && tool.seats < 20) {
        rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Business',
          monthlySavings: tool.monthlySpend - (19 * tool.seats),
          reasoning: 'Copilot Enterprise adds custom model fine-tuning and PR summaries. Small teams rarely see ROI from these features compared to the standard Business plan.',
        };
      }
    }
    
    // API Costs Logic
    if ((tool.toolName === 'OpenAI API' || tool.toolName === 'Anthropic API') && tool.monthlySpend > 500) {
        rec = {
          toolName: tool.toolName,
          currentSpend: tool.monthlySpend,
          recommendedPlan: 'Pay-as-you-go',
          monthlySavings: tool.monthlySpend * 0.2, // Arbitrary 20% savings estimate via Credex
          reasoning: `Your API spend is high enough that you should be utilizing startup credits. Booking a consultation can unlock significant volume discounts or cloud credits.`,
        };
    }

    if (rec && rec.monthlySavings > 0) {
      recommendations.push(rec);
      totalMonthlySavings += rec.monthlySavings;
    }
  });

  // If no recommendations, provide an honest assessment
  if (recommendations.length === 0) {
    recommendations.push({
      toolName: data.tools[0]?.toolName || 'ChatGPT',
      currentSpend: data.tools.reduce((sum, t) => sum + t.monthlySpend, 0),
      recommendedPlan: data.tools[0]?.plan || 'Free',
      monthlySavings: 0,
      reasoning: 'Your stack already appears cost-efficient. We did not detect any overlapping subscriptions or oversized plans for your team size.',
    });
  }

  return {
    tools: data.tools,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
  };
}
