I'll take a quick look at the project structure to ground the plan, then lay it out.# Venetian Las Vegas Homepage Migration Plan

## Objective
Migrate the page at **https://www.venetianlasvegas.com/** into this AEM Edge Delivery Services (Document Authoring) project so it renders correctly in preview and can be published to Document Authoring.

## Project Context (verified)
- **Project type:** Document Authoring (DA) — content source `https://content.da.live/dzepeda601/venetian-da/`
- **Org / Site:** `dzepeda601` / `venetian-da`
- **Existing blocks available:** accordion, banner, cards (+ callouts/category/feature/promo), carousel, columns, embed, footer, header, hero, hero-banner, promo-banner, quote, tabs, video, and more
- **Migration state:** no page templates or import parsers/transformers generated yet (fresh migration)

## Scope Decisions Needed
Before executing, I need one confirmation from you (see question) about which page(s) to migrate — the homepage only, or a broader set.

## Approach
This is a single-page (homepage) content migration. The workflow orchestrated by the site-migration skill will:
1. Scrape the source page (HTML, metadata, images)
2. Analyze page structure → identify sections and content sequences
3. Map content to existing EDS blocks (create new block variants only where needed)
4. Generate import infrastructure (parsers + transformers) + page template
5. Run the bundled import script to produce content HTML
6. Preview, verify against the original, and iterate on styling

## Checklist / Todo List

- [ ] **Confirm migration scope** (homepage only vs. additional pages) — via question
- [ ] **Scrape** the homepage — capture cleaned HTML, metadata, and download images
- [ ] **Analyze page structure** — detect section boundaries and content sequences
- [ ] **Survey block inventory** — match content to existing blocks; note gaps
- [ ] **Determine authoring approach** per section (default content vs. block)
- [ ] **Create/confirm page template** in `page-templates.json` with block mappings
- [ ] **Create any new block variants** required by the design (only if no existing block fits)
- [ ] **Generate import infrastructure** — block parsers + page transformers
- [ ] **Generate & bundle the import script**, then run the bulk import to produce content HTML
- [ ] **Preview the imported page** on the local dev server
- [ ] **Visually critique vs. the original** and fix styling/layout differences (iterate)
- [ ] **Migrate navigation/header** from the source (if in scope)
- [ ] **Migrate footer** from the source (if in scope)
- [ ] **Final verification** — confirm rendering matches the source; report results

## Notes
- Content HTML will only be generated via the project's bundled import script (never hand-authored).
- Publishing to Document Authoring can be done after preview verification, if you want it.
- **Execution requires switching to Execute mode** — this plan is prepared and ready to run once approved.

---

One quick clarification so I scope this correctly:# Venetian Las Vegas Homepage Migration Plan

## Objective
Migrate the page at **https://www.venetianlasvegas.com/** — including its **header/navigation** and **footer** — into this AEM Edge Delivery Services (Document Authoring) project so it renders correctly in preview and can be published to Document Authoring.

## Project Context (verified)
- **Project type:** Document Authoring (DA) — content source `https://content.da.live/dzepeda601/venetian-da/`
- **Org / Site:** `dzepeda601` / `venetian-da`
- **Existing blocks available:** accordion, banner, cards (+ callouts/category/feature/promo), carousel, columns, embed, footer, header, hero, hero-banner, promo-banner, quote, tabs, video, and more
- **Migration state:** fresh migration — no page templates, parsers, or transformers generated yet

## Confirmed Scope
**Homepage + navigation/header + footer.** The homepage content will be migrated as a single EDS page, and the site header and footer will be instrumented from the source site.

## Approach
Single-page content migration plus navigation and footer instrumentation, orchestrated by the site-migration workflow:
1. Scrape the source homepage (HTML, metadata, images)
2. Analyze page structure → identify sections and content sequences
3. Map content to existing EDS blocks (create new variants only where needed)
4. Generate import infrastructure (parsers + transformers) + page template
5. Run the bundled import script to produce content HTML
6. Preview, verify against the original, iterate on styling
7. Instrument header/navigation and footer separately from the source

## Checklist / Todo List

- [x] **Confirm migration scope** — Homepage + nav & footer
- [ ] **Scrape** the homepage — cleaned HTML, metadata, and downloaded images
- [ ] **Analyze page structure** — detect section boundaries and content sequences
- [ ] **Survey block inventory** — match content to existing blocks; note gaps
- [ ] **Determine authoring approach** per section (default content vs. block)
- [ ] **Create/confirm page template** in `page-templates.json` with block mappings
- [ ] **Create any new block variants** required by the design (only if no existing block fits)
- [ ] **Generate import infrastructure** — block parsers + page transformers
- [ ] **Generate & bundle the import script**, then run the bulk import to produce content HTML
- [ ] **Preview the imported page** on the local dev server
- [ ] **Visually critique vs. the original** and fix styling/layout differences (iterate)
- [ ] **Migrate the header/navigation** from the source site (desktop + mobile + megamenu)
- [ ] **Migrate the footer** from the source site
- [ ] **Final verification** — confirm homepage, nav, and footer match the source; report results

## Notes
- Content HTML will only be generated via the project's bundled import script (never hand-authored).
- Publishing to Document Authoring can be done after preview verification, if you'd like.
- **Execution requires switching to Execute mode** — this plan is ready to run once approved.
