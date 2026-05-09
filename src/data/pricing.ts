import { ToolName, PlanType } from '../types';

export const PRICING_DATA: Record<ToolName, Record<string, { price: number; type: 'per_user' | 'flat' }>> = {
  'Cursor': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 20, type: 'per_user' },
    'Business': { price: 40, type: 'per_user' },
  },
  'GitHub Copilot': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 10, type: 'per_user' },
    'Business': { price: 19, type: 'per_user' },
    'Enterprise': { price: 39, type: 'per_user' },
  },
  'Claude': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 20, type: 'per_user' },
    'Team': { price: 30, type: 'per_user' },
  },
  'ChatGPT': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 20, type: 'per_user' },
    'Team': { price: 30, type: 'per_user' },
    'Enterprise': { price: 60, type: 'per_user' }, // Estimated
  },
  'Anthropic API': {
    'Pay-as-you-go': { price: 0, type: 'flat' } // Variable cost
  },
  'OpenAI API': {
    'Pay-as-you-go': { price: 0, type: 'flat' } // Variable cost
  },
  'Gemini': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 20, type: 'per_user' },
  },
  'Windsurf': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 15, type: 'per_user' }, // Example pricing
  },
  'v0': {
    'Free': { price: 0, type: 'per_user' },
    'Pro': { price: 20, type: 'per_user' },
  }
};
