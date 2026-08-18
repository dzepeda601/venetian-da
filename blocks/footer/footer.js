import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Tag the footer sub-sections so the CSS can lay them out to match the source:
 * - first section = content zone (logo, phones, social icons, nav links)
 * - last section  = legal bar (copyright + legal links)
 * All copy/links/images come from the fetched fragment; nothing is hardcoded here.
 * @param {Element} footer The footer wrapper containing the fragment sections
 */
function decorateSections(footer) {
  const sections = [...footer.children].filter((el) => el.tagName === 'DIV');
  const [content, legal] = sections;

  if (content) {
    content.classList.add('footer-content');

    // logo / phone paragraphs
    content.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('a[href^="tel:"]')) p.classList.add('footer-phone');
      else if (p.querySelector('img')) p.classList.add('footer-logo');
    });

    // first list holds social links, the other holds nav links
    content.querySelectorAll('ul').forEach((ul) => {
      const hasSocial = [...ul.querySelectorAll('a')]
        .some((a) => /facebook|x\.com|instagram|pinterest|youtube|tripadvisor/i.test(a.href));
      ul.classList.add(hasSocial ? 'footer-social' : 'footer-links');
      if (hasSocial) {
        ul.querySelectorAll('a').forEach((a) => {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener');
        });
      }
    });
  }

  if (legal) legal.classList.add('footer-legal');
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (content lives under /content for this project)
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/content/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  decorateSections(footer);

  block.append(footer);
}
