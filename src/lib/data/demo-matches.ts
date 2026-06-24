// src/lib/data/demo-matches.ts
import { DemoMatch } from "@/types";

export const DEMO_MATCHES: DemoMatch[] = [
  {
    id: "wcf_2026_sf1",
    homeTeam: { name: "France", country: "France", flagEmoji: "🇫🇷", formation: "4-3-3" },
    awayTeam: { name: "Morocco", country: "Morocco", flagEmoji: "🇲🇦", formation: "4-1-4-1" },
    score: { home: 2, away: 1 },
    stage: "semifinal",
    venue: "MetLife Stadium, New Jersey",
    date: "2026-07-08",
    status: "completed",
    summary: "A tense semifinal where France tactical flexibility overcame Morocco resilient defensive block.",
    tacticalNarrative: "Morocco low block neutralized France for 60 minutes until Deschamps shifted to a high press.",
    events: [
      { minute: 1, type: "kickoff", team: "France", description: "France kick off. Starting in a 4-3-3 with Mbappe leading the line.", significance: "low" },
      { minute: 23, type: "goal", team: "Morocco", playerName: "Hakimi", description: "Hakimi scores from a stunning long-range effort after France overcommit in attack.", significance: "critical" },
      { minute: 38, type: "tactical_shift", team: "France", description: "France drop into a 4-4-2 mid-block, ceding possession to invite Morocco higher.", formationBefore: "4-3-3", formationAfter: "4-4-2", significance: "high" },
      { minute: 45, type: "halftime", team: "France", description: "Half time. Morocco lead 1-0. France dominated possession but lacked penetration.", significance: "medium" },
      { minute: 58, type: "substitution", team: "France", playerName: "Camavinga -> Coman", description: "Deschamps brings on Coman for Camavinga to stretch Morocco backline.", formationBefore: "4-4-2", formationAfter: "4-3-3", significance: "high" },
      { minute: 63, type: "formation_change", team: "France", description: "France shift to a high press 4-3-3. Mbappe drops as the press trigger on Morocco left center-back.", formationBefore: "4-4-2", formationAfter: "4-3-3 high press", significance: "critical" },
      { minute: 71, type: "goal", team: "France", playerName: "Griezmann", description: "Griezmann equalizes after the high press forces a turnover 25 yards out.", significance: "critical" },
      { minute: 84, type: "goal", team: "France", playerName: "Mbappe", description: "Mbappe wins it with a clinical finish. Morocco legs give way in the final ten minutes.", significance: "critical" },
      { minute: 90, type: "fulltime", team: "France", description: "Full time. France 2-1 Morocco. France reach the World Cup Final.", significance: "low" }
    ]
  },
  {
    id: "wcf_2026_qf3",
    homeTeam: { name: "Brazil", country: "Brazil", flagEmoji: "🇧🇷", formation: "4-2-3-1" },
    awayTeam: { name: "England", country: "England", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", formation: "4-3-3" },
    score: { home: 1, away: 2 },
    stage: "quarterfinal",
    venue: "AT&T Stadium, Dallas",
    date: "2026-07-04",
    status: "completed",
    summary: "England disciplined defensive shape frustrated Brazil before counter-attacking precision sealed the tie.",
    tacticalNarrative: "Southgate men sat in a 4-5-1 out of possession, exploiting spaces in behind Brazil.",
    events: [
      { minute: 1, type: "kickoff", team: "Brazil", description: "Brazil kick off in their classic 4-2-3-1. England sit in a compact 4-5-1.", significance: "low" },
      { minute: 17, type: "tactical_shift", team: "England", description: "England midfield line drops to a 4-5-1 when Brazil fullbacks push forward.", formationBefore: "4-3-3", formationAfter: "4-5-1", significance: "medium" },
      { minute: 34, type: "goal", team: "Brazil", playerName: "Vinicius Jr.", description: "Brazil break the deadlock. Vinicius cuts inside from the left and curls past Pickford.", significance: "critical" },
      { minute: 45, type: "halftime", team: "Brazil", description: "Half time. Brazil 1-0 England.", significance: "medium" },
      { minute: 51, type: "substitution", team: "England", playerName: "Trent -> Palmer", description: "Palmer comes on. England shift to a more attack-minded 4-3-3 in possession.", formationBefore: "4-5-1", formationAfter: "4-3-3", significance: "high" },
      { minute: 67, type: "goal", team: "England", playerName: "Bellingham", description: "Bellingham equalizes with a header from a well-worked corner.", significance: "critical" },
      { minute: 79, type: "var_review", team: "Brazil", description: "VAR reviews a potential handball in Brazil penalty area. No penalty upheld.", significance: "high" },
      { minute: 88, type: "goal", team: "England", playerName: "Palmer", description: "Palmer seals it on the counter. Brazil commit men forward and England punish them ruthlessly.", significance: "critical" },
      { minute: 90, type: "fulltime", team: "England", description: "Full time. Brazil 1-2 England. England advance to the semifinals.", significance: "low" }
    ]
  },
  {
    id: "wcf_2026_final",
    homeTeam: { name: "France", country: "France", flagEmoji: "🇫🇷", formation: "4-3-3" },
    awayTeam: { name: "England", country: "England", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", formation: "4-3-3" },
    score: { home: 2, away: 1 },
    stage: "final",
    venue: "MetLife Stadium, New Jersey",
    date: "2026-07-19",
    status: "completed",
    summary: "A pulsating World Cup Final settled by Mbappe extra-time winner as France edged England in a classic.",
    tacticalNarrative: "England matched France for 90 minutes before Deschamps switched to a back three in extra time.",
    events: [
      { minute: 1, type: "kickoff", team: "France", description: "The 2026 World Cup Final kicks off. France vs England in mirror 4-3-3 formations.", significance: "low" },
      { minute: 18, type: "tactical_shift", team: "England", description: "England drop into a compact 4-5-1 out of possession. Bellingham tucks into midfield.", formationBefore: "4-3-3", formationAfter: "4-5-1", significance: "high" },
      { minute: 34, type: "goal", team: "England", playerName: "Bellingham", description: "Bellingham heads England in front. France high line caught out at the back post.", significance: "critical" },
      { minute: 41, type: "var_review", team: "England", description: "VAR reviews Bellingham goal for offside. Semi-automated system checks all body points.", significance: "high" },
      { minute: 45, type: "halftime", team: "England", description: "Half time. England 1-0 France. England low block has been outstanding.", significance: "medium" },
      { minute: 54, type: "substitution", team: "France", playerName: "Camavinga -> Dembele", description: "Deschamps throws on Dembele for pace down the right to attack England left side.", formationBefore: "4-3-3", formationAfter: "4-3-3", significance: "high" },
      { minute: 67, type: "formation_change", team: "France", description: "France switch to a 3-4-3 overloading England right flank with width and runners.", formationBefore: "4-3-3", formationAfter: "3-5-2", significance: "critical" },
      { minute: 73, type: "goal", team: "France", playerName: "Griezmann", description: "Griezmann equalizes. The overload creates the space. Dembele crosses, Griezmann finishes.", significance: "critical" },
      { minute: 87, type: "tactical_shift", team: "England", description: "England push higher switching to 4-2-4 in desperation to find a winner.", formationBefore: "4-5-1", formationAfter: "4-2-4", significance: "high" },
      { minute: 90, type: "halftime", team: "France", description: "Full time 1-1. Extra time required in the World Cup Final.", significance: "medium" },
      { minute: 98, type: "formation_change", team: "France", description: "Deschamps switches to back three in extra time flooding midfield to dominate possession.", formationBefore: "3-5-2", formationAfter: "3-5-2", significance: "critical" },
      { minute: 108, type: "goal", team: "France", playerName: "Mbappe", description: "Mbappe wins it on the counter. England 4-2-4 leaves them wide open and France punish them.", significance: "critical" },
      { minute: 120, type: "fulltime", team: "France", description: "Full time. France 2-1 England AET. France are 2026 World Cup Champions.", significance: "low" }
    ]
  }
];

export function getMatchById(id: string): DemoMatch | undefined {
  return DEMO_MATCHES.find((m) => m.id === id);
}

export function getSignificantEvents(match: DemoMatch) {
  return match.events.filter((e) =>
    ["high", "critical"].includes(e.significance)
  );
}
