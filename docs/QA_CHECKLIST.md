# TactiqAI — Pre-Submission QA Checklist
## Complete before June 30, 11:59 PM ET

---

## LOCAL BUILD

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts on port 3000
- [ ] `npm run build` completes without TypeScript errors
- [ ] No console errors on page load

---

## CORE FEATURES

### Match Selection
- [ ] Both demo matches render correctly
- [ ] Selecting a match highlights it with green border
- [ ] Score, flags, stage, venue all display correctly
- [ ] Switching matches resets timeline selection and explanation

### Audience Level
- [ ] Three level buttons render (Casual / Intermediate / Expert)
- [ ] Selecting a new level clears the current explanation
- [ ] Active level shows green highlight

### Timeline
- [ ] All events render for both matches
- [ ] Passive events (kickoff, halftime, fulltime) are dimmed and non-clickable
- [ ] VAR events show purple tint + VAR REVIEW badge
- [ ] Formation events show the before → after formation label
- [ ] Clicking an event highlights it with green border

### Explanation Panel
- [ ] Empty state shows "SELECT A MOMENT" placeholder
- [ ] Loading spinner shows while fetching
- [ ] Demo mode: mock response loads in ~900ms
- [ ] Demo mode: "DEMO MODE · MOCK RESPONSE" badge shows
- [ ] Structured sections render (WHAT CHANGED etc.) when present
- [ ] Timestamp + audience + moment type show at bottom
- [ ] Error state shows if API fails

### Formation Visualizer
- [ ] Appears when a formation_change or tactical_shift event is selected
- [ ] Before formation label shows correctly
- [ ] After formation label shows correctly
- [ ] Auto-animates to "after" shape ~1 second after appearing
- [ ] Toggle switch manually flips between shapes
- [ ] Player dots animate with spring motion per-player
- [ ] Opponent ghost overlay renders (faint blue dots)
- [ ] "OPP" button toggles opponent overlay
- [ ] "COMPARE" button switches to dual-pitch side-by-side view
- [ ] Both pitches render correctly in compare mode

### VAR Tab
- [ ] VAR tab activates only when selected match has VAR decisions
- [ ] France vs Morocco match shows VAR tab active
- [ ] Brazil vs England match shows VAR tab active
- [ ] VARExplainer renders: timeline steps, explanation, law panel
- [ ] All 4 timeline steps show with icons and descriptions
- [ ] Explanation updates when audience level changes
- [ ] "CONTROVERSIAL" amber badge shows on relevant decisions
- [ ] FIFA Law panel expands/collapses on click
- [ ] Full law text and misconception show when expanded
- [ ] Officials row shows on-field referee and VAR team names

---

## RESPONSIVE / MOBILE

- [ ] At 375px width: all content readable and usable
- [ ] At 375px: main grid is single column (timeline stacked above panel)
- [ ] At 375px: formation compare grid collapses to single column
- [ ] At 375px: IBM label hidden in header (space saving)
- [ ] At 375px: after clicking an event, page scrolls to explanation panel
- [ ] At 768px: layout transitions correctly
- [ ] At 1280px: two-column layout, sticky panel works

---

## GITHUB REPOSITORY

- [ ] Repository is public
- [ ] README.md renders correctly on GitHub
- [ ] Architecture diagram is readable
- [ ] Setup instructions are accurate — tested from a clean clone
- [ ] `.env.local` is in `.gitignore` (API key not committed!)
- [ ] `.env.local.example` is committed with placeholder values
- [ ] All source files committed (no missing files)

---

## SUBMISSION PLATFORM

- [ ] Project page created on challenge platform
- [ ] Project name: TactiqAI
- [ ] Tagline filled in
- [ ] Description pasted from SUBMISSION_COPY.md
- [ ] GitHub repo URL added
- [ ] Demo video URL added
- [ ] Team member(s) listed
- [ ] IBM tools checkboxes selected (Granite, LangChain, Docling, Context Forge)
- [ ] "Publish" clicked before June 30 at 11:59 PM ET

---

## VIDEO

- [ ] Video is ≤ 3 minutes
- [ ] Video is unlisted (not private) on YouTube or Vimeo
- [ ] Audio is clear
- [ ] App demo is legible at playback size
- [ ] All three key features shown: Timeline, Formation Viz, VAR
- [ ] Audience level switching demonstrated
- [ ] IBM tools mentioned by name

---

## FINAL CHECKS

- [ ] No console errors in production build
- [ ] No API keys committed to git (`git log --all -- .env.local` returns nothing)
- [ ] Submission platform "Publish" button clicked
- [ ] Confirmation email received from platform

---

**Deadline: June 30, 2026 at 11:59 PM Eastern Time**

Good luck. 🟢
