// src/app/api/explain/route.ts
// Week 2: updated to handle new { text, source } return shape + richer match context

import { NextRequest, NextResponse } from "next/server";
import { explainTacticalMoment, analyzeMomentumShift } from "@/lib/granite/client";
import { getMatchById } from "@/lib/data/demo-matches";
import { ExplainRequest, TacticalExplanation } from "@/types";

/** Build a rich, chronological match context string for Granite */
function buildMatchContext(
  match: ReturnType<typeof getMatchById>,
  upToEventIndex: number
): string {
  if (!match) return "";
  const priorEvents = match.events
    .slice(0, upToEventIndex)
    .filter((e) => ["goal", "formation_change", "tactical_shift", "substitution", "yellow_card", "red_card"].includes(e.type))
    .map((e) => `  ${e.minute}' — ${e.description}`)
    .join("\n");

  return `
${match.homeTeam.flagEmoji} ${match.homeTeam.name} (${match.homeTeam.formation}) vs ${match.awayTeam.flagEmoji} ${match.awayTeam.name} (${match.awayTeam.formation})
Stage: ${match.stage.replace(/_/g, " ").toUpperCase()} | Venue: ${match.venue}
Score: ${match.score.home}–${match.score.away}
${priorEvents ? `\nKey events so far:\n${priorEvents}` : ""}
`.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body: ExplainRequest = await req.json();
    const { matchId, eventIndex, audienceLevel } = body;

    if (!matchId || eventIndex === undefined || !audienceLevel) {
      return NextResponse.json(
        { error: "Missing required fields: matchId, eventIndex, audienceLevel" },
        { status: 400 }
      );
    }

    const match = getMatchById(matchId);
    if (!match) return NextResponse.json({ error: "Match not found" }, { status: 404 });

    const event = match.events[eventIndex];
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const matchContext = buildMatchContext(match, eventIndex);

    // Determine moment type for mock fallback
    const momentType =
      event.type === "formation_change" || event.type === "tactical_shift"
        ? "formation_change"
        : event.type === "goal" || event.type === "substitution"
        ? "momentum_change"
        : "key_decision";

    let result: { text: string; source: "granite" | "mock" };

    if (event.type === "formation_change" || event.type === "tactical_shift") {
      result = await explainTacticalMoment({
        matchContext,
        moment: `${event.description}`,
        formationBefore: event.formationBefore,
        formationAfter: event.formationAfter,
        audienceLevel,
        momentType: "formation_change",
      });
    } else if (event.type === "goal" || event.type === "substitution") {
      const surroundingEvents = match.events
        .slice(Math.max(0, eventIndex - 2), Math.min(match.events.length, eventIndex + 2))
        .map((e) => `${e.minute}': ${e.description}`);

      result = await analyzeMomentumShift({
        matchContext,
        eventSequence: surroundingEvents,
        audienceLevel,
      });
    } else {
      result = await explainTacticalMoment({
        matchContext,
        moment: `${event.description}`,
        audienceLevel,
        momentType: "key_decision",
      });
    }

    const explanation: TacticalExplanation = {
      id: `exp_${matchId}_${eventIndex}_${Date.now()}`,
      matchId,
      eventMinute: event.minute,
      eventDescription: event.description,
      explanation: result.text,
      audienceLevel,
      generatedAt: new Date().toISOString(),
      momentType,
      source: result.source,
    } as TacticalExplanation & { source: string };

    const relatedEvents = match.events.slice(
      Math.max(0, eventIndex - 2),
      Math.min(match.events.length, eventIndex + 3)
    );

    return NextResponse.json({ explanation, relatedEvents });
  } catch (error) {
    console.error("Explanation error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation. Check IBM Granite credentials." },
      { status: 500 }
    );
  }
}
