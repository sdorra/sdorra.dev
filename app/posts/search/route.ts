import searchIndex from ".scripts/Post/search-index.json";
import searchOptions from "lib/search";
import MiniSearch from "minisearch";
import { NextResponse } from "next/server";

export const runtime = "edge";

const miniSearch = MiniSearch.loadJS(searchIndex, searchOptions);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  if (!query) {
    return new Response("Missing query parameter", {
      status: 400,
    });
  }

  const result = miniSearch.search(query);
  return NextResponse.json(result);
}
