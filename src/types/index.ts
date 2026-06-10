// src/types/index.ts

export type AudienceLevel = "casual" | "intermediate" | "expert";

export interface Team {
  name: string;
  country: string;
  flagEmoji: string;
  formation: string;
}

export interface MatchEvent {
  minute: number;
  type:
    | "goal"
    | "substitution"
    | "yellow_card"
    | "red_card"
    | "tactical_shift"
    | "formation_change"
    | "penalty"
    | "var_review"
    | "kickoff"
    | "halftime"
    | "fulltime";
  team: string;
  description: string;
  playerName?: string;
  formationBefore?: string;
  formationAfter?: string;
  significance: "low" | "medium" | "high" | "critical";
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    home: number;
    away: number;
  };
  stage: "group" | "round_of_16" | "quarterfinal" | "semifinal" | "final";
  group?: string;
  venue: string;
  date: string;
  status: "upcoming" | "live" | "completed";
  events: MatchEvent[];
}

export interface TacticalExplanation {
  id: string;
  matchId: string;
  eventMinute: number;
  eventDescription: string;
  explanation: string;
  audienceLevel: AudienceLevel;
  generatedAt: string;
  momentType: "tactical_shift" | "momentum_change" | "formation_change" | "key_decision";
  source?: "granite" | "mock";  // Week 2: track response origin
}

export interface ExplainRequest {
  matchId: string;
  eventIndex: number;
  audienceLevel: AudienceLevel;
}

export interface ExplainResponse {
  explanation: TacticalExplanation;
  relatedEvents: MatchEvent[];
}

// Demo match data shape
export interface DemoMatch extends Match {
  summary: string;
  tacticalNarrative: string;
}
