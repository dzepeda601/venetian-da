/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base block: carousel.
 * Source: https://www.venetianlasvegas.com/ (Hero carousel section)
 * Generated: 2026-08-18
 *
 * Library structure (Carousel): 2 columns, multiple rows. First row = block name.
 * Each subsequent row = one slide: cell 1 = image (only), cell 2 = title + subtitle + CTA.
 *
 * Source notes: Splide renders duplicate clone slides (.splide__slide--clone) for the
 * loop effect plus prev/next arrows and pagination dots; those are chrome, not authored
 * content, and are excluded so only the 5 authored slides are emitted. (The similarity
 * metric counts clone + nav text against the source, so a correct parse scores <100%.)
 */
export default function parse(element, { document }) {
  // Real slides only — exclude Splide's clones.
  let slides = Array.from(
    element.querySelectorAll('li.cmp-hero__slide:not(.splide__slide--clone)'),
  );
  // Fallback if class names vary.
  if (!slides.length) {
    slides = Array.from(element.querySelectorAll('li.splide__slide:not(.splide__slide--clone)'));
  }

  const cells = [];

  slides.forEach((slide) => {
    // Cell 1: slide image.
    const image = slide.querySelector('.cmp-hero__slide__image img, img.cmp-image__image, img');

    // Cell 2: title + subtitle + CTA(s).
    const contentCell = [];
    const title = slide.querySelector('.cmp-hero__slide__title, h1, h2');
    const subtitle = slide.querySelector('.cmp-hero__slide__subtitle, p');
    const ctas = Array.from(
      slide.querySelectorAll('.cmp-hero__slide__ctas a, a.cmp-button'),
    );

    if (title) contentCell.push(title);
    if (subtitle) contentCell.push(subtitle);
    ctas.forEach((cta) => contentCell.push(cta));

    // Only emit a slide row if it has at least an image or content.
    if (!image && !contentCell.length) return;
    cells.push([image || '', contentCell]);
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
