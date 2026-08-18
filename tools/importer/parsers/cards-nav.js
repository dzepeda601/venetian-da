/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-nav. Base block: cards.
 * Source: https://www.venetianlasvegas.com/ (Navigation cards section)
 * Generated: 2026-08-18
 *
 * Library structure (Cards): 2 columns, multiple rows. First row = block name.
 * Each subsequent row = one card: cell 1 = image (mandatory), cell 2 = text content.
 *
 * This variant: 5 category tiles, each an <a> wrapping an image + an <h6> label.
 * cell 1 = tile image; cell 2 = the label made into a link (label text + tile href)
 * so the card's navigation target is preserved.
 */
export default function parse(element, { document }) {
  const tiles = Array.from(
    element.querySelectorAll('a.venrc5-navigation-card, a[class*="navigation-card"]'),
  );

  const cells = [];

  tiles.forEach((tile) => {
    const image = tile.querySelector('img');
    const titleEl = tile.querySelector('.venrc5-navigation-card__title, h1, h2, h3, h4, h5, h6');
    const href = tile.getAttribute('href');

    const contentCell = [];
    if (titleEl && href) {
      // Turn the label into a link so the tile's navigation target is preserved.
      const link = document.createElement('a');
      link.href = href;
      link.textContent = (titleEl.textContent || '').trim();
      contentCell.push(link);
    } else if (titleEl) {
      contentCell.push(titleEl);
    } else if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = href;
      contentCell.push(link);
    }

    if (!image && !contentCell.length) return;
    cells.push([image || '', contentCell]);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-nav', cells });
  element.replaceWith(block);
}
