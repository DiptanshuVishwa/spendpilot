import { z } from 'zod';

export const toolNameSchema = z.enum([
  'Cursor',
  'GitHub Copilot',
  'Claude',
  'ChatGPT',
  'Anthropic API',
  'OpenAI API',
  'Gemini',
  'Windsurf',
  'v0'
]);

export const planTypeSchema = z.enum([
  'Free',
  'Pro',
  'Team',
  'Business',
  'Enterprise',
  'Pay-as-you-go'
]);

export const useCaseSchema = z.enum([
  'coding',
  'writing',
  'research',
  'data',
  'mixed'
]);

export const aiStackItemSchema = z.object({
  id: z.string(),
  toolName: toolNameSchema,
  plan: planTypeSchema,
  monthlySpend: z.number().min(0, "Spend must be non-negative"),
  seats: z.number().min(1, "At least 1 seat required")
});

export const auditFormSchema = z.object({
  tools: z.array(aiStackItemSchema).min(1, "Please add at least one tool"),
  teamSize: z.number().min(1, "Team size must be at least 1"),
  primaryUseCase: useCaseSchema
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;
