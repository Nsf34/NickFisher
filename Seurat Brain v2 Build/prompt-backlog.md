# Prompt Backlog — Seurat Brain v2 Digestion & Build

**Created:** 2026-03-09
**Purpose:** Your operational queue. Open this, find the next unchecked item, paste the prompt, run it.
**Companion doc:** `seurat-brain-v2-build-playbook_new.md` (full specs, templates, architecture)
**Digestion detail:** `seurat-brain-v2/_build/expanded-digestion-plan.md` (per-client breakdown)

---

## How to Use This File

1. Find the next `⬜` item in the queue below
2. Copy the prompt template, fill in `[CLIENT NAME]`
3. Paste into a Claude Code session pointed at `seurat-brain-v2/`
4. When done, change `⬜` to `✅` and note the date
5. Hit quality gates when you reach them — don't skip

**Parallel sessions:** You can run up to 4 Claude Code windows simultaneously.
- Only ONE window can run `extract` at a time (SQLite lock)
- Stagger extractions ~3-5 min apart
- Synthesis (reading .md files, writing profiles) is parallel-safe
- Pattern: Window 1 extracts → Window 2-4 synthesize → rotate

---

## Quick Reference

**Brain root:** `C:\Users\NickFisher\Dropbox (Personal)\Nick's Personal Dropbox (Nickfisher518@gmail.com)\seurat-brain-v2\`
**Scripts dir:** `seurat-brain-v2\_scripts\`
**Registry:** `seurat-brain-v2\_scripts\output\content_registry.db`

**Key commands:**
```
python digestion_engine.py extract --client "X" --finals-only     # Pass 1: v1.0+ deliverables
python digestion_engine.py extract --client "X" --latest-only     # Pass 2: all remaining highest-version
python digestion_engine.py status --client "X"                    # Check extraction state
python digestion_engine.py scan --changed-only                    # Detect new/modified files
```

**Completion checklist (every client must pass before marking ✅):**
- [ ] All v1.0+ deliverables extracted and synthesized
- [ ] Every project represented in profile
- [ ] Stakeholder map complete
- [ ] Methods documented per project
- [ ] Key findings specific and actionable
- [ ] Patterns/lessons captured with provenance
- [ ] BD signals noted
- [ ] Theme connections established
- [ ] "Could someone pick up this client tomorrow?" = YES

---

## Prompt Templates

### TEMPLATE A: Deep Digestion (new client, never profiled)

```
Read _build/CONTEXT.md for project context.
⚠️ WRITE CHECK: Verify your working directory is seurat-brain-v2 (not seurat-brain). All writes go to v2 only.
Read _build/decisions.md — last 50 lines for current state.
Read knowledge/patterns.md — note current P## count. Start from NEXT available number.
Read knowledge/lessons.md — note current L## count. Start from NEXT available number.

YOUR TASK: Exhaustive digestion of [CLIENT NAME]. Extract EVERYTHING of use.

═══ PHASE 1: EXTRACT ALL FINALS ═══
cd "C:\Users\NickFisher\Dropbox (Personal)\Nick's Personal Dropbox (Nickfisher518@gmail.com)\seurat-brain-v2\_scripts"
python digestion_engine.py extract --client "[CLIENT NAME]" --finals-only

This extracts ALL v1.0+ deliverables — the actual client-facing work product.
Report: how many files extracted, word counts, content depth distribution.

═══ PHASE 2: READ + SYNTHESIZE FINALS ═══
Read ALL extract files in _scripts/output/extracts/[client]/.
Read clients/[client-name].md (existing profile, if any).

For EVERY project found in the extracts:
- Project name, number, dates, scope, strategic question
- Methods used (quant, qual, discovery, etc.)
- Key findings — SPECIFIC insights, not summaries of summaries
- Deliverable type and content (what was the WS1 about? WS2? Final?)
- Client stakeholders and Seurat team (from contributor initials + doc properties)
- What made this engagement distinctive vs. standard projects of this type?

═══ PHASE 3: EXTRACT REMAINING FILES ═══
python digestion_engine.py extract --client "[CLIENT NAME]" --latest-only

This gets highest-version of everything else: internal docs, selling materials,
inputs, discovery, fieldwork specs, draft-only files. Do NOT use --limit.

═══ PHASE 4: ENRICH WITH INTERNAL DOCS ═══
Read the new extracts. These often reveal:
- Selling approach (how we won the business — BD intelligence)
- Input review findings (what the client shared, what we learned from their data)
- Internal discussions (comments, meeting notes, email summaries)
- Discovery insights (competitive landscape, consumer research)
- Survey instruments and fieldwork details

═══ PHASE 5: WRITE ═══
ENRICH clients/[client-name].md — full project-level detail for EVERY project.
  Structure: Company → Relationship → Projects (each with scope, methods, findings,
  outcome, team) → Stakeholders → Strategic Context → What We've Learned → Themes
ADD new patterns to knowledge/patterns.md (NEXT AVAILABLE P##)
ADD new lessons to knowledge/lessons.md (NEXT AVAILABLE L##)
ADD survey patterns if survey content found
UPDATE intelligence/themes/*.md with evidence where relevant
ADD BD signals to bd/selling-playbook.md
LOG session to _build/decisions.md including extraction stats

═══ PHASE 6: COMPLETION CHECK ═══
Before marking this client as done, verify:
- [ ] All v1.0+ deliverables extracted and synthesized
- [ ] Every project represented in profile
- [ ] Stakeholder map complete
- [ ] Methods documented per project
- [ ] Key findings are specific and actionable
- [ ] Patterns/lessons captured with provenance
- [ ] BD signals noted
- [ ] Theme connections established
- [ ] "Could someone pick up this client tomorrow?" = YES

Report: extraction coverage, projects found, patterns added, lessons added, any gaps.
```

---

### TEMPLATE B: Depth Pass (previously profiled at <15% coverage)

```
Read _build/CONTEXT.md for project context.
⚠️ WRITE CHECK: Verify your working directory is seurat-brain-v2 (not seurat-brain). All writes go to v2 only.
Read _build/decisions.md — last 50 lines for current state.
Read knowledge/patterns.md — note current P## count.
Read knowledge/lessons.md — note current L## count.

YOUR TASK: Depth pass on [CLIENT NAME]. This client was previously profiled with
--limit 30 extraction (~[X]% coverage). Extract everything remaining.

STEP 1 — Check current state:
cd "C:\Users\NickFisher\Dropbox (Personal)\Nick's Personal Dropbox (Nickfisher518@gmail.com)\seurat-brain-v2\_scripts"
python digestion_engine.py status --client "[CLIENT NAME]"
Read clients/[client-name].md (current profile).

STEP 2 — Extract all remaining finals:
python digestion_engine.py extract --client "[CLIENT NAME]" --finals-only

STEP 3 — Extract all remaining latest versions:
python digestion_engine.py extract --client "[CLIENT NAME]" --latest-only

STEP 4 — Read ALL new extracts and compare against existing profile:
- Which projects are missing from the profile?
- Which projects have richer detail now?
- What internal docs reveal that deliverables didn't?

STEP 5 — Enrich profile + add patterns/lessons/BD signals.
Use the same write targets and completion checklist as Template A.

Report: old coverage → new coverage, projects added/enriched, new patterns/lessons.
```

---

### TEMPLATE C: Cross-Client Synthesis (run after completing a tier)

```
Read _build/CONTEXT.md for project context.
⚠️ WRITE CHECK: Verify your working directory is seurat-brain-v2 (not seurat-brain). All writes go to v2 only.
Read _build/decisions.md — ALL entries from recent digestion sessions.

YOUR TASK: Cross-client synthesis across all recently digested clients.

Read ALL client profiles in clients/ (every .md file).
Read knowledge/patterns.md (full file).
Read knowledge/lessons.md (full file).
Read knowledge/survey-patterns.md.
Read all intelligence/themes/*.md files.
Read bd/selling-playbook.md.

Perform cross-client analysis:
1. Which patterns now have 5+ client evidence points? Upgrade confidence to "strong."
2. Are there NEW patterns visible only when looking across multiple clients?
3. Are there thematic clusters forming that don't yet have theme hub files? Create new hubs.
4. Are there common methods across clients that should strengthen process docs?
5. Are there BD signals that suggest new selling areas or re-sell patterns?
6. SURVEY PATTERNS: Cross-reference survey content found across clients.
7. NUMBERING CHECK: Verify patterns.md has sequential P1-P[N], no gaps/duplicates.
   Verify lessons.md has sequential L1-L[N], no gaps/duplicates. Fix any issues.
8. FILE SIZE CHECK: Flag any knowledge file exceeding 15KB. Propose split if found.

Present synthesis separately from any individual updates.
Write: _build/cross-client-synthesis-[date].md
```

---

### TEMPLATE D: BD/Tiny Bulk Classification

```
Read _build/CONTEXT.md for project context.
⚠️ WRITE CHECK: Verify your working directory is seurat-brain-v2 (not seurat-brain). All writes go to v2 only.
Read _build/decisions.md — last 50 lines.

YOUR TASK: Bulk classify ~190 Dropbox client folders ([A-L] or [M-Z]) with <100 files each.

For each folder, query the content registry:
cd "C:\Users\NickFisher\Dropbox (Personal)\Nick's Personal Dropbox (Nickfisher518@gmail.com)\seurat-brain-v2\_scripts"
python -c "import sqlite3; c=sqlite3.connect('output/content_registry.db'); r=c.execute('SELECT COUNT(*), COUNT(DISTINCT project) FROM files WHERE client=?',('[Folder Name]',)).fetchone(); print(f'Files: {r[0]}, Projects: {r[1]}')"

Classify each as:
- "REAL ENGAGEMENT" (has project folders, deliverables) → Extract --limit 10, create minimal profile
- "BD ATTEMPT" (selling materials, proposals, no project work) → Note in bd/selling-playbook.md
- "SKIP" (empty, test, or irrelevant) → No action

Output: Update clients/_index.md with classification for each folder.
Log: _build/decisions.md with counts per classification.
```

---

### TEMPLATE E: Quality Gate

```
Read _build/CONTEXT.md.
⚠️ WRITE CHECK: Verify your working directory is seurat-brain-v2 (not seurat-brain). All writes go to v2 only.
Read _build/decisions.md — review ALL entries from the completed tier.

YOUR TASK: Quality gate for [TIER NAME] completion.

1. Digestion engine status:
   cd "C:\Users\NickFisher\Dropbox (Personal)\Nick's Personal Dropbox (Nickfisher518@gmail.com)\seurat-brain-v2\_scripts"
   python digestion_engine.py status
   Verify all tier clients show expected extraction coverage.

2. Client profile review — for each client in this tier:
   - Are project summaries grounded in extracted content (not hallucinated)?
   - Are cross-references to patterns, lessons, and themes valid?
   - Are temporal markers present?
   - Is provenance noted?

3. Pattern/lesson integrity:
   - Read patterns.md — sequential P1-P[N], no gaps/duplicates?
   - Read lessons.md — sequential L1-L[N], no gaps/duplicates?
   - New evidence properly attributed?

4. Theme hub review:
   - All "Connected Clients" entries have profiles?
   - "Key Insights" are Seurat-specific (not generic)?
   - Cross-references valid?

5. Survey patterns (if applicable):
   - Properly formatted with source attribution?
   - Scales consistent?

6. File size check: Flag any file >15KB.

7. Retrieval tests:
   | Query | Expected |
   |-------|----------|
   | "What do we know about [biggest client in tier]?" | Finds profile, projects, themes |
   | "Which clients have done [common project type]?" | Cross-references correctly |
   | "What patterns emerged from [tier]?" | Cites new patterns with evidence |

Write: _build/quality-gate-[tier]-[date].md
```

---

## THE QUEUE

### TIER A — Active Clients (revenue-generating NOW)

**Previously profiled (need depth passes) — use Template B:**

| # | Status | Client | Total Files | Finals | Prior Coverage | Template | Date Done |
|---|--------|--------|-------------|--------|----------------|----------|-----------|
| A1 | ⬜ | BellRing Brands | 15,258 | 246 | 0.1% (8 files) | B — depth pass | |
| A2 | ⬜ | Honest Company | 2,319 | 39 | 1.7% (30 files) | B — depth pass | |
| A3 | ⬜ | Henkel | 1,838 | 1 | 4.2% (68 files) | B — depth pass | |
| A4 | ⬜ | Bolton Group | 1,331 | 27 | 2.6% (29 files) | B — depth pass | |
| A5 | ⬜ | Nielsen-Massey | 614 | 0 | 9.0% (26 files) | B — depth pass | |
| A6 | ⬜ | Merck | 233 | 0 | 12.1% (28 files) | B — depth pass | |
| A7 | ⬜ | S&S Activewear | 604 | 36 | 0% | B — depth pass | |
| A8 | ⬜ | CA Milk Advisory Board | 336 | 14 | 0% | B — depth pass | |

**Not yet profiled — use Template A:**

| # | Status | Client | Total Files | Finals | Projects | Template | Date Done |
|---|--------|--------|-------------|--------|----------|----------|-----------|
| A9 | ⬜ | Nestle Purina | 6,159 | 220 | 33 | A — deep digestion | |
| A10 | ⬜ | Agriculture Capital | 9,330 | 190 | 1 | A — deep digestion | |
| A11 | ⬜ | Koki Holdings | 972 | 39 | 5 | A — deep digestion | |
| A12 | ⬜ | Parmigiano Reggiano | 877 | 42 | 2 | A — deep digestion | |
| A13 | ⬜ | Sakura | 750 | 27 | 4 | A — deep digestion | |

---

### ⛳ QUALITY GATE — Tier A Complete

| # | Status | Task | Template | Date Done |
|---|--------|------|----------|-----------|
| QG-A | ⬜ | Cross-client synthesis (active clients) | C — synthesis | |
| QG-A2 | ⬜ | Quality gate validation | E — quality gate | |

---

### TIER B — Recent/Batch Clients with 1000+ Files (high re-sell value)

**Batch 1-2 clients needing depth passes — use Template B:**

| # | Status | Client | Total Files | Finals | Prior Coverage | Template | Date Done |
|---|--------|--------|-------------|--------|----------------|----------|-----------|
| B1 | ⬜ | Pepsi | 20,486 | 649 | 0.2% (~45 extracted) | B — depth pass | |
| B2 | ⬜ | Campbell's | 9,178 | 246 | ~1.7% (~154 extracted) | B — depth pass | |
| B3 | ⬜ | 3M | 8,858 | 321 | 0.4% (~30 extracted) | B — depth pass | |
| B4 | ⬜ | Hershey | 7,972 | 143 | ~0.5% (~41 extracted) | B — depth pass | |
| B5 | ⬜ | Church & Dwight | 7,434 | 112 | ~0.4% (~30 extracted) | B — depth pass | |
| B6 | ⬜ | Clorox | 7,331 | 67 | 0.6% (~212 extracted) | B — depth pass | |
| B7 | ⬜ | Constellation | 6,114 | 188 | ~0.5% (~30 extracted) | B — depth pass | |
| B8 | ⬜ | Ocean Spray | 3,582 | 99 | 1.0% (~30 extracted) | B — depth pass | |
| B9 | ⬜ | Kraft | 2,654 | 139 | ~1.1% (~30 extracted) | B — depth pass | |
| B10 | ⬜ | Mars | 1,071 | 29 | ~2.8% (~30 extracted) | B — depth pass | |

**Recent data-rich clients (never profiled) — use Template A:**

| # | Status | Client | Total Files | Finals | Projects | Template | Date Done |
|---|--------|--------|-------------|--------|----------|----------|-----------|
| B11 | ⬜ | Tillamook | 6,913 | 194 | 9 | A — deep digestion | |
| B12 | ⬜ | Unilever | 6,772 | 270 | 6 | A — deep digestion | |
| B13 | ⬜ | Yerba Madre | 4,905 | 189 | 6 | A — deep digestion | |
| B14 | ⬜ | Wellness Pet Co | 3,233 | 131 | 9 | A — deep digestion | |
| B15 | ⬜ | Banza | 2,976 | 211 | 6 | A — deep digestion | |
| B16 | ⬜ | Danone | 2,752 | 128 | 4 | A — deep digestion | |
| B17 | ⬜ | Harmless Harvest | 2,572 | 138 | 4 | A — deep digestion | |
| B18 | ⬜ | Mondelez | 1,889 | 73 | 3 | A — deep digestion | |
| B19 | ⬜ | Jack Link's | 1,777 | 37 | 2 | A — deep digestion | |
| B20 | ⬜ | Unreal Snacks | 1,583 | 120 | 4 | A — deep digestion | |
| B21 | ⬜ | Heartland Foods | 1,583 | 90 | 5 | A — deep digestion | |
| B22 | ⬜ | Nature Fresh Farms | 1,531 | 119 | 2 | A — deep digestion | |
| B23 | ⬜ | Melissa and Doug | 1,486 | 94 | 2 | A — deep digestion | |
| B24 | ⬜ | ByHeart | 1,316 | 139 | 12 | A — deep digestion | |
| B25 | ⬜ | GNC | 1,245 | 114 | 1 | A — deep digestion | |
| B26 | ⬜ | Upward Farms | 1,177 | 75 | 3 | A — deep digestion | |
| B27 | ⬜ | Beauty By Imagination | 1,108 | 51 | 1 | A — deep digestion | |
| B28 | ⬜ | So Good So You | 1,098 | 94 | 2 | A — deep digestion | |
| B29 | ⬜ | Daiya | 1,049 | 106 | 2 | A — deep digestion | |
| B30 | ⬜ | Hilton | 1,041 | 81 | 2 | A — deep digestion | |
| B31 | ⬜ | Materne | 1,003 | 109 | 5 | A — deep digestion | |

**Batch-friendly 1000+ file clients (can pair 2-3 per session):**

| # | Status | Client | Total Files | Finals | Projects | Template | Date Done |
|---|--------|--------|-------------|--------|----------|----------|-----------|
| B32 | ⬜ | Tropicana | 360 | 0 | 2 | B — depth pass (~29 extracted) | |
| B33 | ⬜ | Gallo | 398 | 0 | 2 | B — depth pass (~52 extracted) | |
| B34 | ⬜ | Elida Beauty | 388 | 2 | 1 | B — depth pass (~30 extracted) | |

---

### ⛳ QUALITY GATE — Tier B Complete

| # | Status | Task | Template | Date Done |
|---|--------|------|----------|-----------|
| QG-B | ⬜ | Cross-client synthesis (Tier A + B combined) | C — synthesis | |
| QG-B2 | ⬜ | Quality gate validation | E — quality gate | |

---

### TIER C — Lapsed Clients with 3000+ Files (historical/methodology gold)

All use Template A (deep digestion). These have never been profiled.

| # | Status | Client | Total Files | Finals | Projects | Notes | Date Done |
|---|--------|--------|-------------|--------|----------|-------|-----------|
| C1 | ⬜ | GMI | 21,775 | 695 | 8 | Massive — unknown to old plan | |
| C2 | ⬜ | Rich's | 13,351 | 382 | 28 | 28 projects, rich history | |
| C3 | ⬜ | Harman | 8,127 | 299 | 51 | 51 projects — methodology gold | |
| C4 | ⬜ | Sabra | 7,969 | 80 | 5 | Large engagement | |
| C5 | ⬜ | Arbor | 7,528 | 329 | 2 | Active through 2021 | |
| C6 | ⬜ | Boehringer AH | 7,354 | 441 | 42 | 42 projects — methodology gold | |
| C7 | ⬜ | Post | 6,399 | 267 | 3 | Large CPG lapsed | |
| C8 | ⬜ | Nestle (non-Purina) | 6,159 | 220 | 33 | May overlap with A9 Purina | |
| C9 | ⬜ | Dean Foods | 4,329 | 53 | 6 | Old but data-rich | |
| C10 | ⬜ | Lamb Weston | 4,286 | 334 | 9 | Foodservice | |
| C11 | ⬜ | Wakefern | 3,782 | 145 | 4 | Retail | |
| C12 | ⬜ | Diamond Foods | 3,381 | 255 | 10 | | |
| C13 | ⬜ | Elmers | 3,305 | 82 | 46 | 46 projects! | |
| C14 | ⬜ | Interbake Foods | 3,237 | 14 | 4 | | |
| C15 | ⬜ | Wellness Pet Co | 3,233 | 131 | 9 | (if not already done in B14) | |
| C16 | ⬜ | Hain | 3,172 | 164 | 7 | Natural/organic | |
| C17 | ⬜ | LEGO | 3,149 | 179 | 10 | Non-CPG, rich | |
| C18 | ⬜ | Glanbia | 3,114 | 191 | 7 | Nutrition/cheese | |
| C19 | ⬜ | Chicago Cubs | 2,872 | 234 | 8 | Non-CPG | |
| C20 | ⬜ | Califia | 2,705 | 32 | 3 | | |
| C21 | ⬜ | Boehringer | 2,548 | 96 | 18 | (related to C6?) | |
| C22 | ⬜ | Beiersdorf | 2,438 | 110 | 5 | | |
| C23 | ⬜ | Cora | 2,351 | 13 | 3 | | |
| C24 | ⬜ | Petco | 1,628 | 154 | 6 | Retail/pet | |
| C25 | ⬜ | Del Monte | 1,666 | 22 | 4 | | |
| C26 | ⬜ | Saputo | 1,435 | 86 | 7 | | |
| C27 | ⬜ | Diamond Baking | 1,351 | 108 | 6 | | |
| C28 | ⬜ | Curation Foods | 1,294 | 91 | 20 | 20 projects | |
| C29 | ⬜ | ConAgra | 1,181 | 96 | 3 | | |
| C30 | ⬜ | Bel Brands | 1,067 | 56 | 36 | 36 projects | |
| C31 | ⬜ | Bowery Farming | 1,767 | 73 | 3 | | |
| C32 | ⬜ | Clif Bar | 983 | 84 | 4 | | |
| C33 | ⬜ | Perrigo | 930 | 47 | 2 | | |

---

### ⛳ QUALITY GATE — Tier C Complete

| # | Status | Task | Template | Date Done |
|---|--------|------|----------|-----------|
| QG-C | ⬜ | Cross-client synthesis (all tiers A+B+C) | C — synthesis | |
| QG-C2 | ⬜ | Quality gate validation | E — quality gate | |

---

### TIER D — Mid-Tier Clients (100-999 files, not yet in any queue)

Batch-friendly. Group 2-4 per session using Template A (smaller ones) or B (if any were previously touched).

| # | Status | Client | Files | Extractable | Projects | Date Done |
|---|--------|--------|-------|-------------|----------|-----------|
| D1 | ⬜ | Sodexo | 874 | 79 | 3 | |
| D2 | ⬜ | Novus Foods | 857 | 127 | 2 | |
| D3 | ⬜ | Magic Spoon | 803 | 60 | 4 | |
| D4 | ⬜ | Hofseth | 791 | 77 | 20 | |
| D5 | ⬜ | Spring Foods | 750 | 70 | 3 | |
| D6 | ⬜ | Counter Culture Coffee | 727 | 60 | 3 | |
| D7 | ⬜ | Stella Rising | 710 | 17 | 3 | |
| D8 | ⬜ | Treehouse Foods | 705 | 15 | 8 | |
| D9 | ⬜ | John B. Sanfilippo & Son | 676 | 87 | 3 | |
| D10 | ⬜ | Cox Farms | 663 | 77 | 3 | |
| D11 | ⬜ | Healthy Cell | 640 | 72 | 2 | |
| D12 | ⬜ | Zunda | 620 | 54 | 7 | |
| D13 | ⬜ | Beautycounter | 599 | 57 | 3 | |
| D14 | ⬜ | Apple and Eve | 579 | 74 | 9 | |
| D15 | ⬜ | Naturvet | 530 | 51 | 1 | |
| D16 | ⬜ | MIXT | 493 | 25 | 7 | |
| D17 | ⬜ | Masco | 492 | 50 | 8 | |
| D18 | ⬜ | Elliott Investment Management | 483 | 18 | 1 | |
| D19 | ⬜ | Fishs Eddy | 469 | 18 | 2 | |
| D20 | ⬜ | Guitar Center | 454 | 188 | 9 | |
| D21 | ⬜ | Campari | 424 | 33 | 3 | |
| D22 | ⬜ | Chobani | 422 | 48 | 12 | |
| D23 | ⬜ | Arable Capital | 417 | 25 | 2 | |
| D24 | ⬜ | Patagonia | 377 | 23 | 2 | |
| D25 | ⬜ | Coty | 375 | 4 | 0 | |
| D26 | ⬜ | Colgate | 359 | 15 | 6 | |
| D27 | ⬜ | Outerwall | 351 | 18 | 10 | |
| D28 | ⬜ | Paramount Global | 309 | 26 | 1 | |
| D29 | ⬜ | Summer Infant | 292 | 36 | 5 | |
| D30 | ⬜ | Habitat for Humanity ReStore | 267 | 11 | 8 | |
| D31 | ⬜ | Blue Nile | 249 | 13 | 15 | |
| D32 | ⬜ | Genomatica | 240 | 27 | 2 | |
| D33 | ⬜ | Skinny Dipped | 215 | 10 | 3 | |
| D34 | ⬜ | 18 Rabbits | 177 | 13 | 10 | |
| D35 | ⬜ | Pepperidge Farm | 146 | 12 | 1 | |
| D36 | ⬜ | Swimways | 958 | 11 | 2 | |
| D37 | ⬜ | Taste of Nature Foods | 905 | 5 | 14 | |
| D38 | ⬜ | Circle | 120 | 7 | 10 | |
| D39 | ⬜ | Panera | 120 | 15 | 2 | |
| D40 | ⬜ | Prime6 | 114 | 16 | 5 | |

---

### TIER E — BD/Tiny (~492 folders with <100 files)

Use Template D. Two sessions total.

| # | Status | Task | Template | Date Done |
|---|--------|------|----------|-----------|
| E1 | ⬜ | Classify folders A-L (~246 folders) | D — BD/tiny | |
| E2 | ⬜ | Classify folders M-Z (~246 folders) | D — BD/tiny | |

Known phantoms in this tier: P&G (11), Coca-Cola (0), J&J (4), GSK (20), Heineken (32), Newell (26), Bissell (7), Method (9), Hormel (8), Diageo (6), Johnsonville (3), Stonyfield (2), Godiva (1), Ghirardelli (4), Energizer (45), Land O Lakes (48), Pernod Ricard (22), Kimberly Clark (67), Red Bull (4), L'Oreal (44), Anheuser-Busch (52), Starbucks (11).

---

### ⛳ QUALITY GATE — All Digestion Complete

| # | Status | Task | Template | Date Done |
|---|--------|------|----------|-----------|
| QG-FINAL | ⬜ | Final cross-client synthesis (all tiers) | C — synthesis | |
| QG-FINAL2 | ⬜ | Comprehensive quality gate | E — quality gate | |

---

## POST-DIGESTION: Parts VI-VIII

These become available after digestion quality gates pass. The brain is usable as a knowledge system after QG-FINAL. These parts make it a team tool.

**Recommended order** (from playbook):

### Part VI — Skills & Plugin (3 parallel + QG)

| # | Status | Task | Notes | Date Done |
|---|--------|------|-------|-----------|
| VI-A | ⬜ | Port Meeting Notes skill | See playbook Wave 6-A prompt | |
| VI-B | ⬜ | Port Survey Pipeline (4 skills) | See playbook Wave 6-B prompt | |
| VI-C | ⬜ | Build GitHub Plugin structure | See playbook Wave 6-C prompt | |
| VI-QG | ⬜ | End-to-end skill testing | See playbook Wave 6-QG prompt | |

### Part VII — Automation & Intelligence (2 parallel + QG)

| # | Status | Task | Notes | Date Done |
|---|--------|------|-------|-----------|
| VII-A | ⬜ | Port Daily Brief system | Do FIRST — compounds daily | |
| VII-B | ⬜ | Curation process + health monitoring | See playbook Wave 7-B prompt | |
| VII-QG | ⬜ | Test daily brief + curation | See playbook Wave 7-QG prompt | |

### Part VIII — Testing & Deployment (2 sessions)

| # | Status | Task | Notes | Date Done |
|---|--------|------|-------|-----------|
| VIII-A | ⬜ | Comprehensive scenario testing | 17 test scenarios in playbook | |
| VIII-B | ⬜ | Setup guide + training docs | User-facing docs for team | |

---

## Stats & Tracking

**Queue totals:**
| Tier | Items | Sessions Est. | Status |
|------|-------|---------------|--------|
| A — Active Clients | 13 clients + 2 QG | 15-20 | ⬜ Next |
| B — Recent/Batch 1000+ | 34 clients + 2 QG | 15-20 | ⬜ |
| C — Lapsed 1000+ | 33 clients + 2 QG | 10-15 | ⬜ |
| D — Mid-Tier 100-999 | 40 clients (batched) | 10-12 | ⬜ |
| E — BD/Tiny <100 | ~492 folders | 2 | ⬜ |
| Post-Digestion VI-VIII | 8 tasks | 8 | ⬜ |
| **Total** | **~120 items** | **~60-75 sessions** | |

**Progress log** (update as you go):
```
[date] — [client/task] — [result summary]
```

---

## Rules (always in effect)

1. **Read first:** `_build/decisions.md` (last 50 lines), `patterns.md` (P## count), `lessons.md` (L## count) — BEFORE every session.
2. **SQLite lock:** Only ONE session runs `extract` at a time.
3. **No `--limit`:** Extract all eligible files per pass.
4. **Two-pass extraction:** `--finals-only` first, then `--latest-only`.
5. **Completion checklist:** Meet ALL items before marking ✅.
6. **Log everything:** Append to `_build/decisions.md` at end of session.
7. **Cross-reference everything:** profiles ↔ patterns ↔ themes ↔ BD.
8. **Quality bar:** "Could someone pick up this client tomorrow?" = YES.
9. **No hallucination:** If you don't know, say so. Cite sources.
10. **File size:** Flag anything >15KB for splitting.
