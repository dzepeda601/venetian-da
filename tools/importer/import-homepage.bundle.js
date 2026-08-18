/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document: document2 }) {
    let slides = Array.from(
      element.querySelectorAll("li.cmp-hero__slide:not(.splide__slide--clone)")
    );
    if (!slides.length) {
      slides = Array.from(element.querySelectorAll("li.splide__slide:not(.splide__slide--clone)"));
    }
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".cmp-hero__slide__image img, img.cmp-image__image, img");
      const contentCell = [];
      const title = slide.querySelector(".cmp-hero__slide__title, h1, h2");
      const subtitle = slide.querySelector(".cmp-hero__slide__subtitle, p");
      const ctas = Array.from(
        slide.querySelectorAll(".cmp-hero__slide__ctas a, a.cmp-button")
      );
      if (title) contentCell.push(title);
      if (subtitle) contentCell.push(subtitle);
      ctas.forEach((cta) => contentCell.push(cta));
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-nav.js
  function parse2(element, { document: document2 }) {
    const tiles = Array.from(
      element.querySelectorAll('a.venrc5-navigation-card, a[class*="navigation-card"]')
    );
    const cells = [];
    tiles.forEach((tile) => {
      const image = tile.querySelector("img");
      const titleEl = tile.querySelector(".venrc5-navigation-card__title, h1, h2, h3, h4, h5, h6");
      const href = tile.getAttribute("href");
      const contentCell = [];
      if (titleEl && href) {
        const link = document2.createElement("a");
        link.href = href;
        link.textContent = (titleEl.textContent || "").trim();
        contentCell.push(link);
      } else if (titleEl) {
        contentCell.push(titleEl);
      } else if (href) {
        const link = document2.createElement("a");
        link.href = href;
        link.textContent = href;
        contentCell.push(link);
      }
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-nav", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    const comparisonCards = Array.from(
      element.querySelectorAll(".cmp-card-comparison__content_wrapper__card")
    ).sort((a, b) => {
      const ai = parseInt(a.getAttribute("data-card-id") || "0", 10);
      const bi = parseInt(b.getAttribute("data-card-id") || "0", 10);
      return ai - bi;
    });
    if (comparisonCards.length) {
      const row = [];
      comparisonCards.forEach((card) => {
        const cell = [];
        const label = card.querySelector(".cmp-card-comparison__image_container__title, h2");
        const image2 = card.querySelector(".cmp-card-comparison__image_container__image img, img");
        const subtitle = card.querySelector(".cmp-card-comparison__content_wrapper__card__content__title, h3");
        const shortDesc = card.querySelector(".cmp-card-comparison__content_wrapper__card__content__short_description");
        const desc = card.querySelector(".cmp-card-comparison__content_wrapper__card__content__description");
        const ctas2 = Array.from(card.querySelectorAll("a.cmp-card-comparison__cta, .cmp-card-comparison__content_wrapper__card__content__ctas a"));
        if (label) {
          const h = document2.createElement("h2");
          h.textContent = (label.textContent || "").trim();
          cell.push(h);
        }
        if (image2) cell.push(image2);
        if (subtitle) {
          const h = document2.createElement("h3");
          h.textContent = (subtitle.textContent || "").trim();
          cell.push(h);
        }
        if (shortDesc) cell.push(shortDesc);
        if (desc) cell.push(desc);
        ctas2.forEach((cta) => cell.push(cta));
        row.push(cell);
      });
      if (row.length) {
        cells.push(row);
        const block2 = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
        element.replaceWith(block2);
        return;
      }
    }
    const teaser = element.matches(".cmp-teaser") ? element : element.querySelector(".cmp-teaser");
    const scope = teaser || element;
    const image = scope.querySelector(".cmp-teaser__image img, img");
    const contentCell = [];
    const title = scope.querySelector(".cmp-teaser__title, h1, h2, h3");
    const description = scope.querySelector(".cmp-teaser__description");
    const ctas = Array.from(
      scope.querySelectorAll(".cmp-teaser__action-link, .cmp-teaser__action-container a")
    );
    if (title) {
      const h = document2.createElement("h2");
      h.textContent = (title.textContent || "").trim();
      contentCell.push(h);
    }
    if (description) contentCell.push(description);
    ctas.forEach((cta) => contentCell.push(cta));
    if (!image && !contentCell.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([image || "", contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-review.js
  function parse4(element, { document: document2 }) {
    const quoteText = element.querySelector(".cmp-tripadvisor__review__text p, .cmp-tripadvisor__review__text");
    const author = element.querySelector(".cmp-tripadvisor__review__meta__name p, .cmp-tripadvisor__review__meta__name");
    const location = element.querySelector(".cmp-tripadvisor__review__meta__location p, .cmp-tripadvisor__review__meta__location");
    const quoteFallback = element.querySelector("blockquote, .quote-text, q");
    const cells = [];
    const quotation = document2.createElement("p");
    const quoteSource = quoteText || quoteFallback;
    quotation.textContent = quoteSource ? (quoteSource.textContent || "").trim() : "";
    const attribution = document2.createElement("p");
    const authorText = author ? (author.textContent || "").trim() : "";
    const locationText = location ? (location.textContent || "").trim() : "";
    if (authorText) attribution.append(document2.createTextNode(authorText));
    if (locationText) {
      if (authorText) attribution.append(document2.createTextNode(" "));
      const em = document2.createElement("em");
      em.textContent = locationText;
      attribution.append(em);
    }
    if (!quotation.textContent && !attribution.textContent) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([[quotation]]);
    if (attribution.textContent) cells.push([[attribution]]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "quote-review", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-offer.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(".cmp-card")).filter(
      (card) => !card.closest(".splide__slide--clone")
    );
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".cmp-card__image_container img, img.cmp-card__image, img");
      const contentCell = [];
      const title = card.querySelector(".cmp-card__title") || card.querySelector(".cmp-card__overlay_title");
      const details = card.querySelector(".details");
      const description = card.querySelector(".cmp-card__description, .description");
      const ctas = Array.from(
        card.querySelectorAll(".cmp-card__cta a, a.cmp-button.is-link, a.cta-link")
      );
      if (title) {
        const heading = document2.createElement("h3");
        const titleLink = title.getAttribute && title.getAttribute("href") ? title : title.closest("a[href]");
        const titleText = (title.textContent || "").trim();
        if (titleLink) {
          const link = document2.createElement("a");
          link.href = titleLink.getAttribute("href");
          link.textContent = titleText;
          heading.append(link);
        } else {
          heading.textContent = titleText;
        }
        contentCell.push(heading);
      }
      if (details) contentCell.push(details);
      if (description) contentCell.push(description);
      ctas.forEach((cta) => contentCell.push(cta));
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-offer", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-award.js
  function parse6(element, { document: document2 }) {
    const isLeafAward = (col) => col.querySelector(".cmp-title__text, h2, h3, h4, h5, h6") && col.querySelector(".cmp-text, .text") && !col.querySelector(".cmp-column-container__columns");
    let columns = Array.from(
      element.querySelectorAll(".cmp-column-container__column")
    ).filter(isLeafAward);
    if (!columns.length && isLeafAward(element)) columns = [element];
    const cells = [];
    columns.forEach((col) => {
      const contentCell = [];
      const heading = col.querySelector(".cmp-title__text, h2, h3, h4, h5, h6");
      const bodies = Array.from(col.querySelectorAll(".cmp-text p, .text p"));
      if (heading) {
        const h = document2.createElement("h3");
        h.textContent = (heading.textContent || "").trim();
        contentCell.push(h);
      }
      bodies.forEach((p) => contentCell.push(p));
      if (!contentCell.length) return;
      cells.push([contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-award", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse7(element, { document: document2 }) {
    const cells = [];
    const cleanHeading = (el, tag) => {
      const h = document2.createElement(tag);
      h.textContent = (el.textContent || "").trim();
      return h;
    };
    const buildButtonLink = (btn) => {
      const href = btn.getAttribute("href");
      const label = btn.querySelector(".cmp-button__text");
      const link = document2.createElement("a");
      if (href) link.href = href;
      link.textContent = ((label || btn).textContent || "").trim();
      return link;
    };
    const panels = Array.from(
      element.querySelectorAll(".cmp-column-container__column")
    ).filter((col) => (col.querySelector(".cmp-title__text, h2, h3, h4") || col.querySelector(".cmp-text, .text")) && !col.querySelector(".cmp-column-container__columns"));
    if (panels.length >= 2) {
      const row = [];
      panels.forEach((panel) => {
        const cell = [];
        const title2 = panel.querySelector(".cmp-title__text, h2, h3, h4");
        const bodies = Array.from(panel.querySelectorAll(".cmp-text p, .text p"));
        const buttons = Array.from(panel.querySelectorAll("a.cmp-button, .button a"));
        if (title2) cell.push(cleanHeading(title2, "h3"));
        bodies.forEach((p) => cell.push(p));
        buttons.forEach((btn) => cell.push(buildButtonLink(btn)));
        row.push(cell);
      });
      cells.push(row);
      const block2 = WebImporter.Blocks.createBlock(document2, { name: "columns-cta", cells });
      element.replaceWith(block2);
      return;
    }
    const teaser = element.matches(".cmp-teaser") ? element : element.querySelector(".cmp-teaser");
    const scope = teaser || element;
    const contentCell = [];
    const title = scope.querySelector(".cmp-teaser__title, h1, h2, h3");
    const description = scope.querySelector(".cmp-teaser__description");
    const ctas = Array.from(
      scope.querySelectorAll(".cmp-teaser__action-link, .cmp-teaser__action-container a")
    );
    const image = scope.querySelector(".cmp-teaser__image img, img");
    if (title) contentCell.push(cleanHeading(title, "h2"));
    if (description) contentCell.push(description);
    ctas.forEach((cta) => contentCell.push(cta));
    if (!contentCell.length && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([image || "", contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/venetian-entertainment-hydration.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  var CARD_LIST_SEL = ".cmp-experiencefragment--content-fragment-slider .card-list";
  var SNAPSHOT_KEY = "__VLV_ENTERTAINMENT_CARDLIST_HTML__";
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      const snapshot = typeof window !== "undefined" ? window[SNAPSHOT_KEY] : void 0;
      if (!snapshot) return;
      const cardList = element.querySelector(CARD_LIST_SEL);
      if (!cardList) return;
      const liveCards = Array.from(cardList.querySelectorAll(".cmp-card")).filter((card) => !card.closest(".splide__slide--clone"));
      if (liveCards.length >= 1) return;
      const neutralized = snapshot.replace(/<vue-component\b/gi, "<div data-was-vue-component").replace(/<\/vue-component>/gi, "</div>");
      cardList.innerHTML = neutralized;
    }
  }

  // tools/importer/transformers/venetian-cleanup.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#consent_blackbar"
      ]);
      const reviews = element.querySelectorAll(".tripadvisor-reviews");
      for (let i = 1; i < reviews.length; i += 1) {
        reviews[i].remove();
      }
    }
    if (hookName === TransformHook2.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        ".cmp-experiencefragment--footer",
        ".cmp-page__skiptomaincontent",
        ".breadcrumb",
        ".horizontal-slider",
        // Site utility bar ("Already Booked? | Manage My Stay | Mobile Check-in") — global chrome.
        ".already-booked-container",
        '[class*="already-booked"]',
        // Analytics / experimentation residue — not authorable content.
        'a[href*="optimizely.com"]',
        'img[src*="bat.bing.com"]',
        "link",
        "noscript"
      ]);
      const walker = element.ownerDocument.createTreeWalker(
        element,
        128
        /* SHOW_COMMENT */
      );
      const comments = [];
      let node = walker.nextNode();
      while (node) {
        if (/^\s*v-if\s*$/.test(node.nodeValue) || node.nodeValue.trim() === "") {
          comments.push(node);
        }
        node = walker.nextNode();
      }
      comments.forEach((c) => c.remove());
    }
  }

  // tools/importer/transformers/venetian-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform3(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Venetian Las Vegas homepage - hero carousel, navigation cards, tower/resort comparison, TripAdvisor reviews, offer card sliders, and teaser bar. Includes header and footer experience fragments.",
    urls: [
      "https://www.venetianlasvegas.com/"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: [
          "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)"
        ]
      },
      {
        name: "cards-nav",
        instances: [
          "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .venrc5-navigation-cards"
        ]
      },
      {
        name: "columns-feature",
        instances: [
          "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .cmp-experiencefragment--tower-comparison",
          "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser"
        ]
      },
      {
        name: "quote-review",
        instances: [
          "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .tripadvisor-reviews"
        ]
      },
      {
        name: "cards-offer",
        instances: [
          ".cmp-experiencefragment--offer-card-slider .card-list",
          ".cmp-experiencefragment--content-fragment-slider .card-list"
        ]
      },
      {
        name: "cards-award",
        instances: [
          "div.cmp-column-container.cmp-column-container--repeat > div.cmp-column-container__container.cmp-column-container__container--full > div.cmp-column-container__columns.cmp-column-container--repeat"
        ]
      },
      {
        name: "columns-cta",
        instances: [
          ".column-container .cmp-column-container__container--narrow > .cmp-column-container__columns.cmp-column-container--repeat"
        ]
      }
    ],
    sections: [
      { id: "section-1", name: "Hero carousel", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(2)", style: null, blocks: ["carousel-hero"], defaultContent: [] },
      { id: "section-2", name: "Navigation cards", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .venrc5-navigation-cards", style: null, blocks: ["cards-nav"], defaultContent: [] },
      { id: "section-3", name: "Tower comparison", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .cmp-experiencefragment--tower-comparison", style: "burgundy", blocks: ["columns-feature"], defaultContent: [] },
      { id: "section-4", name: "Traveler review", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .tripadvisor-reviews", style: null, blocks: ["quote-review"], defaultContent: [] },
      { id: "section-5", name: "Deals & Packages", selector: ".cmp-experiencefragment--offer-card-slider .card-list", style: null, blocks: ["cards-offer"], defaultContent: [] },
      { id: "section-6", name: "Awards & Recognition", selector: "div.cmp-column-container.cmp-column-container--repeat > div.cmp-column-container__container.cmp-column-container__container--full > div.cmp-column-container__columns.cmp-column-container--repeat", style: "burgundy", blocks: ["cards-award"], defaultContent: [] },
      { id: "section-7", name: "Venetian Rewards feature", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser", style: "navy", blocks: ["columns-feature"], defaultContent: [] },
      { id: "section-8", name: "Meetings Made Magnificent feature", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar .cmp-teaser", style: null, blocks: ["columns-feature"], defaultContent: [] },
      { id: "section-9", name: "Entertainment", selector: ".cmp-experiencefragment--content-fragment-slider .card-list", style: "burgundy", blocks: ["cards-offer"], defaultContent: [] },
      { id: "section-10", name: "Ready to Stay / Rewards teaser bar", selector: "body > div.root.container.responsivegrid > div.cmp-container > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4) .teaser-bar", style: "burgundy", blocks: ["columns-cta"], defaultContent: [] }
    ]
  };
  var parsers = {
    "carousel-hero": parse,
    "cards-nav": parse2,
    "columns-feature": parse3,
    "quote-review": parse4,
    "cards-offer": parse5,
    "cards-award": parse6,
    "columns-cta": parse7
  };
  var transformers = [
    // Runs first: restores the lazily-hydrated Entertainment slider snapshot (captured
    // in onLoad) in beforeTransform, before the cards-offer parser runs.
    transform,
    transform2,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform3] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let elements = [];
        try {
          elements = document2.querySelectorAll(selector);
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
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
    onLoad: (_0) => __async(void 0, [_0], function* ({ document: document2 }) {
      const SLIDER_SEL = ".cmp-experiencefragment--content-fragment-slider";
      const CARD_LIST_SEL2 = `${SLIDER_SEL} .card-list`;
      const EXPECTED_CARDS = 6;
      const HYDRATION_TIMEOUT_MS = 15e3;
      const POLL_INTERVAL_MS = 300;
      const win = document2.defaultView;
      const uniqueCardCount = () => {
        const list = document2.querySelector(CARD_LIST_SEL2);
        if (!list) return 0;
        return Array.from(list.querySelectorAll(".cmp-card")).filter((card) => !card.closest(".splide__slide--clone")).length;
      };
      const slider = document2.querySelector(SLIDER_SEL);
      if (slider && typeof slider.scrollIntoView === "function") {
        slider.scrollIntoView({ block: "center" });
      } else if (win && typeof win.scrollTo === "function") {
        win.scrollTo(0, document2.body.scrollHeight);
      }
      const deadline = Date.now() + HYDRATION_TIMEOUT_MS;
      while (Date.now() < deadline && uniqueCardCount() < EXPECTED_CARDS) {
        yield new Promise((resolve) => {
          setTimeout(resolve, POLL_INTERVAL_MS);
        });
      }
      if (uniqueCardCount() >= EXPECTED_CARDS) {
        const liveList = document2.querySelector(CARD_LIST_SEL2);
        if (liveList) {
          window.__VLV_ENTERTAINMENT_CARDLIST_HTML__ = liveList.innerHTML;
        }
      }
    }),
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
