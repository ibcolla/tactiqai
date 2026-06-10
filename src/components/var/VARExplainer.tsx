"use client";

// src/components/var/VARExplainer.tsx
// Week 3: VAR decision reconstruction UI
// Shows the decision, rule applied, review outcome, and AI explanation

import { useState } from "react";
import { AudienceLevel } from "@/types";

// ─── VAR rule database ────────────────────────────────────────────────────────

export interface VARRule {
  id: string;
  category: "goal" | "penalty" | "red_card" | "mistaken_identity";
  title: string;
  lawNumber: number;
  shortRule: string;
  fullRule: string;
  commonMisconception: string;
}

export const VAR_RULES: VARRule[] = [
  {
    id: "offside",
    category: "goal",
    title: "Offside — Law 11",
    lawNumber: 11,
    shortRule: "A player is offside if any body part that can legally score is ahead of the second-last defender at the moment the ball is played.",
    fullRule: "A player is in an offside position if: any part of the head, body or feet is in the opponents' half (excluding the halfway line) and any part of the head, body or feet is nearer to the opponents' goal line than both the ball and the second-last opponent. The hands and arms of all players, including the goalkeepers, are not considered.",
    commonMisconception: "Many fans think it's the whole body — it's only the parts that can score. A shoulder or armpit millimetres ahead is enough.",
  },
  {
    id: "handball",
    category: "penalty",
    title: "Handball — Law 12",
    lawNumber: 12,
    shortRule: "Handball is penalised if a player deliberately touches the ball with their hand/arm, or if the arm is in an 'unnatural position' that makes the body unnaturally bigger.",
    fullRule: "It is an offence if a player deliberately touches the ball with their hand/arm, including moving the hand/arm towards the ball. It is usually an offence if a player touches the ball with their hand/arm when the hand/arm is clearly above/beyond their shoulder level (unless the player deliberately plays the ball which then touches their hand/arm). A player scoring or creating a goal with their hand/arm is penalised even if accidental.",
    commonMisconception: "Accidental handball is not always a foul — but if it directly leads to a goal or a scoring opportunity, it is penalised regardless of intent.",
  },
  {
    id: "violent_conduct",
    category: "red_card",
    title: "Violent Conduct — Law 12",
    lawNumber: 12,
    shortRule: "A player is sent off for violent conduct: using excessive force or brutality against an opponent when not challenging for the ball.",
    fullRule: "A player, substitute or substituted player who commits any of the following offences is sent off: serious foul play, biting or spitting at someone, violent conduct, using offensive, insulting or abusive language and/or gestures, receiving a second caution in the same match.",
    commonMisconception: "VAR can only review red cards issued for violent conduct or serious foul play — not second yellow cards (tactical fouls, dissent, etc.).",
  },
  {
    id: "penalty_foul",
    category: "penalty",
    title: "Penalty — Foul in the Area",
    lawNumber: 12,
    shortRule: "A direct free kick offence committed by a player inside their own penalty area results in a penalty kick.",
    fullRule: "A penalty kick is awarded when a player commits a direct free kick offence inside their own penalty area. The VAR review threshold is 'clear and obvious error' — the referee's on-field call must be significantly wrong for VAR to intervene, not merely debatable.",
    commonMisconception: "VAR doesn't reverse 'debatable' calls — only clear and obvious errors. A 50/50 decision stands with the on-field referee.",
  },
];

// ─── VAR decision data shape ──────────────────────────────────────────────────

export interface VARDecision {
  minute: number;
  match: string;
  initialCall: string;
  finalOutcome: string;
  rule: VARRule;
  reviewDurationSeconds: number;
  onFieldReferee: string;
  varTeam: string;
  controversial: boolean;
  explanation: Record<AudienceLevel, string>;
}

// Demo VAR decisions
export const DEMO_VAR_DECISIONS: VARDecision[] = [
  {
    minute: 79,
    match: "Brazil vs England",
    initialCall: "No penalty — referee waves play on",
    finalOutcome: "No penalty upheld — original decision stands",
    rule: VAR_RULES.find((r) => r.id === "handball")!,
    reviewDurationSeconds: 87,
    onFieldReferee: "Szymon Marciniak (POL)",
    varTeam: "VAR: Massimiliano Irrati (ITA)",
    controversial: true,
    explanation: {
      casual: "The VAR team spent 87 seconds watching the replay from multiple camera angles. The key question: was the England defender's arm in an 'unnatural position' that made his body bigger? The officials decided the arm was close to his body and the contact was accidental. Under the rules, accidental handball that doesn't directly create a goal or clear opportunity isn't a penalty. Brazil's players disagreed loudly — but the rules support the call.",
      intermediate: "The handball check required VAR to assess two criteria: first, was the arm in an unnatural position above shoulder height? Second, did the handball directly create a goalscoring opportunity? The arm was below shoulder level and positioned naturally for balance during the aerial duel. FIFA's 2024-25 law revision narrowed the 'unnatural position' definition, making borderline cases like this lean toward 'no penalty'. The on-field decision required clear and obvious error to be overturned — VAR found no such error.",
      expert: "The decision turned on Law 12's 2024-25 revised threshold for 'unnatural position'. The arm was at approximately 45° from the torso — above the guideline 'natural' position but below the shoulder threshold that triggers automatic penalisation. Critically, the contact occurred during an aerial challenge, where FIFA guidelines explicitly acknowledge that arm positions during jumps require contextual assessment. The 87-second review suggests the VAR team used frame-by-frame analysis on the semi-automated offside system's 3D skeletal model to measure arm angle precisely. The absence of a clear and obvious error maintained the on-field call — consistent with the high intervention threshold that protects referee authority.",
    },
  },
  {
    minute: 56,
    match: "France vs Morocco",
    initialCall: "Goal — Mbappé taps in from close range",
    finalOutcome: "Goal disallowed — Griezmann ruled offside in the build-up",
    rule: VAR_RULES.find((r) => r.id === "offside")!,
    reviewDurationSeconds: 112,
    onFieldReferee: "Anthony Taylor (ENG)",
    varTeam: "VAR: Bastian Dankert (GER)",
    controversial: true,
    explanation: {
      casual: "France thought they had equalised — the stadium erupted. But VAR spent nearly two minutes checking a moment earlier in the move, not the goal itself. Griezmann, who helped set up the chance, had a shoulder fraction ahead of Morocco's last defender at the split-second the ball was played to him. That tiny sliver — invisible to the naked eye — meant the whole move was offside from that point. It feels harsh, but the rule is the rule: the moment the pass is made is all that matters, not where anyone ends up.",
      intermediate: "The check focused on the 'moment of play' freeze-frame — when France's midfielder played the ball to Griezmann in the build-up. Semi-automated offside technology generated a 3D skeletal model and identified Griezmann's right shoulder approximately 4cm beyond Morocco's second-last defender at that precise frame. Under Law 11, any body part that can legally score counts — the shoulder qualifies. Despite the margin being marginal, the law does not have a tolerance buffer; any part ahead is offside. The 112-second review reflects the time needed to identify the correct freeze-frame in a fast-flowing sequence.",
      expert: "This decision illustrates the precision demands of semi-automated offside (SAOT). The system tracked 29 body points per player at 50 frames per second, identifying the exact frame — within 20 milliseconds — when the throughball was played. Griezmann's acromioclavicular joint was 3.8cm offside. FIFA considered introducing a 'body part tolerance' margin in the 2023 law review but rejected it on grounds of inconsistency. The 112-second delay reflects two compounding factors: first, identifying the correct release frame in a 7-pass sequence; second, a calibration check after the SAOT's initial confidence score fell below the 95% threshold required for automatic flag. The call was correct under current law — the controversy belongs to the law itself, not the officials.",
    },
  },
];

// ─── Timeline step ────────────────────────────────────────────────────────────

function TimelineStep({
  step,
  active,
  done,
  index,
}: {
  step: { icon: string; label: string; detail: string };
  active: boolean;
  done: boolean;
  index: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        opacity: done || active ? 1 : 0.35,
        transition: `opacity 0.3s ${index * 80}ms`,
      }}
    >
      {/* Icon + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: done ? "var(--grass-bright)" : active ? "rgba(0,229,84,0.15)" : "var(--pitch-faint)",
            border: `1px solid ${done ? "var(--grass-bright)" : active ? "var(--grass-dim)" : "var(--pitch-line)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12,
            transition: "all 0.3s",
            flexShrink: 0,
          }}
        >
          {done ? "✓" : step.icon}
        </div>
        {index < 3 && (
          <div
            style={{
              width: 1, height: 24,
              background: done ? "var(--grass-dim)" : "var(--pitch-line)",
              transition: "background 0.3s",
            }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ paddingBottom: 16 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.1em",
            color: active ? "var(--grass-bright)" : done ? "var(--white-dim)" : "var(--white-ghost)",
            marginBottom: 2,
          }}
        >
          {step.label}
        </p>
        <p style={{ fontSize: 12, color: "var(--white-ghost)", lineHeight: 1.5 }}>{step.detail}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface VARExplainerProps {
  decision: VARDecision;
  audienceLevel: AudienceLevel;
}

export function VARExplainer({ decision, audienceLevel }: VARExplainerProps) {
  const [activeStep, setActiveStep] = useState(3); // all steps visible by default
  const [showRule, setShowRule] = useState(false);

  const steps = [
    {
      icon: "🎬",
      label: "INCIDENT FLAGGED",
      detail: `${decision.minute}' — ${decision.initialCall}`,
    },
    {
      icon: "📺",
      label: "VAR REVIEW INITIATED",
      detail: `${decision.varTeam} begins frame-by-frame analysis`,
    },
    {
      icon: "⏱",
      label: `${decision.reviewDurationSeconds}s REVIEW`,
      detail: `Multiple camera angles examined. Semi-automated offside system consulted.`,
    },
    {
      icon: decision.finalOutcome.includes("upheld") ? "✅" : "🔄",
      label: "FINAL DECISION",
      detail: decision.finalOutcome,
    },
  ];

  return (
    <div
      style={{
        background: "var(--pitch-dark)",
        border: "1px solid rgba(167,139,250,0.2)",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(167,139,250,0.15)",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(167,139,250,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="animate-var-scan" style={{ fontSize: 14 }}>📺</span>
          <span
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.12em", color: "var(--var-purple)",
            }}
          >
            VAR DECISION RECONSTRUCTION
          </span>
        </div>
        <span className="minute-badge">{decision.minute}&apos;</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Match + controversy tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--white-ghost)", marginBottom: 2 }}>
              {decision.match}
            </p>
            <p style={{ fontSize: 13, color: "var(--white-dim)" }}>
              {decision.rule.title}
            </p>
          </div>
          {decision.controversial && (
            <span
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.1em",
                background: "rgba(255,184,0,0.1)",
                border: "1px solid rgba(255,184,0,0.25)",
                color: "var(--amber-signal)",
                padding: "2px 8px", borderRadius: 2,
                whiteSpace: "nowrap",
              }}
            >
              CONTROVERSIAL
            </span>
          )}
        </div>

        {/* Review timeline */}
        <div style={{ marginBottom: 16 }}>
          {steps.map((step, i) => (
            <TimelineStep
              key={i}
              step={step}
              active={activeStep === i}
              done={i < activeStep}
              index={i}
            />
          ))}
        </div>

        {/* AI Explanation */}
        <div
          style={{
            background: "rgba(167,139,250,0.05)",
            border: "1px solid rgba(167,139,250,0.12)",
            borderRadius: 4,
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--var-purple)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.12em", color: "var(--var-purple)",
              }}
            >
              GRANITE ANALYSIS · {audienceLevel.toUpperCase()}
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--white-dim)", lineHeight: 1.8 }}>
            {decision.explanation[audienceLevel]}
          </p>
        </div>

        {/* Rule breakdown toggle */}
        <button
          onClick={() => setShowRule((v) => !v)}
          style={{
            width: "100%", textAlign: "left",
            padding: "8px 12px",
            background: showRule ? "rgba(167,139,250,0.08)" : "transparent",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: 3,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "background 0.2s",
            marginBottom: showRule ? 0 : undefined,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.1em", color: "var(--var-purple)",
            }}
          >
            FIFA LAW {decision.rule.lawNumber} — {decision.rule.title.split(" — ")[0].toUpperCase()}
          </span>
          <span style={{ color: "var(--var-purple)", fontSize: 12 }}>
            {showRule ? "▲" : "▼"}
          </span>
        </button>

        {showRule && (
          <div
            className="animate-fade-up"
            style={{
              background: "rgba(167,139,250,0.04)",
              border: "1px solid rgba(167,139,250,0.12)",
              borderTop: "none",
              borderRadius: "0 0 3px 3px",
              padding: 14,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.1em", color: "var(--var-purple)",
                marginBottom: 6,
              }}
            >
              THE RULE
            </p>
            <p style={{ fontSize: 12, color: "var(--white-dim)", lineHeight: 1.75, marginBottom: 12 }}>
              {decision.rule.shortRule}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.1em", color: "var(--amber-signal)",
                marginBottom: 6,
              }}
            >
              COMMON MISCONCEPTION
            </p>
            <p style={{ fontSize: 12, color: "var(--white-ghost)", lineHeight: 1.75, fontStyle: "italic" }}>
              {decision.rule.commonMisconception}
            </p>
          </div>
        )}

        {/* Officials */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.08em", marginBottom: 2 }}>
              ON-FIELD
            </p>
            <p style={{ fontSize: 11, color: "var(--white-dim)" }}>{decision.onFieldReferee}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.08em", marginBottom: 2 }}>
              VAR ROOM
            </p>
            <p style={{ fontSize: 11, color: "var(--white-dim)" }}>{decision.varTeam}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.08em", marginBottom: 2 }}>
              REVIEW TIME
            </p>
            <p style={{ fontSize: 11, color: "var(--white-dim)" }}>{decision.reviewDurationSeconds}s</p>
          </div>
        </div>
      </div>
    </div>
  );
}
