# TactiqAI ⬡
### *Understand Every Shift. Feel Every Moment.*

> **June 2026 IBM SkillsBuild Innovation Challenge** — Soccer, AI & the World Cup
> Submission deadline: June 30, 2026

---

## The Problem

Billions of people watch the same World Cup matches yet experience them completely differently — shaped by language, tactical knowledge, cultural context, and trust in decisions.

A 63rd-minute formation change can decide a semifinal. A VAR review can end a nation's tournament. But for most fans, these moments are opaque. They see the *what* — never the *why*.

**Tactical insight has always been the domain of experts. TactiqAI makes it accessible to everyone.**

---

## The Solution

TactiqAI is an AI-powered tactical explainer for World Cup matches. It takes any key moment — a formation shift, a goal, a substitution, a VAR decision — and explains *why it happened*, *what the coach was thinking*, and *how it changed the match*.

Explanations adapt in real time to the user's experience level:

| Level | Audience | Approach |
|---|---|---|
| **Casual** | New or emotional fan | Plain language, vivid analogies, no jargon |
| **Intermediate** | Regular watcher | Tactical terms + outcomes, positional context |
| **Expert** | Analyst or coach | Full depth — pressing triggers, spatial analysis, second-order effects |

### Core Features

- **Match Timeline** — Click any significant event to get an instant AI tactical breakdown
- **Formation Visualizer** — Animated SVG pitch showing player positions before/after any shape change, with opponent ghost overlay and side-by-side comparison mode
- **VAR Decision Reconstruction** — Step-by-step review timeline, FIFA law breakdown, audience-aware AI explanation, and common misconception panel
- **Demo Mode** — Full app experience without IBM credentials (mock responses per event type × audience level)
- **Mobile Responsive** — Full functionality on any screen size; explanation panel auto-scrolls into view on mobile after event selection

---


## Screenshots

### Match Selection

### Tactical Explanation — IBM Granite Analysis

### Formation Visualizer

### VAR Decision Reconstruction

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 14 Frontend                   │
│  Match Selector · Timeline · Formation Viz · VAR Panel  │
└────────────────────────┬────────────────────────────────┘
                         │ API Routes
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    /api/explain    /api/match     /api/var
          │                            │
          └──────────────┬─────────────┘
                         ▼
              ┌──────────────────────┐
              │  LangChain (JS)       │
              │  Prompt chains        │
              │  Output parsing       │
              └──────────┬───────────┘
                         ▼
              ┌──────────────────────┐
              │  IBM Granite 13B     │
              │  via watsonx.ai      │
              └──────────┬───────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   ┌─────────────┐             ┌───────────────────┐
   │   Docling   │             │  Context Forge    │
   │  Match PDFs │             │  MCP Gateway      │
   │  Rulebooks  │             │  Tool routing     │
   └─────────────┘             └───────────────────┘
```

---

## IBM Tools Used

| Tool | Version / Model | Role in TactiqAI |
|---|---|---|
| **IBM Granite** | `ibm/granite-13b-chat-v2` | Core LLM — generates all tactical and VAR explanations |
| **LangChain** | `@langchain/community ^0.2` | Prompt chain orchestration, structured output parsing, multi-chain routing |
| **Docling** | REST API | Converts match report PDFs and FIFA rulebooks to structured markdown for LLM context |
| **Context Forge** | MCP Gateway | Optional tool proxy for production deployment — routes LLM tool calls through MCP registry |

---

## Project Structure

```
tactiqai/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main UI — all three sections
│   │   ├── globals.css                 # Design system + responsive breakpoints
│   │   ├── layout.tsx                  # Root layout + font loading
│   │   └── api/
│   │       ├── explain/route.ts        # POST: match event → Granite explanation
│   │       ├── match/route.ts          # GET: match listing
│   │       └── var/route.ts            # POST: VAR decision → Granite explanation
│   ├── components/
│   │   ├── formation/
│   │   │   └── FormationVisualizer.tsx # Animated SVG pitch, toggle + compare modes
│   │   └── var/
│   │       └── VARExplainer.tsx        # VAR reconstruction + FIFA law panel
│   ├── hooks/
│   │   └── useMobile.ts               # Viewport width detection hook
│   ├── lib/
│   │   ├── granite/client.ts           # Granite + LangChain chains, mock fallback
│   │   ├── docling/ingest.ts           # Document ingestion module
│   │   └── data/demo-matches.ts        # World Cup match data + VAR decisions
│   └── types/index.ts                  # All TypeScript interfaces
├── .env.local.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Setup & Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn
- IBM watsonx.ai account (free trial at [dataplatform.cloud.ibm.com](https://dataplatform.cloud.ibm.com/))

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/tactiqai
cd tactiqai
npm install
```

### Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
GRANITE_MODEL_ID=ibm/granite-13b-chat-v2
```

> **No credentials?** The app runs in full demo mode — all features are accessible with realistic mock AI responses.

### Run

```bash
npm run dev
# Open http://localhost:3000

## Live Demo
https://tactiqai-hazel.vercel.app/
```

### Build for Production

```bash
npm run build
npm start
```

---

## How to Get IBM watsonx.ai Credentials

1. Go to [dataplatform.cloud.ibm.com](https://dataplatform.cloud.ibm.com/) and create a free account
2. Create a new **Project**
3. Go to **Manage → Access → API Keys** and generate an API key
4. Copy your **Project ID** from the project URL or settings
5. Paste both into `.env.local`

---

## Why It Matters

The World Cup is one of the most culturally shared events on Earth — 5+ billion viewers across 200+ countries. Yet:

- **Most fans never understand tactical decisions** — they see drama, not strategy
- **VAR erodes trust** when decisions aren't explained — fans feel cheated without context
- **Language and culture create unequal experiences** — English-language tactical coverage dominates

TactiqAI addresses all three:

- **Explainability** — every AI output shows structured reasoning (What / Why / Impact / Insight)
- **Transparency** — VAR reconstructions reference exact FIFA law clauses, review durations, and official names
- **Accessibility** — three audience levels mean a child and a UEFA B-license coach can both use the same tool

This is exactly what the challenge asks for: human-centered, explainable AI improving understanding, trust, and accessibility at global scale.

---

## Roadmap

**Built for this challenge:**
- [x] Tactical explanation engine (IBM Granite + LangChain, 3 audience levels)
- [x] Formation Visualizer — animated SVG, toggle + side-by-side compare modes
- [x] VAR Decision Reconstruction — step timeline, FIFA law panel, misconception callout
- [x] Mobile responsive layout with auto-scroll on event selection
- [x] Full demo mode — complete app experience without IBM credentials

**Post-challenge:**
- [ ] Live match data integration (StatsBomb / FIFA Official API)
- [ ] Multilingual explanations — Arabic, Spanish, French, Portuguese (Granite multilingual)
- [ ] Audio narration mode (text-to-speech via watsonx)
- [ ] Push notifications for key moments during live matches
- [ ] Coach/analyst export mode (PDF tactical reports)
- [ ] React Native mobile app

---

## Team

Built solo for the **June 2026 IBM SkillsBuild Innovation Challenge**

---

*TactiqAI is not affiliated with FIFA, the World Cup, or any football federation. Match data is fictional and used for demonstration purposes only.*
