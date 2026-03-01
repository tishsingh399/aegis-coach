import { z } from "zod";

export const EvidenceCitationSchema = z.object({
  sourceId: z.string(),
  url: z.string().url(),
  snippet: z.string().min(10)
});

export const EvidenceClaimSchema = z.object({
  claim: z.string().min(5),
  requiresCitation: z.boolean(),
  citations: z.array(EvidenceCitationSchema).default([])
});

type ComponentNode = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children: ComponentNode[];
};

export const ComponentNodeSchema: z.ZodType<ComponentNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.unknown()),
    children: z.array(ComponentNodeSchema)
  })
);

export const ScreenSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  layout: z.object({
    sections: z.array(z.string()).min(1)
  }),
  tree: ComponentNodeSchema,
  states: z
    .array(
      z.object({
        name: z.string(),
        description: z.string()
      })
    )
    .default([]),
  events: z
    .array(
      z.object({
        name: z.string(),
        trigger: z.string(),
        result: z.string(),
        riskLevel: z.enum(["low", "medium", "high"]).default("low")
      })
    )
    .default([])
});

export const CoachOutputSchema = z.object({
  primaryRecommendation: z.object({
    title: z.string(),
    summary: z.string(),
    why: z.string(),
    tradeoffs: z.array(z.string()).default([])
  }),
  secondaryRecommendations: z
    .array(
      z.object({
        title: z.string(),
        summary: z.string(),
        whenBetter: z.string(),
        tradeoffs: z.array(z.string()).default([])
      })
    )
    .max(2)
    .default([]),
  guardrails: z
    .array(
      z.object({
        title: z.string(),
        risk: z.string(),
        mitigation: z.string(),
        severity: z.enum(["low", "medium", "high"])
      })
    )
    .default([]),
  engineerArgument: z.object({
    pasteable: z.string(),
    bullets: z.array(z.string()).default([]),
    evidenceClaims: z.array(EvidenceClaimSchema).default([])
  }),
  spec: z.object({
    version: z.string(),
    domain: z.literal("security-ai-chat"),
    densityMode: z.enum(["comfortable", "compact"]).default("comfortable"),
    screens: z.array(ScreenSchema).min(1),
    componentInventory: z
      .array(
        z.object({
          type: z.string(),
          source: z.enum(["shadcn", "custom"]),
          notes: z.string().optional()
        })
      )
      .default([]),
    constraints: z.array(z.string()).default([])
  })
});

export type CoachOutput = z.infer<typeof CoachOutputSchema>;
