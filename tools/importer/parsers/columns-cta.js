/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-cta. Base block: columns.
 * Source: https://www.venetianlasvegas.com/ (Ready to Stay / Rewards CTA bar)
 * Generated: 2026-08-18
 *
 * Library structure (Columns): first row = block name; the next row defines the columns.
 * This variant is a dark, text-only two-panel CTA bar: one row with two cells, each cell a
 * heading + copy + a single CTA link.
 *
 * Two source DOM shapes are handled:
 *  A) Two-panel column container — .cmp-column-container__column panels, each with a title
 *     (h3.cmp-title__text), body copy (.cmp-text), and a button (a.cmp-button). Each panel
 *     becomes one column cell.
 *  B) Teaser-bar fallback — a .cmp-teaser with .cmp-teaser__content (title + description +
 *     action links); produced as a single content cell if no two-panel layout is present.
 */
export default function parse(element, { document }) {
  const cells = [];

  const cleanHeading = (el, tag) => {
    const h = document.createElement(tag);
    h.textContent = (el.textContent || '').trim();
    return h;
  };

  const buildButtonLink = (btn) => {
    const href = btn.getAttribute('href');
    const label = btn.querySelector('.cmp-button__text');
    const link = document.createElement('a');
    if (href) link.href = href;
    link.textContent = ((label || btn).textContent || '').trim();
    return link;
  };

  // --- Shape A: two-panel column container -----------------------------------------------
  // Panels are the leaf columns that carry a title + text (skip divider elements).
  const panels = Array.from(
    element.querySelectorAll('.cmp-column-container__column'),
  ).filter((col) => (col.querySelector('.cmp-title__text, h2, h3, h4')
    || col.querySelector('.cmp-text, .text'))
    && !col.querySelector('.cmp-column-container__columns'));

  if (panels.length >= 2) {
    const row = [];
    panels.forEach((panel) => {
      const cell = [];
      const title = panel.querySelector('.cmp-title__text, h2, h3, h4');
      const bodies = Array.from(panel.querySelectorAll('.cmp-text p, .text p'));
      const buttons = Array.from(panel.querySelectorAll('a.cmp-button, .button a'));

      if (title) cell.push(cleanHeading(title, 'h3'));
      bodies.forEach((p) => cell.push(p));
      buttons.forEach((btn) => cell.push(buildButtonLink(btn)));
      row.push(cell);
    });
    cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
    element.replaceWith(block);
    return;
  }

  // --- Shape B: teaser-bar fallback ------------------------------------------------------
  const teaser = element.matches('.cmp-teaser') ? element : element.querySelector('.cmp-teaser');
  const scope = teaser || element;

  const contentCell = [];
  const title = scope.querySelector('.cmp-teaser__title, h1, h2, h3');
  const description = scope.querySelector('.cmp-teaser__description');
  const ctas = Array.from(
    scope.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'),
  );
  const image = scope.querySelector('.cmp-teaser__image img, img');

  if (title) contentCell.push(cleanHeading(title, 'h2'));
  if (description) contentCell.push(description);
  ctas.forEach((cta) => contentCell.push(cta));

  if (!contentCell.length && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single teaser → two cells (image | content) so the block stays a valid 2-column row.
  cells.push([image || '', contentCell]);
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
