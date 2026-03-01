import { NextResponse } from "next/server";
import { curatedSources } from "@/lib/evidence/sources";

export async function POST() {
  return NextResponse.json({
    status: "stubbed",
    message:
      "Source ingestion is scaffolded but not fetching remote content in this local starter.",
    sources: curatedSources
  });
}
