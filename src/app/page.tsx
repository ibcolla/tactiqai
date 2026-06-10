"use client";

import { useState, useCallback, useRef } from "react";
import { MatchEvent, TacticalExplanation, AudienceLevel } from "@/types";
import { DEMO_MATCHES } from "@/lib/data/demo-matches";
import { FormationVisualizer } from "@/components/formation/FormationVisualizer";
import { VARExplainer, DEMO_VAR_DECISIONS } from "@/components/var/VARExplainer";
import { useMobile } from "@/hooks/useMobile";

// ─── Constants ────────────────────────────────────────────────────────────────

const EVENT_ICONS: Record<string, string> = {
  goal: "⚽",
  substitution: "🔄",
  yellow_card: "🟨",
  red_card: "🟥",
  tactical_shift: "⬡",
  formation_change: "◈",
  penalty: "🎯",
  var_review: "📺",
  kickoff: "▶",
  halftime: "⏸",
  fulltime: "⏹",
};

const SIGNIFICANCE_LABELS = {
  critical: { label: "CRITICAL", cls: "sig-critical bg-sig-critical" },
  high:     { label: "KEY",      cls: "sig-high bg-sig-high" },
  medium:   { label: "NOTABLE",  cls: "sig-medium bg-sig-medium" },
  low:      { label: "INFO",     cls: "sig-low bg-sig-low" },
};

const AUDIENCE_DESCRIPTIONS: Record<AudienceLevel, string> = {
  casual:       "Plain language",
  intermediate: "Tactics + context",
  expert:       "Full depth",
};

const TEAM_COLORS: Record<string, string> = {
  France:  "#4169e1",
  Morocco: "#c1272d",
  Brazil:  "#009c3b",
  England: "#cf142b",
};

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--pitch-line)", padding: "12px 20px" }}>
      <div className="header-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 3, background: "var(--grass-bright)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#0a0c0a", lineHeight: 1 }}>T</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.07em" }}>TACTIQAI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span className="animate-pulse-green" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grass-bright)", display: "inline-block" }} />
          <span className="header-ibm-label" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.1em" }}>
            IBM GRANITE · LANGCHAIN · DOCLING
          </span>
        </div>
      </div>
    </header>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

function TabBar({
  active,
  onChange,
  hasVAR,
}: {
  active: "timeline" | "var";
  onChange: (t: "timeline" | "var") => void;
  hasVAR: boolean;
}) {
  const tabs: { id: "timeline" | "var"; label: string; icon: string }[] = [
    { id: "timeline", label: "TIMELINE",    icon: "⬡" },
    { id: "var",      label: "VAR",         icon: "📺" },
  ];
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--pitch-line)", marginBottom: 16 }}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const disabled = tab.id === "var" && !hasVAR;
        return (
          <button
            key={tab.id}
            onClick={() => !disabled && onChange(tab.id)}
            disabled={disabled}
            style={{
              padding: "9px 18px",
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${isActive ? (tab.id === "var" ? "var(--var-purple)" : "var(--grass-bright)") : "transparent"}`,
              color: disabled ? "var(--pitch-faint)" : isActive ? (tab.id === "var" ? "var(--var-purple)" : "var(--grass-bright)") : "var(--white-ghost)",
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {tab.id === "var" && hasVAR && (
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--var-purple)", display: "inline-block" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Match Card ───────────────────────────────────────────────────────────────

function MatchCard({
  match,
  isSelected,
  onSelect,
}: {
  match: (typeof DEMO_MATCHES)[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        width: "100%", textAlign: "left", padding: 14,
        background: isSelected ? "rgba(0,229,84,0.04)" : "var(--pitch-dark)",
        border: `1px solid ${isSelected ? "var(--grass-dim)" : "var(--pitch-line)"}`,
        borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
        boxShadow: isSelected ? "0 0 0 1px var(--grass-dim), 0 0 20px rgba(0,229,84,0.07)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: isSelected ? "var(--grass-bright)" : "var(--white-ghost)" }}>
          {match.stage.replace(/_/g, " ").toUpperCase()}
        </span>
        <span className="minute-badge">{match.date}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 20 }}>{match.homeTeam.flagEmoji}</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "0.05em" }}>
            {match.homeTeam.name.toUpperCase()}
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.12em", color: isSelected ? "var(--grass-bright)" : "var(--white-pure)" }}>
          {match.score.home} – {match.score.away}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "0.05em" }}>
            {match.awayTeam.name.toUpperCase()}
          </span>
          <span style={{ fontSize: 20 }}>{match.awayTeam.flagEmoji}</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "var(--white-ghost)", fontStyle: "italic", lineHeight: 1.5 }}>
        {match.summary}
      </p>
    </button>
  );
}

// ─── Event Row ────────────────────────────────────────────────────────────────

function EventRow({
  event,
  index,
  isSelected,
  onSelect,
}: {
  event: MatchEvent;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const sig = SIGNIFICANCE_LABELS[event.significance];
  const isPassive = ["kickoff", "halftime", "fulltime"].includes(event.type);
  const isVAR = event.type === "var_review";

  return (
    <button
      onClick={isPassive ? undefined : onSelect}
      disabled={isPassive}
      style={{
        width: "100%", textAlign: "left",
        display: "flex", gap: 9, padding: "9px 11px",
        borderRadius: 4,
        background: isSelected
          ? isVAR ? "rgba(167,139,250,0.06)" : "rgba(0,229,84,0.04)"
          : "var(--pitch-dark)",
        border: `1px solid ${
          isSelected
            ? isVAR ? "rgba(167,139,250,0.35)" : "var(--grass-dim)"
            : isPassive ? "transparent" : "var(--pitch-line)"
        }`,
        cursor: isPassive ? "default" : "pointer",
        opacity: isPassive ? 0.38 : 1,
        transition: "all 0.15s",
        boxShadow: isSelected && isVAR ? "0 0 0 1px rgba(167,139,250,0.2)" : "none",
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-start", gap: 5, paddingTop: 1 }}>
        <span className="minute-badge">{event.minute}&apos;</span>
        <span style={{ fontSize: 12 }}>{EVENT_ICONS[event.type] || "·"}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, color: isVAR ? "#c4b5fd" : "var(--white-dim)", lineHeight: 1.5 }}>
          {event.description}
        </p>
        {event.formationBefore && event.formationAfter && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grass-dim)", marginTop: 2 }}>
            {event.formationBefore} → {event.formationAfter}
          </p>
        )}
        {isVAR && (
          <span className="var-badge" style={{ display: "inline-block", marginTop: 4 }}>VAR REVIEW</span>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>
        <span
          className={`inline-block border rounded-sm ${sig.cls}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", padding: "2px 5px", minWidth: 50, textAlign: "center" }}
        >
          {sig.label}
        </span>
      </div>
    </button>
  );
}

// ─── Structured explanation renderer ─────────────────────────────────────────

function ExplanationText({ text }: { text: string }) {
  const sections: { title: string; content: string }[] = [];
  const lines = text.split("\n");
  let current: { title: string; content: string } | null = null;

  for (const line of lines) {
    const bold = line.match(/^\*\*(.+?)\*\*/);
    if (bold) {
      if (current) sections.push(current);
      current = { title: bold[1], content: "" };
    } else if (current && line.trim()) {
      current.content += (current.content ? " " : "") + line.trim();
    }
  }
  if (current) sections.push(current);

  if (sections.length > 1) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {sections.map((sec, i) => (
          <div key={i}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: "var(--grass-dim)", marginBottom: 5 }}>
              {sec.title}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.78, color: "var(--white-dim)" }}>{sec.content}</p>
          </div>
        ))}
      </div>
    );
  }
  return <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--white-dim)", whiteSpace: "pre-line" }}>{text}</p>;
}

// ─── Explanation Panel ────────────────────────────────────────────────────────

function ExplanationPanel({
  explanation,
  loading,
  error,
  selectedEvent,
  matchColors,
  opponentFormation,
}: {
  explanation: (TacticalExplanation & { source?: string }) | null;
  loading: boolean;
  error: string | null;
  selectedEvent: MatchEvent | null;
  matchColors: { home: string; away: string };
  opponentFormation: string;
}) {
  const hasTacticalViz =
    selectedEvent &&
    (selectedEvent.type === "formation_change" || selectedEvent.type === "tactical_shift") &&
    selectedEvent.formationBefore &&
    selectedEvent.formationAfter;

  if (!selectedEvent && !loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid var(--pitch-faint)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20, color: "var(--white-ghost)" }}>◈</div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: "0.07em", color: "var(--white-ghost)" }}>SELECT A MOMENT</p>
        <p style={{ fontSize: 12, color: "var(--white-ghost)", marginTop: 8, maxWidth: 210, lineHeight: 1.6 }}>
          Click any highlighted event to get an AI tactical breakdown
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 14 }}>
      {/* Event header */}
      {selectedEvent && (
        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid var(--pitch-line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <span className="minute-badge">{selectedEvent.minute}&apos;</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.1em" }}>
              {selectedEvent.type.replace(/_/g, " ").toUpperCase()}
            </span>
          </div>
          <p style={{ fontSize: 12, color: "var(--white-dim)", fontStyle: "italic", lineHeight: 1.5 }}>
            {selectedEvent.description}
          </p>
        </div>
      )}

      {/* Formation visualizer */}
      {hasTacticalViz && selectedEvent && (
        <div style={{ marginBottom: 14 }}>
          <FormationVisualizer
            formationBefore={selectedEvent.formationBefore!}
            formationAfter={selectedEvent.formationAfter!}
            homeTeamColor={matchColors.home}
            opponentFormation={opponentFormation}
            opponentColor={matchColors.away}
            label={`${selectedEvent.minute}'`}
            mode="toggle"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 0" }}>
          <div className="spinner" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--white-ghost)", letterSpacing: "0.06em" }}>
            Querying IBM Granite...
          </span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ padding: 12, borderRadius: 4, background: "rgba(255,58,58,0.06)", border: "1px solid rgba(255,58,58,0.2)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#ff6b6b", letterSpacing: "0.1em", marginBottom: 4 }}>ERROR</p>
          <p style={{ fontSize: 12, color: "var(--white-dim)", lineHeight: 1.5 }}>{error}</p>
          <p style={{ fontSize: 11, color: "var(--white-ghost)", marginTop: 8 }}>Set WATSONX_API_KEY in .env.local to enable live Granite responses.</p>
        </div>
      )}

      {/* Explanation */}
      {explanation && !loading && (
        <div className="animate-fade-up">
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grass-bright)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--grass-dim)", letterSpacing: "0.12em" }}>
              {explanation.source === "mock" ? "DEMO MODE · MOCK RESPONSE" : "IBM GRANITE ANALYSIS"}
            </span>
          </div>
          <ExplanationText text={explanation.explanation} />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", marginTop: 14, letterSpacing: "0.06em" }}>
            {new Date(explanation.generatedAt).toLocaleTimeString()} · {explanation.audienceLevel} · {explanation.momentType.replace(/_/g, " ")}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState<(typeof DEMO_MATCHES)[0] | null>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>("casual");
  const [explanation, setExplanation] = useState<(TacticalExplanation & { source?: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"timeline" | "var">("timeline");
  const isMobile = useMobile();
  const panelRef = useRef<HTMLDivElement>(null);

  const matchColors = selectedMatch
    ? { home: TEAM_COLORS[selectedMatch.homeTeam.name] ?? "#00e554", away: TEAM_COLORS[selectedMatch.awayTeam.name] ?? "#4fc3f7" }
    : { home: "#00e554", away: "#4fc3f7" };

  // VAR decisions for selected match
  const matchVARDecisions = selectedMatch
    ? DEMO_VAR_DECISIONS.filter((d) => d.match.includes(selectedMatch.homeTeam.name) || d.match.includes(selectedMatch.awayTeam.name))
    : [];

  const hasVAR = matchVARDecisions.length > 0;

  const handleExplain = useCallback(
    async (eventIndex: number) => {
      if (!selectedMatch) return;
      setSelectedEventIndex(eventIndex);
      setExplanation(null);
      setError(null);
      setLoading(true);
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ matchId: selectedMatch.id, eventIndex, audienceLevel }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setExplanation(data.explanation);
        // On mobile, scroll the explanation panel into view
        if (isMobile) {
          setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [selectedMatch, audienceLevel, isMobile]
  );

  const opponentFormation = selectedMatch?.awayTeam.formation ?? "4-4-2";

  return (
    <div className="pitch-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "16px 0 4px" }}>
          <h2 className="hero-title">
            UNDERSTAND EVERY{" "}
            <span style={{ color: "var(--grass-bright)" }} className="glow-green-text">SHIFT</span>
          </h2>
          <p style={{ color: "var(--white-ghost)", fontSize: 13, marginTop: 10, maxWidth: 400, margin: "10px auto 0", lineHeight: 1.7 }}>
            AI-powered tactical explainer for World Cup moments. Powered by IBM Granite.
          </p>
        </div>

        {/* 01 — Match select */}
        <section>
          <p className="section-label">01 · SELECT MATCH</p>
          <div className="match-grid">
            {DEMO_MATCHES.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={selectedMatch?.id === match.id}
                onSelect={() => {
                  setSelectedMatch(match);
                  setSelectedEventIndex(null);
                  setExplanation(null);
                  setError(null);
                  setActiveTab("timeline");
                }}
              />
            ))}
          </div>
        </section>

        {selectedMatch && (
          <>
            {/* 02 — Level select */}
            <section>
              <p className="section-label">02 · YOUR LEVEL</p>
              <div className="level-row">
                {(["casual", "intermediate", "expert"] as AudienceLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => { setAudienceLevel(level); if (selectedEventIndex !== null) setExplanation(null); }}
                    style={{
                      padding: "7px 16px", borderRadius: 3,
                      border: `1px solid ${audienceLevel === level ? "var(--grass-bright)" : "var(--pitch-faint)"}`,
                      background: audienceLevel === level ? "var(--grass-bright)" : "transparent",
                      color: audienceLevel === level ? "var(--pitch-black)" : "var(--white-ghost)",
                      fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {level}
                    <span style={{ display: "block", fontSize: 9, marginTop: 1, opacity: 0.7, textTransform: "none", letterSpacing: "0.04em", fontWeight: 400 }}>
                      {AUDIENCE_DESCRIPTIONS[level]}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* 03 — Timeline + Explanation */}
            <section>
              <p className="section-label">03 · ANALYSIS</p>

              <div className="main-grid">
                {/* Left: tabs + content */}
                <div>
                  <TabBar active={activeTab} onChange={setActiveTab} hasVAR={hasVAR} />

                  {activeTab === "timeline" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {selectedMatch.events.map((event, i) => (
                        <EventRow
                          key={i}
                          event={event}
                          index={i}
                          isSelected={selectedEventIndex === i}
                          onSelect={() => handleExplain(i)}
                        />
                      ))}
                    </div>
                  )}

                  {activeTab === "var" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {matchVARDecisions.map((decision, i) => (
                        <VARExplainer key={i} decision={decision} audienceLevel={audienceLevel} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: sticky explanation (hidden on mobile when VAR tab active) */}
                {activeTab === "timeline" && (
                  <div
                    ref={panelRef}
                    className="sticky-panel"
                    style={{
                      background: "var(--pitch-dark)",
                      border: "1px solid var(--pitch-line)",
                      borderRadius: 4,
                      minHeight: 280,
                    }}
                  >
                    <div style={{
                      borderBottom: "1px solid var(--pitch-line)",
                      padding: "9px 14px",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      position: "sticky", top: 0,
                      background: "var(--pitch-dark)", zIndex: 1,
                    }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--white-ghost)", letterSpacing: "0.1em" }}>
                        TACTICAL BREAKDOWN
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--grass-dim)", letterSpacing: "0.08em" }}>
                        GRANITE ◈ LANGCHAIN
                      </span>
                    </div>
                    <ExplanationPanel
                      explanation={explanation}
                      loading={loading}
                      error={error}
                      selectedEvent={selectedEventIndex !== null ? selectedMatch.events[selectedEventIndex] : null}
                      matchColors={matchColors}
                      opponentFormation={opponentFormation}
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <footer style={{ borderTop: "1px solid var(--pitch-line)", padding: "10px 20px", marginTop: 28 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.1em" }}>
            TACTIQAI · JUNE 2026 IBM INNOVATION CHALLENGE
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.1em" }}>
            IBM SKILLSBUILD
          </span>
        </div>
      </footer>
    </div>
  );
}
