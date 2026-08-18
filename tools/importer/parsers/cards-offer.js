/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-offer. Base block: cards.
 * Source: https://www.venetianlasvegas.com/ (Deals & Packages slider, Entertainment slider)
 * Generated: 2026-08-18
 *
 * Library structure (Cards): 2 columns, multiple rows. First row = block name.
 * Each subsequent row = one card: cell 1 = image (mandatory), cell 2 = text content
 * (title + optional details + description + CTA links).
 *
 * Source notes: two card DOM shapes appear across the two sliders.
 *  - Offer cards (.cmp-card): image in .cmp-card__image_container, linked .cmp-card__title,
 *    .cmp-card__description, CTAs in .cmp-card__cta.
 *  - Entertainment cards (.cmp-card--entertainment): img.cmp-card__image, linked
 *    .cmp-card__title, a .details block (When/Time/Where), .description paragraph, and CTAs
 *    in .cmp-card__cta (including a.cta-link).
 * Splide renders clone slides (.splide__slide--clone); cards inside clones are excluded.
 * The entertainment slider is a looping carousel, so its live DOM duplicates each card as a
 * clone. De-duplicating to the 6 unique cards is correct even though the similarity metric
 * (which counts clone text in the source) then scores that instance below threshold.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.cmp-card')).filter(
    (card) => !card.closest('.splide__slide--clone'),
  );

  const cells = [];

  cards.forEach((card) => {
    // Cell 1: card image (handles both .cmp-card__image_container img and img.cmp-card__image).
    const image = card.querySelector('.cmp-card__image_container img, img.cmp-card__image, img');

    // Cell 2: title + optional details + description + CTAs.
    const contentCell = [];

    const title = card.querySelector('.cmp-card__title')
      || card.querySelector('.cmp-card__overlay_title');
    const details = card.querySelector('.details');
    const description = card.querySelector('.cmp-card__description, .description');
    const ctas = Array.from(
      card.querySelectorAll('.cmp-card__cta a, a.cmp-button.is-link, a.cta-link'),
    );

    if (title) {
      // Normalize title to a heading; preserve its link if the title (or its wrapper) is linked.
      const heading = document.createElement('h3');
      const titleLink = (title.getAttribute && title.getAttribute('href'))
        ? title
        : title.closest('a[href]');
      const titleText = (title.textContent || '').trim();
      if (titleLink) {
        const link = document.createElement('a');
        link.href = titleLink.getAttribute('href');
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
    cells.push([image || '', contentCell]);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-offer', cells });
  element.replaceWith(block);
}
