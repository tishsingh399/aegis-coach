import { curatedSources } from "@/lib/evidence/sources";

export function buildStubEvidenceChunks() {
  return curatedSources.map((source) => ({
    ...source,
    snippet:
      "Stub chunk. Replace with fetched, chunked, and embedded source content during ingestion."
  }));
}
