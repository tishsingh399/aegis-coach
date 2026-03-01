import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildStubEvidenceChunks } from "../lib/evidence/ingest";

const targetPath = resolve(process.cwd(), "content/evidence/sources.json");
const payload = JSON.stringify(buildStubEvidenceChunks(), null, 2);

writeFileSync(targetPath, payload);

console.log(`Wrote stub evidence chunks to ${targetPath}`);
