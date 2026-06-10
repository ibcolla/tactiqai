# TactiqAI — Submission Page Copy
## IBM June 2026 Innovation Challenge Platform

Paste these fields directly into the project submission page.

---

### PROJECT NAME
TactiqAI

### TAGLINE (one sentence)
AI-powered tactical explainer that helps every World Cup fan understand why the game just changed.

---

### PROJECT DESCRIPTION (500 words max)

Billions of people watch the World Cup — but most fans never understand *why* the game changes. A 63rd-minute formation shift can decide a semifinal. A VAR decision can end a nation's tournament. Yet for most viewers, these moments remain opaque: they see the drama, never the reasoning behind it.

TactiqAI is an AI-powered tactical explainer that demystifies World Cup moments in real time. It takes any key event — a formation change, a goal, a substitution, a VAR review — and generates a clear, structured explanation of what happened, why the coach made the decision, and how it reshaped the match.

**The core innovation is audience-aware AI.** The same tactical moment produces three completely different explanations depending on who's asking:
- A casual fan gets plain language and vivid analogies — no jargon
- An intermediate fan gets tactical terms connected to visible outcomes
- An expert gets full analytical depth: pressing triggers, spatial analysis, second-order effects

This is built on IBM Granite 13B via watsonx.ai, orchestrated through LangChain with purpose-built prompt chains per audience level. Match report PDFs and FIFA rulebooks are ingested via Docling to give Granite rich contextual grounding. Context Forge provides MCP gateway routing for production-ready tool deployment.

Beyond tactical explanation, TactiqAI includes a **VAR Decision Reconstruction** module — one of the most trust-eroding aspects of modern soccer. For each VAR review, the app reconstructs the full decision timeline step by step, references the exact FIFA law clause applied, explains the 'clear and obvious error' intervention threshold, and corrects the most common fan misconceptions. All of this adapts to the chosen audience level.

A custom **Formation Visualizer** renders player positions on an SVG pitch, animating the transition between formations so fans can *see* exactly how the team shape changed — with opponent ghost positions overlaid for tactical context.

TactiqAI demonstrates how human-centered, explainable AI can improve understanding, trust, and accessibility for the world's most-watched sporting event — at global scale.

---

### PROBLEM STATEMENT (200 words max)

The World Cup reaches 5+ billion viewers across 200+ countries — yet tactical literacy remains the domain of a small expert minority. Most fans experience matches emotionally but not analytically. This gap creates three problems:

1. **Understanding**: Fans don't know why a coach made a decision, so they can't engage with the game's strategic depth.
2. **Trust**: VAR decisions feel arbitrary without explanation — eroding confidence in the sport's integrity.
3. **Inclusion**: Tactical coverage is primarily in English and assumes prior knowledge, excluding billions of fans globally.

TactiqAI uses explainable AI to close all three gaps simultaneously.

---

### AI/TECHNICAL APPROACH (300 words max)

**IBM Tools Used:**
- **IBM Granite 13B** (`ibm/granite-13b-chat-v2`) via watsonx.ai — core LLM for all explanation generation
- **LangChain** (`@langchain/community`) — three audience-specific prompt chains with structured output formatting (ChatPromptTemplate → WatsonxAI → StringOutputParser)
- **Docling** — converts match report PDFs and FIFA rulebook PDFs to structured markdown for LLM context enrichment
- **Context Forge** — MCP gateway proxy for tool routing in production deployment

**Prompt Architecture:**
Each audience level has a distinct system prompt specification. Casual prompts ban eight specific tactical terms and require analogy. Intermediate prompts mandate connecting every term to a visible outcome. Expert prompts require second-order effect analysis and PPDA reference where appropriate. Granite is instructed to output structured sections (WHAT CHANGED / WHY IT WAS DONE / THE IMPACT / THE INSIGHT), which the frontend parses and renders as separate panels.

**Robustness:**
The app includes a full demo mode — when IBM credentials are absent, high-quality mock responses are served per event type and audience level, with simulated latency. Every feature is accessible without credentials, making the demo immediately runnable by any judge.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Vercel deployment

---

### WHY IT MATTERS (150 words max)

The World Cup is one of the last truly global shared cultural moments. For three weeks, billions of people watch the same events — but their experience of those events is radically unequal, divided by language, knowledge, and access to expertise.

Explainable AI can change this. When a fan understands *why* France switched formations in the 63rd minute, they don't just follow the game — they're inside it. When a VAR decision is reconstructed step by step with the exact law applied, trust replaces frustration.

TactiqAI is a proof of concept for what human-centered AI looks like at global sporting scale: not replacing analysts or commentators, but democratizing the insight they carry — making the world's game genuinely understandable for the world.

---

### GITHUB REPOSITORY
https://github.com/YOUR_USERNAME/tactiqai

### DEMO VIDEO
[Paste YouTube/Vimeo unlisted link here]

---

### TEAM MEMBERS
[Your name + email]

### IBM TOOLS USED (check all that apply)
- [x] IBM Granite (LLMs, reasoning, agents)
- [x] LangChain / LangFlow (orchestration)
- [x] Docling (knowledge & data handling)
- [x] Context Forge (gateway, proxy, MCP Registry)
- [ ] IBM Bob (code assistant)

---

### TAGS / CATEGORIES (select on platform)
- Understanding & Explanation
- Trust & Transparency
- Fan & Learning Experiences
