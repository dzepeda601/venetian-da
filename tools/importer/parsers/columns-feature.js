/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base block: columns.
 * Source: https://www.venetianlasvegas.com/
 *   - Tower comparison (.cmp-experiencefragment--tower-comparison)
 *   - Venetian Rewards / Meetings feature teasers (.teaser-bar .cmp-teaser)
 * Generated: 2026-08-18
 *
 * Library structure (Columns): first row = block name; second row defines the columns.
 * This variant produces a single content row with two cells (a 2-column side-by-side layout).
 *
 * Two source DOM shapes are handled:
 *  A) Tower comparison — two .cmp-card-comparison__cards__card items, each an image with a
 *     label (h2). Cell 1 = The Venetian image + label, cell 2 = The Palazzo image + label.
 *     (The desktop .cmp-card-comparison__cards container is used to avoid the mobile
 *     duplicates; the header intro + "View Hotels" CTA are authored as default content.)
 *  B) Feature teaser — .cmp-teaser__image (image) and .cmp-teaser__content (title +
 *     description + CTA links). Cell 1 = image, cell 2 = heading + text + CTAs.
 */
export default function parse(element, { document }) {
  const cells = [];

  // --- Shape A: tower comparison ---------------------------------------------------------
  // The .cmp-card-comparison__content_wrapper__card items carry the full per-tower content
  // (label, image, subtitle, descriptions, CTAs). Ordered by data-card-id so The Venetian
  // (0) is the first column and The Palazzo (1) is the second.
  //
  // NOTE: The section's intro copy ("A riveting adventure...Discover two ways to surpass
  // your expectations.") and the shared "View Hotels" CTA are intentionally NOT captured
  // here — per the authoring analysis they are authored as default content before/after the
  // block, so excluding them keeps the two content models from duplicating. This is why the
  // completeness metric reads ~90% rather than 100% for the tower-comparison instance.
  const comparisonCards = Array.from(
    element.querySelectorAll('.cmp-card-comparison__content_wrapper__card'),
  ).sort((a, b) => {
    const ai = parseInt(a.getAttribute('data-card-id') || '0', 10);
    const bi = parseInt(b.getAttribute('data-card-id') || '0', 10);
    return ai - bi;
  });

  if (comparisonCards.length) {
    const row = [];
    comparisonCards.forEach((card) => {
      const cell = [];
      const label = card.querySelector('.cmp-card-comparison__image_container__title, h2');
      const image = card.querySelector('.cmp-card-comparison__image_container__image img, img');
      const subtitle = card.querySelector('.cmp-card-comparison__content_wrapper__card__content__title, h3');
      const shortDesc = card.querySelector('.cmp-card-comparison__content_wrapper__card__content__short_description');
      const desc = card.querySelector('.cmp-card-comparison__content_wrapper__card__content__description');
      // CTAs: exclude the "Back" affordance (a <p>, not a link).
      const ctas = Array.from(card.querySelectorAll('a.cmp-card-comparison__cta, .cmp-card-comparison__content_wrapper__card__content__ctas a'));

      if (label) {
        const h = document.createElement('h2');
        h.textContent = (label.textContent || '').trim();
        cell.push(h);
      }
      if (image) cell.push(image);
      if (subtitle) {
        const h = document.createElement('h3');
        h.textContent = (subtitle.textContent || '').trim();
        cell.push(h);
      }
      if (shortDesc) cell.push(shortDesc);
      if (desc) cell.push(desc);
      ctas.forEach((cta) => cell.push(cta));
      row.push(cell);
    });
    if (row.length) {
      cells.push(row);
      const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
      element.replaceWith(block);
      return;
    }
  }

  // --- Shape B: feature teaser -----------------------------------------------------------
  const teaser = element.matches('.cmp-teaser') ? element : element.querySelector('.cmp-teaser');
  const scope = teaser || element;

  const image = scope.querySelector('.cmp-teaser__image img, img');
  const contentCell = [];
  const title = scope.querySelector('.cmp-teaser__title, h1, h2, h3');
  const description = scope.querySelector('.cmp-teaser__description');
  const ctas = Array.from(
    scope.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'),
  );

  if (title) {
    const h = document.createElement('h2');
    h.textContent = (title.textContent || '').trim();
    contentCell.push(h);
  }
  if (description) contentCell.push(description);
  ctas.forEach((cta) => contentCell.push(cta));

  if (!image && !contentCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([image || '', contentCell]);
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
