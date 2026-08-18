/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import cardsNavParser from './parsers/cards-nav.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import quoteReviewParser from './parsers/quote-review.js';
import cardsOfferParser from './parsers/cards-offer.js';
import cardsAwardParser from './parsers/cards-award.js';
import columnsCtaParser from './parsers/columns-cta.js';

// TRANSFORMER IMPORTS
import venetianEntertainmentHydrationTransformer from './transformers/venetian-entertainment-hydration.js';
import venetianCleanupTransformer from './transformers/venetian-cleanup.js';
import venetianSectionsTransformer from './transformers/venetian-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Venetian Las Vegas homepage - hero carousel, navigation cards, tower/resort comparison, TripAdvisor reviews, offer card sliders, and teaser bar. Includes header and footer experience fragments.',
  urls: [
    'https://www.venetianlasvegas.com/'
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: [
        'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)'
      ]
    },
    {
      name: 'cards-nav',
      instances: [
        'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .venrc5-navigation-cards'
      ]
    },
    {
      name: 'columns-feature',
      instances: [
        'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .cmp-experiencefragment--tower-comparison',
        'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser'
      ]
    },
    {
      name: 'quote-review',
      instances: [
        'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .tripadvisor-reviews'
      ]
    },
    {
      name: 'cards-offer',
      instances: [
        '.cmp-experiencefragment--offer-card-slider .card-list',
        '.cmp-experiencefragment--content-fragment-slider .card-list'
      ]
    },
    {
      name: 'cards-award',
      instances: [
        'div.cmp-column-container.cmp-column-container--repeat > div.cmp-column-container__container.cmp-column-container__container--full > div.cmp-column-container__columns.cmp-column-container--repeat'
      ]
    },
    {
      name: 'columns-cta',
      instances: [
        '.column-container .cmp-column-container__container--narrow > .cmp-column-container__columns.cmp-column-container--repeat'
      ]
    }
  ],
  sections: [
    { id: 'section-1', name: 'Hero carousel', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)', style: null, blocks: ['carousel-hero'], defaultContent: [] },
    { id: 'section-2', name: 'Navigation cards', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .venrc5-navigation-cards', style: null, blocks: ['cards-nav'], defaultContent: [] },
    { id: 'section-3', name: 'Tower comparison', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .cmp-experiencefragment--tower-comparison', style: 'burgundy', blocks: ['columns-feature'], defaultContent: [] },
    { id: 'section-4', name: 'Traveler review', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .tripadvisor-reviews', style: null, blocks: ['quote-review'], defaultContent: [] },
    { id: 'section-5', name: 'Deals & Packages', selector: '.cmp-experiencefragment--offer-card-slider .card-list', style: null, blocks: ['cards-offer'], defaultContent: [] },
    { id: 'section-6', name: 'Awards & Recognition', selector: 'div.cmp-column-container.cmp-column-container--repeat > div.cmp-column-container__container.cmp-column-container__container--full > div.cmp-column-container__columns.cmp-column-container--repeat', style: 'burgundy', blocks: ['cards-award'], defaultContent: [] },
    { id: 'section-7', name: 'Venetian Rewards feature', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser', style: 'navy', blocks: ['columns-feature'], defaultContent: [] },
    { id: 'section-8', name: 'Meetings Made Magnificent feature', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser', style: null, blocks: ['columns-feature'], defaultContent: [] },
    { id: 'section-9', name: 'Entertainment', selector: '.cmp-experiencefragment--content-fragment-slider .card-list', style: 'burgundy', blocks: ['cards-offer'], defaultContent: [] },
    { id: 'section-10', name: 'Ready to Stay / Rewards teaser bar', selector: 'body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar', style: 'burgundy', blocks: ['columns-cta'], defaultContent: [] }
  ]
};

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-nav': cardsNavParser,
  'columns-feature': columnsFeatureParser,
  'quote-review': quoteReviewParser,
  'cards-offer': cardsOfferParser,
  'cards-award': cardsAwardParser,
  'columns-cta': columnsCtaParser,
};

// TRANSFORMER REGISTRY - cleanup runs first, sections after (adds <hr> breaks + metadata)
const transformers = [
  // Runs first: restores the lazily-hydrated Entertainment slider snapshot (captured
  // in onLoad) in beforeTransform, before the cards-offer parser runs.
  venetianEntertainmentHydrationTransformer,
  venetianCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [venetianSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements = [];
      try {
        elements = document.querySelectorAll(selector);
      } catch (e) {
        console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`);
        return;
      }
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  /**
   * onLoad runs in the live browser (awaited by run-bulk-import.js) BEFORE the DOM
   * is captured and html2md/transform run. It is the only awaited, async hook the
   * importer exposes — transformers run synchronously and after capture, so they
   * cannot wait for asynchronous client-side hydration.
   *
   * Why this is needed: the Entertainment section ("The Standard for Las Vegas
   * Entertainment", .cmp-experiencefragment--content-fragment-slider .card-list) is a
   * Vue client-side-rendered slider that hydrates lazily when scrolled into view.
   * Its card content (images, titles, When/Where details) does NOT exist in the
   * server HTML — the static markup only carries a data-featured-cards attribute of
   * content-fragment paths — so it cannot be reconstructed by a transformer/parser.
   * The importer's default randomScroll does 1–3 small scrolls that never reach this
   * below-the-fold island, so it never hydrated within the settle window and the
   * cards-offer parser found an empty .card-list. The offer-card-slider higher on the
   * page hydrated fine because it was already near the top.
   *
   * Fix: explicitly scroll the slider into view to trigger its IntersectionObserver
   * hydration, poll until the expected cards render (or a hard timeout, so a
   * structural change on the page can never hang the import), then FREEZE the
   * hydrated markup by replacing the live Vue node with a deep clone. The clone is
   * detached from Vue's component instance, so Vue can no longer unmount/re-render
   * it — without this, Vue tears the cards back down on the async boundary before
   * the DOM is captured (observed: 6 cards at end of onLoad, 0 at transform time),
   * and only the <!--v-if--> placeholder survives into the output.
   */
  onLoad: async ({ document }) => {
    const SLIDER_SEL = '.cmp-experiencefragment--content-fragment-slider';
    const CARD_LIST_SEL = `${SLIDER_SEL} .card-list`;
    const EXPECTED_CARDS = 6; // Book of Mormon, Shin Lim, Dita Von Teese, Backstreet Boys, Jimmy Jam & Terry Lewis, Metallica
    const HYDRATION_TIMEOUT_MS = 15000;
    const POLL_INTERVAL_MS = 300;

    const win = document.defaultView;

    // Count unique (non-clone) hydrated cards — Splide duplicates each card as a
    // .splide__slide--clone in the looping carousel; the cards-offer parser also
    // excludes clones, so mirror that here.
    const uniqueCardCount = () => {
      const list = document.querySelector(CARD_LIST_SEL);
      if (!list) return 0;
      return Array.from(list.querySelectorAll('.cmp-card'))
        .filter((card) => !card.closest('.splide__slide--clone')).length;
    };

    // Scroll the below-the-fold slider into view so its lazy hydration fires.
    const slider = document.querySelector(SLIDER_SEL);
    if (slider && typeof slider.scrollIntoView === 'function') {
      slider.scrollIntoView({ block: 'center' });
    } else if (win && typeof win.scrollTo === 'function') {
      win.scrollTo(0, document.body.scrollHeight);
    }

    // Poll until the cards hydrate, capped by a hard deadline so we never hang.
    const deadline = Date.now() + HYDRATION_TIMEOUT_MS;
    while (Date.now() < deadline && uniqueCardCount() < EXPECTED_CARDS) {
      await new Promise((resolve) => { setTimeout(resolve, POLL_INTERVAL_MS); });
    }

    // Stash the hydrated markup on a window global. In-place DOM edits made here do
    // NOT survive: after onLoad returns, Vue re-renders the vue-component subtree and
    // reverts .card-list to the empty <!--v-if--> placeholder before html2md captures
    // the DOM (verified: 6 cards at end of onLoad, 0 at transform time — even a
    // detached clone gets clobbered). window persists across the importer's separate
    // page.evaluate calls, so the entertainment-hydration transformer can restore this
    // snapshot synchronously at transform time, when Vue can no longer re-render.
    if (uniqueCardCount() >= EXPECTED_CARDS) {
      const liveList = document.querySelector(CARD_LIST_SEL);
      if (liveList) {
        window.__VLV_ENTERTAINMENT_CARDLIST_HTML__ = liveList.innerHTML;
      }
    }
  },

  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (map root/homepage URL to /index)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
