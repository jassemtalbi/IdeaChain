import { NextRequest, NextResponse } from "next/server";
import { transformIdeaToBlueprint } from "@/lib/ai/together";

export async function POST(req: NextRequest) {
  try {
    const { rawIdea } = await req.json();

    if (!rawIdea || typeof rawIdea !== "string" || rawIdea.trim().length < 5) {
      return NextResponse.json({ error: "Please provide a longer idea description." }, { status: 400 });
    }

    if (rawIdea.length > 500) {
      return NextResponse.json({ error: "Idea too long. Max 500 characters." }, { status: 400 });
    }

    const result = await transformIdeaToBlueprint(rawIdea.trim());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Transform error:", error);
    return NextResponse.json({ error: "Failed to transform idea." }, { status: 500 });
  }
}
