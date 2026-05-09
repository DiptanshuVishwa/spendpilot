export type ToolName = 
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Claude'
  | 'ChatGPT'
  | 'Anthropic API'
  | 'OpenAI API'
  | 'Gemini'
  | 'Windsurf'
  | 'v0';

export type PlanType = 'Free' | 'Pro' | 'Team' | 'Business' | 'Enterprise' | 'Pay-as-you-go';

export type UseCase = 'coding' | 'writing' | 'research' | 'data' | 'mixed';

export interface AIStackItem {
  id: string;
  toolName: ToolName;
  plan: PlanType;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  tools: AIStackItem[];
  teamSize: number;
  primaryUseCase: UseCase;
}

export interface ToolRecommendation {
  toolName: ToolName;
  currentSpend: number;
  recommendedPlan: PlanType | 'Alternative Tool';
  alternativeTool?: ToolName;
  monthlySavings: number;
  reasoning: string;
}

export interface AuditResult {
  tools: AIStackItem[];
  recommendations: ToolRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary?: string;
}

export interface LeadData {
  email: string;
  company?: string;
  role?: string;
  teamSize: number;
}
