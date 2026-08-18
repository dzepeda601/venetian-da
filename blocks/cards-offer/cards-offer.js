import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Number of cards visible at once, by breakpoint. Matches the source slider
 * (3 up on desktop, 2 on tablet, 1 on mobile).
 */
function cardsPerView() {
  if (window.matchMedia('(width >= 900px)').matches) return 3;
  if (window.matchMedia('(width >= 600px)').matches) return 2;
  return 1;
}

/**
 * Wire the prev/next arrows to scroll the track by one "page" of cards and
 * keep the arrows enabled/disabled at the ends.
 * @param {Element} block the cards-offer block
 * @param {HTMLUListElement} track the scrollable card list
 */
function initCarousel(block, track) {
  const prev = block.querySelector('.cards-offer-prev');
  const next = block.querySelector('.cards-offer-next');

  const scrollByPage = (dir) => {
    const first = track.querySelector('li');
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = (first.getBoundingClientRect().width + gap) * cardsPerView();
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  };

  prev.addEventListener('click', () => scrollByPage(-1));
  next.addEventListener('click', () => scrollByPage(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  // Defer the first state read until after layout so scrollWidth is measured
  // (otherwise "next" wrongly reports disabled on load).
  update();
  requestAnimationFrame(update);
  window.addEventListener('load', update);
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-offer-card-image';
      else div.className = 'cards-offer-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';

  // Carousel: horizontal track + prev/next controls (source shows a 3-up slider).
  const viewport = document.createElement('div');
  viewport.className = 'cards-offer-viewport';
  ul.classList.add('cards-offer-track');
  viewport.append(ul);

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'cards-offer-prev';
  prev.setAttribute('aria-label', 'Previous');

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'cards-offer-next';
  next.setAttribute('aria-label', 'Next');

  block.append(prev, viewport, next);

  initCarousel(block, ul);
}
