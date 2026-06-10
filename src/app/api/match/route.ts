// src/app/api/match/route.ts

import { NextResponse } from "next/server";
import { DEMO_MATCHES } from "@/lib/data/demo-matches";

export async function GET() {
  const matches = DEMO_MATCHES.map((m) => ({
    id: m.id,
    homeTeam: m.homeTeam,
    awayTeam: m.awayTeam,
    score: m.score,
    stage: m.stage,
    venue: m.venue,
    date: m.date,
    status: m.status,
    summary: m.summary,
    eventCount: m.events.length,
    significantEventCount: m.events.filter((e) =>
      ["high", "critical"].includes(e.significance)
    ).length,
  }));

  return NextResponse.json({ matches });
}
