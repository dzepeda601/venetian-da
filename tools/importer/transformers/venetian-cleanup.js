/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Venetian Las Vegas site-wide cleanup.
 * Removes non-authorable AEM site shell/chrome so the import contains only
 * page-level authorable content.
 *
 * All selectors verified against migration-work/cleaned.html:
 *   #consent_blackbar                       (line 4)   TrustArc cookie consent banner
 *   .cmp-page__skiptomaincontent            (line ~977) skip-to-main-content link
 *   .cmp-experiencefragment--header         (line 19)  header experience fragment (separate orchestrator)
 *   .cmp-experiencefragment--footer         (line 3449) footer experience fragment (separate orchestrator)
 *   .breadcrumb                             (line 973) breadcrumb navigation
 *   .horizontal-slider                      (line 1242) hidden/JS-injected slider placeholders (panelcontainers)
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent overlay — remove before block parsing so it can't interfere.
    WebImporter.DOMUtils.remove(element, [
      '#consent_blackbar',
    ]);

    // Adobe Target injects multiple near-identical .tripadvisor-reviews copies
    // (md1..md4 personalization variants; only one renders). Keep the first and
    // drop the rest so the quote-review block isn't emitted 4x.
    const reviews = element.querySelectorAll('.tripadvisor-reviews');
    for (let i = 1; i < reviews.length; i += 1) {
      reviews[i].remove();
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome handled by separate orchestrators or not authored per-page.
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
      '.cmp-experiencefragment--footer',
      '.cmp-page__skiptomaincontent',
      '.breadcrumb',
      '.horizontal-slider',
      // Site utility bar ("Already Booked? | Manage My Stay | Mobile Check-in") — global chrome.
      '.already-booked-container',
      '[class*="already-booked"]',
      // Analytics / experimentation residue — not authorable content.
      'a[href*="optimizely.com"]',
      'img[src*="bat.bing.com"]',
      'link',
      'noscript',
    ]);

    // Strip inert Vue conditional-comment residue (<!--v-if-->) left over from the
    // client-side-rendered sliders once card content has been parsed.
    const walker = element.ownerDocument.createTreeWalker(element, 128 /* SHOW_COMMENT */);
    const comments = [];
    let node = walker.nextNode();
    while (node) {
      if (/^\s*v-if\s*$/.test(node.nodeValue) || node.nodeValue.trim() === '') {
        comments.push(node);
      }
      node = walker.nextNode();
    }
    comments.forEach((c) => c.remove());
  }
}
