// src/lib/docling/ingest.ts
// Docling integration for ingesting match reports, tactical PDFs, rulebooks
// Docling converts documents → structured markdown/JSON for LLM context

import axios from "axios";

const DOCLING_URL = process.env.DOCLING_URL || "http://localhost:5001";

export interface DoclingDocument {
  id: string;
  title: string;
  content: string;      // extracted markdown
  metadata: {
    source: string;
    type: "match_report" | "tactical_guide" | "rulebook" | "commentary";
    teams?: string[];
    date?: string;
  };
}

/**
 * Convert a document (PDF/URL) to structured text via Docling
 * Used to build the knowledge base for tactical context
 */
export async function ingestDocument(input: {
  source: string;       // URL or file path
  type: DoclingDocument["metadata"]["type"];
  title: string;
  teams?: string[];
  date?: string;
}): Promise<DoclingDocument> {
  try {
    const response = await axios.post(`${DOCLING_URL}/convert`, {
      source: input.source,
      output_format: "markdown",
      extract_tables: true,
      extract_figures: false,
    });

    return {
      id: `doc_${Date.now()}`,
      title: input.title,
      content: response.data.content,
      metadata: {
        source: input.source,
        type: input.type,
        teams: input.teams,
        date: input.date,
      },
    };
  } catch {
    // Fallback: return mock content for development without Docling running
    console.warn("Docling not available, using mock document");
    return createMockDocument(input);
  }
}

/**
 * Build a match context string from ingested documents
 * This feeds directly into Granite prompts
 */
export function buildMatchContext(docs: DoclingDocument[]): string {
  return docs
    .map((doc) => `[${doc.metadata.type.toUpperCase()}] ${doc.title}\n${doc.content.slice(0, 500)}`)
    .join("\n\n---\n\n");
}

/**
 * Mock document for dev/demo when Docling isn't running
 */
function createMockDocument(input: {
  source: string;
  type: DoclingDocument["metadata"]["type"];
  title: string;
  teams?: string[];
  date?: string;
}): DoclingDocument {
  const mockContent: Record<string, string> = {
    match_report: `Match report context: The match featured intense tactical battles with multiple formation changes. Key moments included pressing triggers in the second half and positional rotations that disrupted the opposition's build-up play.`,
    tactical_guide: `Tactical analysis: High press systems rely on compactness and triggers. Triggers include back passes to goalkeeper, center-back receiving under pressure, or fullbacks facing away from goal.`,
    rulebook: `FIFA Laws of the Game: Offside is judged at the moment the ball is played. VAR reviews are limited to clear and obvious errors in goal/no-goal, penalty/no-penalty, direct red card, and mistaken identity situations.`,
    commentary: `Match commentary highlights key tactical shifts, momentum changes, and decisive moments throughout the game.`,
  };

  return {
    id: `mock_${Date.now()}`,
    title: input.title,
    content: mockContent[input.type] || "Document content unavailable.",
    metadata: {
      source: input.source,
      type: input.type,
      teams: input.teams,
      date: input.date,
    },
  };
}

/**
 * Pre-built World Cup knowledge base entries
 * Used to seed the app with foundational tactical context
 */
export const WORLD_CUP_KNOWLEDGE_BASE = [
  {
    source: "https://digitalhub.fifa.com/m/7f5b38c3da5ac01e/original/Laws-of-the-Game-2024-25.pdf",
    type: "rulebook" as const,
    title: "FIFA Laws of the Game 2024-25",
  },
  {
    source: "tactical_formations_guide",
    type: "tactical_guide" as const,
    title: "World Cup Tactical Formations Guide",
  },
];
