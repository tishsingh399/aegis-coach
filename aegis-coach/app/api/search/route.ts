import { NextResponse } from "next/server";
import { curatedSources } from "@/lib/evidence/sources";

type SearchRequest = {
  query?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SearchRequest;

  return NextResponse.json({
    query: body.query ?? "",
    results: curatedSources.slice(0, 3).map((source) => ({
      sourceId: source.id,
      url: source.url,
      snippet:
        "Curated source stub. Replace this route with retrieval over locally ingested evidence chunks."
    }))
  });
}
