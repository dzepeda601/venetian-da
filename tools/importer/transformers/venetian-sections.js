/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Venetian Las Vegas section breaks and section metadata.
 *
 * Template "homepage" has 10 sections (page-templates.json). Section selectors
 * are DOM-verified boundaries from page analysis and are used directly.
 *
 * Styled sections (require Section Metadata blocks):
 *   section-3  Tower comparison            style: burgundy
 *   section-6  Awards & Recognition        style: burgundy
 *   section-7  Venetian Rewards feature    style: navy
 *   section-9  Entertainment               style: burgundy
 *   section-10 Ready to Stay teaser bar    style: burgundy
 *
 * Breaks inserted in beforeTransform (while every section element still exists,
 * before block parsers replace them). Section Metadata inserted in afterTransform,
 * anchored to a marker <hr> (or the original element for the first section).
 * Sections processed in reverse so live-element inserts never shift unprocessed
 * sections. See references/generate-import-transformer.md "Why both hooks".
 */

const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = (payload.template && payload.template.sections) || [];

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no leading break needed
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue; // selector didn't match on this page — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || element.querySelector(section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}
