import { buildStubEvidenceChunks } from "@/lib/evidence/ingest";

export function searchEvidence(query: string) {
  return buildStubEvidenceChunks().map((chunk) => ({
    ...chunk,
    score: query ? 1 : 0
  }));
}
