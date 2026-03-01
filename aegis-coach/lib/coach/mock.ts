import type { CoachOutput } from "@/lib/coach/spec-schema";

export function buildMockCoachOutput(
  userPrompt: string,
  evidenceMode: boolean
): CoachOutput {
  return {
    primaryRecommendation: {
      title: "Chat proposes, UI commits",
      summary:
        "Keep the assistant in a recommendation role and force approval in structured UI before any state-changing action.",
      why:
        "This preserves the speed of chat while preventing direct execution, hidden escalation, and ambiguous scope.",
      tradeoffs: [
        "Adds an extra step before action execution.",
        "Requires explicit state modeling for confirm and rollback paths."
      ]
    },
    secondaryRecommendations: [
      {
        title: "Inline review form in chat",
        summary:
          "Embed a compact review form under proposal cards for medium-risk actions that still need explicit confirmation.",
        whenBetter:
          "Use this when context-switching to a separate panel would slow operators down.",
        tradeoffs: ["Can become crowded if too many controls are shown at once."]
      },
      {
        title: "Separate action center",
        summary:
          "Route all proposed actions into a dedicated queue outside the chat thread.",
        whenBetter:
          "Use this when your operators manage multiple pending actions across sessions.",
        tradeoffs: ["Stronger safety, but weaker conversational continuity."]
      }
    ],
    guardrails: [
      {
        title: "No silent privilege escalation",
        risk: "Requests that widen permissions can be disguised as routine fixes.",
        mitigation:
          "Show current scope, proposed scope, and require explicit confirmation with an audit note.",
        severity: "high"
      },
      {
        title: "Evidence-gated factual claims",
        risk: "Security guidance can sound authoritative without being verifiable.",
        mitigation:
          "When evidence mode is enabled, attach supporting sources or explicitly state that the claim could not be verified.",
        severity: "medium"
      },
      {
        title: "Default to narrow scope",
        risk: "Broad actions create avoidable blast radius.",
        mitigation:
          "Use narrow preselected scope and make expansion an explicit user action.",
        severity: "high"
      }
    ],
    engineerArgument: {
      pasteable:
        "High impact actions should not execute directly from chat. The assistant can propose actions, but users should confirm scope, review impact, and leave an audit note before execution. This keeps the assistant fast for ideation while preventing hidden tool execution and ambiguous authorization.",
      bullets: [
        "Use chat for recommendations, not final execution.",
        "Keep scope visible near the composer and inside the confirm flow.",
        "Separate opinionated UX guidance from verifiable evidence."
      ],
      evidenceClaims: evidenceMode
        ? [
            {
              claim: "High impact actions should be separated from direct model output.",
              requiresCitation: true,
              citations: [
                {
                  sourceId: "owasp-llm-top10",
                  url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
                  snippet:
                    "Prompt injection and insecure output handling are reduced when model output is reviewed before tool execution."
                }
              ]
            }
          ]
        : []
    },
    spec: {
      version: "0.1.0",
      domain: "security-ai-chat",
      densityMode: "comfortable",
      screens: [
        {
          id: "studio",
          name: "Aegis Studio",
          purpose:
            "Capture the design problem, return recommendations, and stage a buildable spec before code generation.",
          layout: {
            sections: ["hero", "workspace", "right-rail"]
          },
          tree: {
            id: "studio-root",
            type: "StudioPage",
            props: {
              promptPreview: userPrompt.slice(0, 120)
            },
            children: [
              {
                id: "hero-shell",
                type: "StudioHeroShell",
                props: {},
                children: [
                  {
                    id: "composer",
                    type: "CoachComposer",
                    props: {
                      evidenceMode
                    },
                    children: []
                  }
                ]
              },
              {
                id: "workspace",
                type: "StudioWorkspace",
                props: {},
                children: []
              }
            ]
          },
          states: [
            {
              name: "drafting",
              description: "User is refining the prompt and constraints."
            },
            {
              name: "approved",
              description: "Spec has been approved and build is available."
            }
          ],
          events: [
            {
              name: "generate-recommendation",
              trigger: "Click Generate",
              result: "Refresh recommendation, guardrails, and spec output.",
              riskLevel: "low"
            },
            {
              name: "approve-spec",
              trigger: "Click Approve Spec",
              result: "Unlock build output generation.",
              riskLevel: "medium"
            }
          ]
        }
      ],
      componentInventory: [
        { type: "Button", source: "shadcn" },
        { type: "Textarea", source: "shadcn" },
        { type: "Tabs", source: "shadcn" },
        { type: "CoachComposer", source: "custom" },
        { type: "ScopeChip", source: "custom" },
        { type: "ToolProposalCard", source: "custom" },
        { type: "WizardShell", source: "custom" }
      ],
      constraints: [
        "Do not auto-build from the composer.",
        "Keep evidence optional but explicit.",
        "Require confirmation for high impact actions."
      ]
    }
  };
}
