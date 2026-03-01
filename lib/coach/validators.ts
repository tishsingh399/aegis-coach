import { CoachOutputSchema, type CoachOutput } from "@/lib/coach/spec-schema";

export function validateCoachOutput(payload: unknown): CoachOutput {
  return CoachOutputSchema.parse(payload);
}
