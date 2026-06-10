# TactiqAI — Demo Video Script
## IBM June 2026 Innovation Challenge | 3 Minutes

---

### TIMING GUIDE
- Intro + hook: 0:00–0:25
- Problem: 0:25–0:50
- Solution overview: 0:50–1:20
- Live demo — Timeline: 1:20–2:00
- Live demo — VAR + Formation: 2:00–2:35
- IBM tools + architecture: 2:35–2:50
- Close: 2:50–3:00

---

### SCRIPT

---

**[0:00 – OPEN ON APP — hero section visible, pitch grid background]**

**NARRATION:**
"It's the 63rd minute of a World Cup semifinal.
The coach makes a substitution. The formation changes.
And suddenly, everything shifts.

The fans feel it. But almost none of them know *why*."

*[Pause. Let the app sit on screen.]*

"This is TactiqAI."

---

**[0:25 – CUT TO: simple split — crowds in stadium / phone screen with confusing tactics graphic]**

**NARRATION:**
"Five billion people watch the World Cup.
But tactical understanding — *why* a press worked, *why* VAR made that call, *why* a substitution changed the game — has always been locked behind expertise.

Casual fans are left out. Trust breaks down.
The most watched event on Earth is also one of the least understood."

---

**[0:50 – BACK TO APP — show match selection]**

**NARRATION:**
"TactiqAI solves this with explainable, human-centered AI.

Select any World Cup match.
Choose your experience level — Casual, Intermediate, or Expert.
Then click any moment in the match timeline."

*[Click on the France vs Morocco match card]*

*[Click "Casual" audience level]*

---

**[1:05 – CLICK: 63rd minute formation change event]**

**NARRATION:**
"Here — France's 63rd-minute shift to a high-press 4-3-3.

IBM Granite, orchestrated through LangChain, generates a tactical breakdown in seconds —
adapted for the audience level chosen."

*[Explanation panel loads — show structured sections: WHAT CHANGED / WHY IT WAS DONE / THE IMPACT / THE INSIGHT]*

"For a casual fan: plain language, a vivid analogy, no jargon.
Switch to Expert —"

*[Click "Expert"]*
*[Click the same event again — explanation reloads]*

"— and the same moment gets full tactical depth.
Pressing triggers. Spatial analysis. Second-order effects."

---

**[1:40 – SCROLL DOWN — Formation Visualizer animates]**

**NARRATION:**
"Below the explanation, the Formation Visualizer shows exactly what changed on the pitch.

Watch the players animate from the old shape into the new one —"

*[Toggle the formation switch — dots move]*

"Toggle between before and after.
Enable Compare mode to see both shapes side by side, with the opponent's positions overlaid as ghost dots."

*[Click Compare button — dual pitch appears]*

---

**[2:00 – CLICK: VAR tab]**

**NARRATION:**
"Now the VAR tab."

*[Click VAR tab — VARExplainer loads]*

"One of the most controversial moments in the Brazil-England match —
an 87-second handball review that divided fans worldwide.

TactiqAI reconstructs the entire decision step by step:
the incident, the review initiation, the duration, the outcome."

*[Scroll to show timeline steps animated — then the explanation block]*

"Granite explains the exact FIFA Law 12 criteria the officials applied.
Switch audience levels —"

*[Click Intermediate]*

"— and the same decision is explained differently.
Expand the law panel to see the exact rule text, and the most common misconception fans have about it."

*[Click the FIFA Law toggle to expand]*

---

**[2:35 – CUT TO: simple diagram or the architecture in README]*

**NARRATION:**
"Under the hood:

IBM Granite 13B via watsonx.ai powers every explanation.
LangChain orchestrates three distinct prompt chains — one per audience level —
with structured output formatting parsed in real time.

Docling ingests match reports and FIFA rulebooks to build rich LLM context.
Context Forge provides MCP gateway routing for production deployment.

The app also ships with full demo mode — every feature works without credentials,
so it's immediately testable by anyone."

---

**[2:50 – BACK TO APP HERO]*

**NARRATION:**
"The World Cup happens once every four years.
For three weeks, the whole world is watching the same moments.

TactiqAI makes sure they understand them.

IBM Granite. LangChain. Docling. Context Forge.
Human-centered, explainable AI — inside the match."

*[Hold on app. Fade.]*

---

### SCREEN RECORDING CHECKLIST

Before recording:
- [ ] Run `npm run dev` — confirm app loads clean
- [ ] Test casual explanation on 63' formation change — confirm mock response loads
- [ ] Test expert explanation — confirm different text
- [ ] Test VAR tab on Brazil vs England — confirm all 4 timeline steps show
- [ ] Test Compare mode on formation visualizer — confirm dual pitch
- [ ] Set browser zoom to 100%, window to 1280×800
- [ ] Use a quiet room and external mic if possible
- [ ] Record at 1080p minimum

Post-production:
- [ ] Add background music (ambient, not distracting — e.g. lo-fi instrumental)
- [ ] Add captions for accessibility
- [ ] Trim silence at start/end
- [ ] Export at ≤ 500MB, MP4 format
- [ ] Upload to YouTube (unlisted) or Vimeo and paste link on submission page

---

### TIPS FOR DELIVERY

- Speak at 80% of your normal pace — demos always feel faster to the presenter than the viewer
- Pause 1 full second after each click before narrating — let the UI breathe
- If the mock AI response is long, don't read it all — just gesture to the structured sections
- The Formation Visualizer animation is your visual anchor — let it play fully before moving on
- End on the hero title full-screen — it's a strong visual closer
