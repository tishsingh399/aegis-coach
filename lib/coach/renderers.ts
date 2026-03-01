import type { CoachOutput } from "@/lib/coach/spec-schema";

export function renderSpecSummary(output: CoachOutput) {
  return {
    screenCount: output.spec.screens.length,
    components: output.spec.componentInventory.map((item) => item.type)
  };
}
