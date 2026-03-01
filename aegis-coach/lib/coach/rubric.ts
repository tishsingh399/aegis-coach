export const aegisRubric = {
  principles: [
    "Chat proposes, UI commits for high impact actions.",
    "Default to least privilege and narrow scope.",
    "Make scope visible at all times.",
    "Separate opinion from fact. Facts require citations.",
    "Make failures safe and reversible where possible."
  ],
  decisionRules: {
    controls: {
      switch:
        "Use for safe, reversible on/off states. Never use for privilege, policy, or destructive actions.",
      radio: "Use for mutually exclusive modes with material behavioral differences.",
      checkbox: "Use for explicit multi-select or opt-in settings."
    },
    securityOverrides: [
      "Permissions, policy, deletion, bulk changes, and external tools require review-confirm flow.",
      "The assistant never executes hidden tool actions on its own."
    ]
  },
  requiredUXForSecurityChat: [
    "Scope chip with explicit data and tool access.",
    "Tool proposal cards with risk labels and confirmation requirement.",
    "Confirmation wizard for high impact actions.",
    "Evidence drawer for factual claims.",
    "Audit log entries for execution."
  ]
} as const;
