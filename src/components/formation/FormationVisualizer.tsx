"use client";

// src/components/formation/FormationVisualizer.tsx
// Week 3: side-by-side comparison mode + opponent shape overlay added

import { useState, useEffect } from "react";

type Position = [number, number];

// ─── Formation position maps ──────────────────────────────────────────────────
const FORMATIONS: Record<string, Position[]> = {
  "4-4-2": [
    [50, 8],
    [15, 28], [35, 28], [65, 28], [85, 28],
    [15, 55], [35, 55], [65, 55], [85, 55],
    [35, 80], [65, 80],
  ],
  "4-3-3": [
    [50, 8],
    [15, 28], [35, 28], [65, 28], [85, 28],
    [25, 58], [50, 52], [75, 58],
    [15, 80], [50, 82], [85, 80],
  ],
  "4-3-3 high press": [
    [50, 8],
    [15, 32], [35, 32], [65, 32], [85, 32],
    [25, 62], [50, 56], [75, 62],
    [15, 85], [50, 88], [85, 85],
  ],
  "4-2-3-1": [
    [50, 8],
    [15, 28], [35, 28], [65, 28], [85, 28],
    [35, 48], [65, 48],
    [15, 68], [50, 65], [85, 68],
    [50, 85],
  ],
  "4-5-1": [
    [50, 8],
    [15, 28], [35, 28], [65, 28], [85, 28],
    [10, 58], [28, 55], [50, 52], [72, 55], [90, 58],
    [50, 82],
  ],
  "4-1-4-1": [
    [50, 8],
    [15, 28], [35, 28], [65, 28], [85, 28],
    [50, 45],
    [15, 62], [35, 65], [65, 65], [85, 62],
    [50, 85],
  ],
  "3-5-2": [
    [50, 8],
    [25, 28], [50, 24], [75, 28],
    [10, 55], [30, 58], [50, 52], [70, 58], [90, 55],
    [35, 80], [65, 80],
  ],
  "5-3-2": [
    [50, 8],
    [10, 32], [28, 26], [50, 22], [72, 26], [90, 32],
    [25, 58], [50, 52], [75, 58],
    [35, 80], [65, 80],
  ],
};

function normalizeFormation(name: string): string {
  const lower = name.toLowerCase().trim();
  for (const key of Object.keys(FORMATIONS)) {
    if (lower === key.toLowerCase()) return key;
  }
  for (const key of Object.keys(FORMATIONS)) {
    if (lower.startsWith(key.toLowerCase().split(" ")[0])) return key;
  }
  return "4-4-2";
}

// ─── Single pitch SVG ─────────────────────────────────────────────────────────

function PitchSVG({
  positions,
  prevPositions,
  animating,
  color,
  formationLabel,
  opponentPositions,
  opponentColor,
  showOpponent,
}: {
  positions: Position[];
  prevPositions?: Position[] | null;
  animating: boolean;
  color: string;
  formationLabel: string;
  opponentPositions?: Position[];
  opponentColor?: string;
  showOpponent?: boolean;
}) {
  // Mirror opponent positions (they attack from opposite end)
  const mirroredOpponent = opponentPositions?.map(
    ([x, y]): Position => [x, 100 - y + 8]
  );

  return (
    <svg
      viewBox="0 0 100 130"
      style={{ width: "100%", display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Pitch surface */}
      <rect x="0" y="0" width="100" height="130" fill="#0d1a0d" rx="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="0" y={i * 22} width="100" height="11" fill="rgba(0,180,50,0.04)" />
      ))}

      {/* Lines */}
      <rect x="3" y="3" width="94" height="124" fill="none" stroke="#1e3a1e" strokeWidth="0.6" />
      <line x1="3" y1="65" x2="97" y2="65" stroke="#1e3a1e" strokeWidth="0.5" />
      <ellipse cx="50" cy="65" rx="14" ry="7" fill="none" stroke="#1e3a1e" strokeWidth="0.5" />
      <rect x="22" y="3" width="56" height="20" fill="none" stroke="#1e3a1e" strokeWidth="0.5" />
      <rect x="36" y="3" width="28" height="8" fill="none" stroke="#1e3a1e" strokeWidth="0.5" />
      <rect x="22" y="107" width="56" height="20" fill="none" stroke="#1e3a1e" strokeWidth="0.4" />
      <circle cx="50" cy="18" r="0.8" fill="#1e3a1e" />
      <circle cx="50" cy="65" r="0.8" fill="#1e3a1e" />

      {/* Opponent ghost dots (mirrored) */}
      {showOpponent && mirroredOpponent?.map((pos, i) => (
        <circle
          key={`opp-${i}`}
          cx={`${pos[0]}%`}
          cy={`${(pos[1] / 100) * 118 + 3}`}
          r="3%"
          fill={opponentColor ?? "#4fc3f7"}
          fillOpacity="0.25"
          stroke={opponentColor ?? "#4fc3f7"}
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
      ))}

      {/* Main team dots */}
      {positions.map((pos, i) => {
        const cx = `${pos[0]}%`;
        const cy = `${(pos[1] / 100) * 118 + 3}`;
        const isGK = i === 0;
        const prev = prevPositions?.[i];
        return (
          <g key={i}>
            {animating && prev && (
              <line
                x1={`${prev[0]}%`} y1={`${(prev[1] / 100) * 118 + 3}`}
                x2={cx} y2={cy}
                stroke={color} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2"
              />
            )}
            <circle
              cx={cx} cy={cy}
              r={isGK ? "4.5%" : "3.5%"}
              fill={color} fillOpacity={isGK ? 0.92 : 0.88}
              stroke={isGK ? "#fff" : color} strokeWidth={isGK ? "1.2" : "0"}
              style={{
                filter: `drop-shadow(0 0 3px ${color}66)`,
                transition: animating
                  ? `cx 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 35}ms, cy 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 35}ms`
                  : "none",
              }}
            />
            <text
              x={cx} y={cy}
              textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: "2.8%", fill: "#0a0c0a", fontFamily: "var(--font-mono)", fontWeight: 600, pointerEvents: "none", userSelect: "none" }}
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Formation label */}
      <text
        x="50" y="125" textAnchor="middle"
        style={{ fontSize: "4.5%", fill: color, fontFamily: "var(--font-mono)", fillOpacity: 0.85 }}
      >
        {formationLabel}
      </text>
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface FormationVisualizerProps {
  formationBefore: string;
  formationAfter: string;
  homeTeamColor?: string;
  opponentFormation?: string;
  opponentColor?: string;
  label?: string;
  mode?: "toggle" | "compare"; // toggle = single pitch flip; compare = side-by-side
}

export function FormationVisualizer({
  formationBefore,
  formationAfter,
  homeTeamColor = "#00e554",
  opponentFormation,
  opponentColor = "#4fc3f7",
  label,
  mode = "toggle",
}: FormationVisualizerProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [prevPositions, setPrevPositions] = useState<Position[] | null>(null);
  const [showOpponent, setShowOpponent] = useState(!!opponentFormation);
  const [viewMode, setViewMode] = useState<"toggle" | "compare">(mode);

  const beforeKey = normalizeFormation(formationBefore);
  const afterKey = normalizeFormation(formationAfter);
  const beforePositions = FORMATIONS[beforeKey] ?? FORMATIONS["4-4-2"];
  const afterPositions = FORMATIONS[afterKey] ?? FORMATIONS["4-4-2"];
  const opponentKey = opponentFormation ? normalizeFormation(opponentFormation) : null;
  const opponentPositions = opponentKey ? FORMATIONS[opponentKey] : undefined;

  const currentPositions = showAfter ? afterPositions : beforePositions;
  const currentFormationLabel = showAfter ? afterKey : beforeKey;

  const handleToggle = () => {
    setPrevPositions(currentPositions);
    setAnimating(true);
    setShowAfter((v) => !v);
    setTimeout(() => { setAnimating(false); setPrevPositions(null); }, 900);
  };

  // Auto-animate to "after" on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setPrevPositions(beforePositions);
      setAnimating(true);
      setShowAfter(true);
      setTimeout(() => { setAnimating(false); setPrevPositions(null); }, 900);
    }, 1100);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formationBefore, formationAfter]);

  return (
    <div style={{ background: "var(--pitch-dark)", border: "1px solid var(--pitch-line)", borderRadius: 4, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid var(--pitch-line)", padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--white-ghost)" }}>
            FORMATION {viewMode === "compare" ? "COMPARISON" : "SHIFT"}
          </span>
          {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--grass-dim)" }}>· {label}</span>}
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Compare / Toggle mode switch */}
          {opponentFormation && (
            <button
              onClick={() => setViewMode((v) => v === "toggle" ? "compare" : "toggle")}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em",
                padding: "3px 8px", borderRadius: 2, cursor: "pointer",
                background: viewMode === "compare" ? "rgba(79,195,247,0.12)" : "transparent",
                border: `1px solid ${viewMode === "compare" ? "rgba(79,195,247,0.3)" : "var(--pitch-faint)"}`,
                color: viewMode === "compare" ? "var(--blue-accent)" : "var(--white-ghost)",
                transition: "all 0.2s",
              }}
            >
              {viewMode === "compare" ? "◈ COMPARE" : "◇ COMPARE"}
            </button>
          )}

          {/* Opponent overlay toggle (toggle mode only) */}
          {opponentFormation && viewMode === "toggle" && (
            <button
              onClick={() => setShowOpponent((v) => !v)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em",
                padding: "3px 8px", borderRadius: 2, cursor: "pointer",
                background: showOpponent ? "rgba(79,195,247,0.1)" : "transparent",
                border: `1px solid ${showOpponent ? "rgba(79,195,247,0.25)" : "var(--pitch-faint)"}`,
                color: showOpponent ? "var(--blue-accent)" : "var(--white-ghost)",
                transition: "all 0.2s",
              }}
            >
              {showOpponent ? "● OPP" : "○ OPP"}
            </button>
          )}

          {/* Formation toggle (toggle mode only) */}
          {viewMode === "toggle" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: showAfter ? "var(--white-ghost)" : homeTeamColor, transition: "color 0.3s" }}>
                {beforeKey}
              </span>
              <button
                onClick={handleToggle}
                style={{
                  width: 38, height: 20, borderRadius: 10,
                  background: showAfter ? homeTeamColor : "var(--pitch-faint)",
                  border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s",
                }}
              >
                <span style={{
                  position: "absolute", top: 3, left: showAfter ? 20 : 3,
                  width: 14, height: 14, borderRadius: "50%",
                  background: showAfter ? "#0a0c0a" : "var(--white-ghost)",
                  transition: "left 0.3s",
                }} />
              </button>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: showAfter ? homeTeamColor : "var(--white-ghost)", transition: "color 0.3s" }}>
                {afterKey}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pitch(es) */}
      <div style={{ padding: "8px 12px 10px" }}>
        {viewMode === "compare" && opponentPositions ? (
          /* Side-by-side comparison */
          <div className="formation-compare-grid">
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: homeTeamColor, marginBottom: 4, textAlign: "center" }}>
                BEFORE · {beforeKey}
              </p>
              <PitchSVG
                positions={beforePositions}
                animating={false}
                color={homeTeamColor}
                formationLabel=""
                opponentPositions={opponentPositions}
                opponentColor={opponentColor}
                showOpponent
              />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: homeTeamColor, marginBottom: 4, textAlign: "center" }}>
                AFTER · {afterKey}
              </p>
              <PitchSVG
                positions={afterPositions}
                animating={false}
                color={homeTeamColor}
                formationLabel=""
                opponentPositions={opponentPositions}
                opponentColor={opponentColor}
                showOpponent
              />
            </div>
          </div>
        ) : (
          /* Single pitch toggle */
          <PitchSVG
            positions={currentPositions}
            prevPositions={prevPositions}
            animating={animating}
            color={homeTeamColor}
            formationLabel={currentFormationLabel}
            opponentPositions={opponentPositions}
            opponentColor={opponentColor}
            showOpponent={showOpponent}
          />
        )}
      </div>

      {/* Legend */}
      <div style={{ borderTop: "1px solid var(--pitch-line)", padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: homeTeamColor, opacity: 0.85 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.07em" }}>HOME</span>
          </div>
          {opponentFormation && (
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: opponentColor, opacity: 0.4 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--white-ghost)", letterSpacing: "0.07em" }}>AWAY (ghost)</span>
            </div>
          )}
        </div>
        {viewMode === "toggle" && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: showAfter ? homeTeamColor : "var(--white-ghost)", letterSpacing: "0.08em" }}>
            {showAfter ? "◈ NEW SHAPE" : "○ OLD SHAPE"}
          </span>
        )}
      </div>
    </div>
  );
}
