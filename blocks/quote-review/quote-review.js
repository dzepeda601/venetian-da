export default async function decorate(block) {
  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');

  // Diamond emblem + "Traveler Review" label (decoration) — matches the source
  const emblem = document.createElement('div');
  emblem.className = 'quote-review-emblem';
  const emblemImg = document.createElement('img');
  emblemImg.src = '/media/review-diamond.png';
  emblemImg.alt = 'A gold-colored icon of a sparkling diamond';
  emblemImg.loading = 'lazy';
  const emblemLabel = document.createElement('span');
  emblemLabel.textContent = 'Traveler Review';
  emblem.append(emblemImg, emblemLabel);
  blockquote.append(emblem);

  // 5-star rating (decoration) — matches the source's featured review (5.0 of 5)
  const rating = document.createElement('div');
  rating.className = 'quote-review-rating';
  rating.setAttribute('role', 'img');
  rating.setAttribute('aria-label', '5 out of 5 stars');
  rating.textContent = '★★★★★';
  blockquote.append(rating);

  // decorate quotation
  quotation.className = 'quote-review-quotation';
  blockquote.append(quotation);
  // decoration attribution
  if (attribution) {
    attribution.className = 'quote-review-attribution';
    blockquote.append(attribution);
    const ems = attribution.querySelectorAll('em');
    ems.forEach((em) => {
      const cite = document.createElement('cite');
      cite.innerHTML = em.innerHTML;
      em.replaceWith(cite);
    });
  }
  block.innerHTML = '';
  block.append(blockquote);
}
