// src/lib/data/demo-matches.ts
// Realistic World Cup match data for demo/dev purposes

import { DemoMatch } from "@/types";

export const DEMO_MATCHES: DemoMatch[] = [
  {
    id: "wcf_2026_sf1",
    homeTeam: {
      name: "France",
      country: "France",
      flagEmoji: "🇫🇷",
      formation: "4-3-3",
    },
    awayTeam: {
      name: "Morocco",
      country: "Morocco",
      flagEmoji: "🇲🇦",
      formation: "4-1-4-1",
    },
    score: { home: 2, away: 1 },
    stage: "semifinal",
    venue: "MetLife Stadium, New Jersey",
    date: "2026-07-08",
    status: "completed",
    summary: "A tense semifinal where France's tactical flexibility overcame Morocco's resilient defensive block.",
    tacticalNarrative:
      "Morocco's low block neutralized France for 60 minutes until Deschamps shifted to a high press with Mbappé as the pressing trigger.",
    events: [
      {
        minute: 1,
        type: "kickoff",
        team: "France",
        description: "France kick off. Starting in a 4-3-3 with Mbappé leading the line.",
        significance: "low",
      },
      {
        minute: 23,
        type: "goal",
        team: "Morocco",
        playerName: "Hakimi",
        description: "Hakimi scores from a stunning long-range effort after France overcommit in attack.",
        significance: "critical",
      },
      {
        minute: 38,
        type: "tactical_shift",
        team: "France",
        description: "France drop into a 4-4-2 mid-block, ceding possession to invite Morocco higher.",
        formationBefore: "4-3-3",
        formationAfter: "4-4-2",
        significance: "high",
      },
      {
        minute: 45,
        type: "halftime",
        team: "France",
        description: "Half time. Morocco lead 1-0. France dominated possession but lacked penetration.",
        significance: "medium",
      },
      {
        minute: 58,
        type: "substitution",
        team: "France",
        playerName: "Camavinga → Coman",
        description: "Deschamps brings on Coman for Camavinga — a clear signal to go wider and stretch Morocco's backline.",
        formationBefore: "4-4-2",
        formationAfter: "4-3-3",
        significance: "high",
      },
      {
        minute: 63,
        type: "formation_change",
        team: "France",
        description: "France shift to a high press 4-3-3. Mbappé drops as the press trigger on Morocco's left center-back.",
        formationBefore: "4-4-2",
        formationAfter: "4-3-3 high press",
        significance: "critical",
      },
      {
        minute: 71,
        type: "goal",
        team: "France",
        playerName: "Griezmann",
        description: "Griezmann equalizes after the high press forces a turnover 25 yards out.",
        significance: "critical",
      },
      {
        minute: 84,
        type: "goal",
        team: "France",
        playerName: "Mbappé",
        description: "Mbappé wins it with a clinical finish. Morocco's legs give way in the final ten minutes.",
        significance: "critical",
      },
      {
        minute: 90,
        type: "fulltime",
        team: "France",
        description: "Full time. France 2-1 Morocco. France reach the World Cup Final.",
        significance: "low",
      },
    ],
  },
  {
    id: "wcf_2026_qf3",
    homeTeam: {
      name: "Brazil",
      country: "Brazil",
      flagEmoji: "🇧🇷",
      formation: "4-2-3-1",
    },
    awayTeam: {
      name: "England",
      country: "England",
      flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      formation: "4-3-3",
    },
    score: { home: 1, away: 2 },
    stage: "quarterfinal",
    venue: "AT&T Stadium, Dallas",
    date: "2026-07-04",
    status: "completed",
    summary: "England's disciplined defensive shape frustrated Brazil before counter-attacking precision sealed the tie.",
    tacticalNarrative:
      "Southgate's men sat in a 4-5-1 out of possession, inviting Brazil's slow build-up before exploiting the spaces in behind.",
    events: [
      {
        minute: 1,
        type: "kickoff",
        team: "Brazil",
        description: "Brazil kick off in their classic 4-2-3-1. England sit in a compact 4-5-1 out of possession.",
        significance: "low",
      },
      {
        minute: 17,
        type: "tactical_shift",
        team: "England",
        description: "England's midfield line drops to a 4-5-1 when Brazil's fullbacks push forward, cutting inside channels.",
        formationBefore: "4-3-3",
        formationAfter: "4-5-1",
        significance: "medium",
      },
      {
        minute: 34,
        type: "goal",
        team: "Brazil",
        playerName: "Vinicius Jr.",
        description: "Brazil break the deadlock. Vinicius cuts inside from the left and curls past Pickford.",
        significance: "critical",
      },
      {
        minute: 45,
        type: "halftime",
        team: "Brazil",
        description: "Half time. Brazil 1-0 England.",
        significance: "medium",
      },
      {
        minute: 51,
        type: "substitution",
        team: "England",
        playerName: "Trent Alexander-Arnold → Palmer",
        description: "Palmer comes on. England shift to a more attack-minded 4-3-3 in possession.",
        formationBefore: "4-5-1",
        formationAfter: "4-3-3",
        significance: "high",
      },
      {
        minute: 67,
        type: "goal",
        team: "England",
        playerName: "Bellingham",
        description: "Bellingham equalizes with a header from a well-worked corner. Brazil's set-piece vulnerability exposed.",
        significance: "critical",
      },
      {
        minute: 79,
        type: "var_review",
        team: "Brazil",
        description: "VAR reviews a potential handball in Brazil's penalty area. On-field decision of no penalty upheld.",
        significance: "high",
      },
      {
        minute: 88,
        type: "goal",
        team: "England",
        playerName: "Palmer",
        description: "Palmer seals it on the counter. Brazil commit men forward chasing an equalizer — England punish them ruthlessly.",
        significance: "critical",
      },
      {
        minute: 90,
        type: "fulltime",
        team: "England",
        description: "Full time. Brazil 1-2 England. England advance to the semifinals.",
        significance: "low",
      },
    ],
  },
];

export function getMatchById(id: string): DemoMatch | undefined {
  return DEMO_MATCHES.find((m) => m.id === id);
}

export function getSignificantEvents(match: DemoMatch) {
  return match.events.filter((e) =>
    ["high", "critical"].includes(e.significance)
  );
}
