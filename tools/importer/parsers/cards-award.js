/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-award. Base block: cards (no images variant).
 * Source: https://www.venetianlasvegas.com/ (Awards & Recognition section)
 * Generated: 2026-08-18
 *
 * Library structure (Cards, no images): 1 column, multiple rows. First row = block name.
 * Each subsequent row = one card in a single cell: heading (award source) + description
 * (award text lines).
 *
 * Source notes: the block instance selector can match either the outer wrapper column
 * container or the inner repeat. In both cases the actual award items are the leaf
 * .cmp-column-container__column elements that carry a title (h3.cmp-title__text) and a text
 * body (.cmp-text) but do NOT themselves contain a nested column grid. We select those leaf
 * columns so each award (source heading + award lines) becomes one row. The leading
 * "Awards & Recognition" wrapper heading is authored as default content and is excluded.
 */
export default function parse(element, { document }) {
  const isLeafAward = (col) => col.querySelector('.cmp-title__text, h2, h3, h4, h5, h6')
    && col.querySelector('.cmp-text, .text')
    && !col.querySelector('.cmp-column-container__columns');

  // All leaf award columns anywhere beneath the matched element.
  let columns = Array.from(
    element.querySelectorAll('.cmp-column-container__column'),
  ).filter(isLeafAward);

  // If the element itself is a single leaf award column, use it directly.
  if (!columns.length && isLeafAward(element)) columns = [element];

  const cells = [];

  columns.forEach((col) => {
    const contentCell = [];
    const heading = col.querySelector('.cmp-title__text, h2, h3, h4, h5, h6');
    const bodies = Array.from(col.querySelectorAll('.cmp-text p, .text p'));

    if (heading) {
      const h = document.createElement('h3');
      h.textContent = (heading.textContent || '').trim();
      contentCell.push(h);
    }
    bodies.forEach((p) => contentCell.push(p));

    if (!contentCell.length) return;
    cells.push([contentCell]); // 1-column: one row, one cell holding all elements.
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-award', cells });
  element.replaceWith(block);
}
