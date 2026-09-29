import { z } from 'zod';

export const domainKeys = ['customer', 'competition', 'economics', 'operations'] as const;
export const domainNames = { customer: 'Customer Demand', competition: 'Competition & Differentiation', economics: 'Pricing & Economics', operations: 'Operations & Delivery' };
const text = z.string().trim().min(1).max(1800);
const level = z.enum(['low', 'medium', 'high']);
const experimentSchema = z.object({
  participants: text, steps: z.array(text).min(2).max(5), metric: text,
  decisionRule: text, duration: text, resources: text, ifSupported: text, ifContradicted: text,
}).strict();
const assumptionSchema = z.object({
  statement: text, whyItMatters: text, impact: level, uncertainty: level,
  priorityReason: text, evidenceNeeded: text, experiment: experimentSchema,
}).strict();
const domainSchema = z.object({
  opportunity: text, concerns: z.array(text).min(1).max(3), unknowns: z.array(text).min(1).max(3),
  assumptions: z.array(assumptionSchema).min(2).max(3),
}).strict();
export const analysisShape = z.object({
  summary: text,
  domains: z.object({ customer: domainSchema, competition: domainSchema, economics: domainSchema, operations: domainSchema }).strict(),
  priorities: z.array(z.object({ domain: z.enum(domainKeys), assumptionIndex: z.number().int().min(0).max(2), rationale: text }).strict()).length(3),
}).strict();
export const analysisSchema = analysisShape.superRefine((result, ctx) => {
  const seen = new Set<string>();
  result.priorities.forEach((p, i) => {
    const id = `${p.domain}:${p.assumptionIndex}`;
    if (seen.has(id) || !result.domains[p.domain].assumptions[p.assumptionIndex]) {
      ctx.addIssue({ code: 'custom', path: ['priorities', i], message: 'Priorities must reference three distinct existing assumptions.' });
    }
    seen.add(id);
  });
});
export type Analysis = z.infer<typeof analysisSchema>;
export type Assumption = z.infer<typeof assumptionSchema>;
