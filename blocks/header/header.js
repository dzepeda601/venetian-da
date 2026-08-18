import { getMetadata } from '../../scripts/aem.js';

/**
 * Fetch the nav fragment as plain HTML. Tries the canonical /content/nav.plain.html
 * first, then falls back to `${navPath}.plain.html` from the `nav` metadata.
 * @param {string} navPath resolved nav path (without extension)
 * @returns {Promise<Document|null>} parsed fragment document
 */
async function fetchNav(navPath) {
  const candidates = ['/content/nav.plain.html', `${navPath}.plain.html`];
  for (let i = 0; i < candidates.length; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const resp = await fetch(candidates[i]);
      if (resp.ok) {
        // eslint-disable-next-line no-await-in-loop
        const html = await resp.text();
        return new DOMParser().parseFromString(html, 'text/html');
      }
    } catch (e) {
      // try next candidate
    }
  }
  return null;
}

/**
 * Create an element with optional class names and children/text.
 * @param {string} tag tag name
 * @param {string|string[]} [classes] class or classes
 * @param {...(Node|string)} children child nodes or text
 */
function el(tag, classes, ...children) {
  const node = document.createElement(tag);
  if (classes) {
    (Array.isArray(classes) ? classes : [classes]).forEach((c) => c && node.classList.add(c));
  }
  children.forEach((child) => {
    if (child == null) return;
    node.append(child.nodeType ? child : document.createTextNode(child));
  });
  return node;
}

/** Clone an anchor from the source nav, preserving text/href and marking external/new-tab. */
function cloneLink(sourceAnchor) {
  const a = document.createElement('a');
  a.href = sourceAnchor.getAttribute('href') || '#';
  a.textContent = sourceAnchor.textContent.trim();
  const img = sourceAnchor.querySelector('img');
  if (img) a.prepend(img.cloneNode(true));
  if (a.hostname && a.hostname !== window.location.hostname) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  return a;
}

/** Toggle the whole navigation panel open/closed. */
function togglePanel(header, force) {
  const open = force != null ? force : !header.classList.contains('open');
  header.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  const button = header.querySelector('.nav-hamburger button');
  if (button) button.setAttribute('aria-expanded', String(open));
  if (!open) {
    // collapse any open sub-panel when closing
    header.querySelectorAll('.nav-subpanel.active').forEach((p) => p.classList.remove('active'));
    const panel = header.querySelector('.nav-panel');
    if (panel) panel.classList.remove('showing-sub');
  }
}

/** Show a specific sub-panel (level 2). */
function showSubPanel(panel, subPanel) {
  panel.querySelectorAll('.nav-subpanel.active').forEach((p) => p.classList.remove('active'));
  subPanel.classList.add('active');
  panel.classList.add('showing-sub');
}

/** Hide the current sub-panel and return to the top-level list. */
function hideSubPanel(panel) {
  panel.querySelectorAll('.nav-subpanel.active').forEach((p) => p.classList.remove('active'));
  panel.classList.remove('showing-sub');
}

/**
 * Build the fixed top bar from the brand/utility section.
 * @param {Element} brandSection first section of the nav fragment
 * @param {Function} onHamburger click handler for the hamburger
 */
function buildBar(brandSection, onHamburger) {
  const bar = el('div', 'nav-bar');

  // hamburger
  const hamburger = el('div', 'nav-hamburger');
  const button = el('button');
  button.type = 'button';
  button.setAttribute('aria-label', 'Menu');
  button.setAttribute('aria-expanded', 'false');
  button.append(el('span', 'nav-hamburger-icon'), el('span', 'nav-hamburger-label', 'Menu'));
  button.addEventListener('click', onHamburger);
  hamburger.append(button);

  // logo (first anchor with an image)
  const brandLink = brandSection.querySelector('p a');
  const brand = el('div', 'nav-brand');
  if (brandLink) brand.append(cloneLink(brandLink));

  // tools: utility links (Sign In / Search) + Check Rates CTA
  const tools = el('div', 'nav-tools');
  const utilityList = brandSection.querySelector('ul');
  if (utilityList) {
    utilityList.querySelectorAll(':scope > li > a').forEach((a) => {
      const text = a.textContent.trim().toLowerCase();
      // Sign In and Search live in the bar; Offers is panel-only
      if (text === 'sign in' || text === 'search') {
        const link = cloneLink(a);
        link.classList.add('nav-tools-link');
        tools.append(link);
      }
    });
  }
  const ctaLink = brandSection.querySelector('p strong a, p a strong');
  const cta = brandSection.querySelector('strong a');
  const ctaSource = cta || ctaLink;
  if (ctaSource) {
    const ctaEl = cloneLink(ctaSource);
    ctaEl.classList.add('nav-cta');
    tools.append(ctaEl);
  }

  bar.append(hamburger, brand, tools);
  return bar;
}

/**
 * Build the slide-out panel: header, top-level list + sub-panels, footer.
 * @param {Element} brandSection first section (for panel-header quick links + logo)
 * @param {Element} menuSection second section (8 top-level items)
 * @param {Element} footerSection third section (panel footer links)
 * @param {Function} onClose close handler
 */
function buildPanel(brandSection, menuSection, footerSection, onClose) {
  const panel = el('div', 'nav-panel');

  // --- panel header ---
  const panelHeader = el('div', 'nav-panel-header');
  const brandLink = brandSection.querySelector('p a');
  if (brandLink) {
    const logo = cloneLink(brandLink);
    logo.classList.add('nav-panel-logo');
    panelHeader.append(logo);
  }
  const quickLinks = el('div', 'nav-panel-quicklinks');
  const utilityList = brandSection.querySelector('ul');
  if (utilityList) {
    utilityList.querySelectorAll(':scope > li > a').forEach((a) => {
      const text = a.textContent.trim().toLowerCase();
      if (text === 'offers' || text === 'search') quickLinks.append(cloneLink(a));
    });
  }
  panelHeader.append(quickLinks);
  const closeBtn = el('button', 'nav-panel-close');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close Menu');
  closeBtn.addEventListener('click', onClose);
  panelHeader.append(closeBtn);
  panel.append(panelHeader);

  // --- panel body: top-level list ---
  const body = el('div', 'nav-panel-body');
  const topList = el('ul', 'nav-toplist');
  const subWrap = el('div', 'nav-subpanels');

  const topItems = menuSection.querySelectorAll(':scope > ul > li');
  topItems.forEach((item) => {
    const topLink = item.querySelector(':scope > a');
    if (!topLink) return;
    const label = topLink.textContent.trim();
    const hasSub = item.querySelector(':scope > ul, :scope > h1, :scope > h2, :scope > h3, :scope > h4');

    const li = el('li', 'nav-toplist-item');
    if (hasSub) {
      const trigger = el('button', 'nav-toplist-trigger');
      trigger.type = 'button';
      trigger.textContent = label;
      // build sub-panel
      const sub = el('div', 'nav-subpanel');
      const backBtn = el('button', 'nav-back');
      backBtn.type = 'button';
      backBtn.textContent = label;
      backBtn.setAttribute('aria-label', `Back from ${label}`);
      backBtn.addEventListener('click', () => hideSubPanel(panel));
      sub.append(backBtn);

      const content = el('div', 'nav-subpanel-content');
      const links = el('div', 'nav-subpanel-links');
      const images = el('div', 'nav-subpanel-images');
      // walk children in order to keep headings with their lists
      Array.from(item.children).forEach((child) => {
        const tag = child.tagName.toLowerCase();
        if (/^h[1-6]$/.test(tag)) {
          links.append(el('h3', 'nav-subpanel-heading', child.textContent.trim()));
        } else if (tag === 'ul') {
          const ul = el('ul', 'nav-subpanel-list');
          child.querySelectorAll(':scope > li > a').forEach((a) => {
            ul.append(el('li', null, cloneLink(a)));
          });
          links.append(ul);
        } else if (tag === 'p' && child.querySelector('img')) {
          images.append(child.querySelector('img').cloneNode(true));
        }
      });
      content.append(links);
      if (images.childElementCount > 0) content.append(images);
      sub.append(content);
      subWrap.append(sub);

      trigger.addEventListener('click', () => showSubPanel(panel, sub));
      li.append(trigger);
    } else {
      li.append(cloneLink(topLink));
    }
    topList.append(li);
  });

  body.append(topList, subWrap);
  panel.append(body);

  // --- panel footer ---
  const panelFooter = el('div', 'nav-panel-footer');
  if (footerSection) {
    const fList = footerSection.querySelector('ul');
    if (fList) {
      fList.querySelectorAll(':scope > li > a').forEach((a) => panelFooter.append(cloneLink(a)));
    }
  }
  // utility strip (Already Booked? Manage My Stay | Mobile Check-In) from brand section's 2nd list
  const utilLists = brandSection.querySelectorAll('ul');
  if (utilLists.length > 1) {
    const strip = el('div', 'nav-panel-utility');
    strip.append(el('span', 'nav-panel-utility-label', 'Already Booked?'));
    utilLists[utilLists.length - 1].querySelectorAll(':scope > li > a').forEach((a) => strip.append(cloneLink(a)));
    panelFooter.append(strip);
  }
  panel.append(panelFooter);

  return panel;
}

/**
 * Loads and decorates the header / navigation.
 * @param {Element} block the header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await fetchNav(navPath);

  block.textContent = '';
  if (!fragment) return;

  const sections = fragment.body.querySelectorAll(':scope > div');
  const brandSection = sections[0];
  const menuSection = sections[1];
  const footerSection = sections[2];
  if (!brandSection || !menuSection) return;

  const header = el('nav', 'nav');
  header.setAttribute('aria-label', 'Main navigation');

  const onHamburger = () => togglePanel(header);
  const onClose = () => togglePanel(header, false);

  const bar = buildBar(brandSection, onHamburger);
  const overlay = el('div', 'nav-overlay');
  overlay.addEventListener('click', onClose);
  const panel = buildPanel(brandSection, menuSection, footerSection, onClose);

  header.append(bar, overlay, panel);
  block.append(header);

  // scroll: toggle solid burgundy background
  const onScroll = () => {
    header.classList.toggle('solid', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // escape closes the panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('open')) onClose();
  });
}
