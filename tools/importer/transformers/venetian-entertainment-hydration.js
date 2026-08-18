/* eslint-disable */
/* global WebImporter, window */

/**
 * Transformer: Venetian Las Vegas — restore lazily-hydrated Entertainment slider.
 *
 * Problem: Section 9 "The Standard for Las Vegas Entertainment"
 * (.cmp-experiencefragment--content-fragment-slider .card-list) is a Vue
 * client-side-rendered slider that hydrates only when scrolled into view. Its card
 * content (images, titles, When/Where details) does NOT exist in the server HTML —
 * the static markup only carries a data-featured-cards attribute of content-fragment
 * paths — so it cannot be reconstructed from static markup. Being below the fold, it
 * did not hydrate within the importer's short settle window, so the live .card-list
 * held only an empty <!--v-if--> placeholder and the cards-offer parser found no cards.
 *
 * Why this can't be fixed purely in a transformer's DOM edits: transformers run
 * synchronously and cannot await hydration, and even after we force hydration in the
 * import script's async onLoad hook, Vue re-renders the vue-component subtree and
 * reverts .card-list to the empty placeholder on the async boundary before the DOM is
 * captured (verified: 6 cards at end of onLoad, 0 at transform time — detached clones
 * get clobbered too). So onLoad (see import-homepage.js) scrolls the slider into view,
 * waits for the 6 cards to render, and snapshots their innerHTML onto a window global.
 *
 * This transformer restores that snapshot in beforeTransform — synchronously, before
 * the cards-offer parser runs and while Vue can no longer re-render — so the existing
 * cards-offer parser (which already handles the .cmp-card--entertainment shape) picks
 * the cards up. If the snapshot is absent (e.g. the automatic hook validates this file
 * without running onLoad, or hydration failed) it no-ops and leaves the DOM untouched.
 *
 * Selector verified against migration-work/cleaned.html (fully-rendered Playwright
 * capture): .cmp-experiencefragment--content-fragment-slider .card-list.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };
const CARD_LIST_SEL = '.cmp-experiencefragment--content-fragment-slider .card-list';
const SNAPSHOT_KEY = '__VLV_ENTERTAINMENT_CARDLIST_HTML__';

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Only act when the import script's onLoad captured a hydrated snapshot.
    const snapshot = (typeof window !== 'undefined') ? window[SNAPSHOT_KEY] : undefined;
    if (!snapshot) return;

    const cardList = element.querySelector(CARD_LIST_SEL);
    if (!cardList) return;

    // If the live DOM already has the hydrated cards, leave it alone.
    const liveCards = Array.from(cardList.querySelectorAll('.cmp-card'))
      .filter((card) => !card.closest('.splide__slide--clone'));
    if (liveCards.length >= 1) return;

    // Neutralize the <vue-component> custom-element tag before re-inserting the
    // snapshot. Assigning the raw snapshot back into the live document re-inserts
    // the <vue-component class="cmp-card-list-app"> custom element, whose
    // connectedCallback re-runs Vue and SYNCHRONOUSLY wipes the cards back to the
    // empty <!--v-if--> placeholder (verified: 6 cards in snapshot, 0 after
    // assignment). Renaming it to a plain <div> keeps the already-rendered card
    // markup as inert static DOM the cards-offer parser can read.
    const neutralized = snapshot
      .replace(/<vue-component\b/gi, '<div data-was-vue-component')
      .replace(/<\/vue-component>/gi, '</div>');

    cardList.innerHTML = neutralized;
  }
}
