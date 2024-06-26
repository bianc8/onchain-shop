import { createShowcase, getAllShowcases } from "@/lib/mongodb";
import { extractParamsFromUrl } from "@/lib/frames";
import { NextRequest, NextResponse } from "next/server";

const fetchShowCases = async (req: NextRequest) => {
  const { shopId } = extractParamsFromUrl(req.url!);

  if (!shopId) {
    return NextResponse.json({ error: "missing shopId in fetchShowCases" });
  }

  const showcases = await getAllShowcases(shopId);

  return NextResponse.json({
    showcases,
  });
};

const postShowCase = async (req: NextRequest) => {
  const { shopId } = extractParamsFromUrl(req.url!);
  const body = await req.json();

  const showcase = await createShowcase(shopId, body.productIds, body.name);

  return NextResponse.json({
    showcase,
  });
};

export const GET = fetchShowCases;
export const POST = postShowCase;
