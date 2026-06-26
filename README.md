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

TactiqAI is an AI-powered tactical explainer for World Cup matches. It takes any key moment — a formation change, a goal, a substitution, a VAR decision — and explains *why it happened*, *what the coach was thinking*, and *how it changed the match*.

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
- **Demo Mode** — Full app experience without IBM credentials (mock responses per event type x audience level)
- **Mobile Responsive** — Full functionality on any screen size; explanation panel auto-scrolls into view on mobile after event selection

---

## Screenshots

### Match Selection
![Match Selection](public/screenshots/screenshot-1-matches.png)

### Tactical Explanation
![Tactical Explanation](public/screenshots/screenshot-2-explanation.png)

### Formation Visualizer
![Formation Visualizer](public/screenshots/screenshot-3-formation.png)

### VAR Decision Reconstruction
![VAR Decision](public/screenshots/screenshot-4-var.png)

---

## Architecture
---

## IBM Tools Used

| Tool | Version / Model | Role in TactiqAI |
|---|---|---|
| **IBM Granite** | ibm/granite-3-8b-instruct | Core LLM — generates all tactical and VAR explanations |
| **LangChain** | @langchain/community ^0.2 | Prompt chain orchestration, structured output parsing |
| **Docling** | REST API | Converts match report PDFs and FIFA rulebooks to structured markdown |
| **Context Forge** | MCP Gateway | Tool proxy for production deployment |

---

## Live Demo
---

## Setup & Running Locally

### Prerequisites
- Node.js 18+
- IBM watsonx.ai account (free trial at dataplatform.cloud.ibm.com)

### Installation

```bash
git clone https://github.com/ibcolla/tactiqai
cd tactiqai
npm install --legacy-peer-deps
```

### Environment Variables

```bash
cp .env.local.example .env.local
```

Edit .env.local with your credentials:
> No credentials? The app runs in full demo mode with realistic mock AI responses.

### Run

```bash
npm run dev
```

Open http://localhost:3000

---

## Roadmap

**Built for this challenge:**
- [x] Tactical explanation engine (IBM Granite + LangChain, 3 audience levels)
- [x] Formation Visualizer — animated SVG, toggle + side-by-side compare modes
- [x] VAR Decision Reconstruction — step timeline, FIFA law panel, misconception callout
- [x] Mobile responsive layout with auto-scroll on event selection
- [x] Full demo mode — complete app experience without IBM credentials
- [x] 3 demo matches — Quarterfinal, Semifinal, World Cup Final

**Post-challenge:**
- [ ] Live match data integration (StatsBomb / FIFA Official API)
- [ ] Multilingual explanations — Arabic, Spanish, French, Portuguese
- [ ] Audio narration mode (text-to-speech via watsonx)
- [ ] React Native mobile app

---

## Team

Built solo for the **June 2026 IBM SkillsBuild Innovation Challenge**

---

*TactiqAI is not affiliated with FIFA, the World Cup, or any football federation. Match data is fictional and used for demonstration purposes only.*
