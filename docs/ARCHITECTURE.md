# TactiqAI — Architecture Notes

## Data Flow

### Tactical Explanation (core flow)

```
User clicks event in timeline
        │
        ▼
page.tsx → handleExplain(eventIndex)
        │
        ▼
POST /api/explain
  { matchId, eventIndex, audienceLevel }
        │
        ▼
explain/route.ts
  1. Fetch match from demo-matches.ts
  2. Build rich match context string
     (prior events, formations, score, venue)
  3. Determine moment type:
     - formation_change / tactical_shift → explainTacticalMoment()
     - goal / substitution → analyzeMomentumShift()
     - other → explainTacticalMoment()
        │
        ▼
granite/client.ts
  isConfigured()?
    YES → WatsonxAI + LangChain chain → IBM Granite 13B
    NO  → getMockResponse(momentType, audienceLevel)
        │
        ▼
Return TacticalExplanation { explanation, source, ... }
        │
        ▼
page.tsx renders ExplanationPanel
  - Parses **SECTION** headers into structured panels
  - Shows FormationVisualizer if event has formation data
  - Shows DEMO MODE / IBM GRANITE badge
```

### VAR Explanation

```
User opens VAR tab → VARExplainer renders pre-built decision
  - Decision data includes explanation[casual|intermediate|expert]
  - Switching audience level re-renders with correct explanation
  - /api/var available for live Granite calls with credentials
```

## Prompt Engineering

Three audience-level system prompt specs in granite/client.ts:

- Casual: bans 8 specific tactical terms, requires analogy, ends "what a fan could say at the pub"
- Intermediate: requires connecting every term to a visible outcome, reference specific positions
- Expert: mandates second-order effects, can reference elite teams, PPDA, pressing triggers

Granite outputs structured sections via format instruction:
  **WHAT CHANGED** / **WHY IT WAS DONE** / **THE IMPACT** / **THE INSIGHT**
ExplanationText in page.tsx parses these into separate UI panels.

## Mock Mode

When WATSONX_API_KEY is absent:
- isConfigured() returns false
- Each chain function awaits 900ms simulated delay
- Returns getMockResponse(momentType, audienceLevel) from MOCK_RESPONSES map
- Response includes source: "mock" — UI shows "DEMO MODE" badge

## Formation Visualizer

- 8 formations stored as [x%, y%] arrays for 11 player positions
- normalizeFormation() fuzzy-matches any string to a known key
- Spring animation via CSS transition on cx/cy with per-player stagger delay
- compare mode renders two PitchSVG components side by side
- Opponent ghost dots mirrored: y_mirrored = 100 - y + 8
- Auto-animates before → after on mount at 1.1s

## Responsive Layout

CSS classes in globals.css handle all breakpoints:
- main-grid: 2-col desktop, 1-col mobile (768px)
- match-grid: auto-fit minmax(300px, 1fr)
- formation-compare-grid: 2-col, 1-col at 768px
- sticky-panel: sticky desktop, static mobile
- useMobile() hook triggers scroll-to-panel on mobile after explanation loads
