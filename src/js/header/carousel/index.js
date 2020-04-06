import { DOMHelper } from '../../helpers';
import items from './items';

const carousel = DOMHelper.createElement(
  'div',
  ['carousel', 'slide'],
  [
    { prop: 'data-ride', value: 'carousel' },
    { prop: 'id', value: 'instructions' },
  ],
);

const indicators = DOMHelper.createElement(
  'ol',
  ['carousel-indicators', 'bg-dark']
);
const inner = DOMHelper.createElement('div', ['carousel-inner']);

items.forEach((item, i) => {
  const itemElement = DOMHelper.createElement('div', ['carousel-item']);

  const indicator = DOMHelper.createElement(
    'li',
    null,
    [
      { prop: 'data-target', value: '#instructions' },
      { prop: 'data-slide-to', value: i.toString() }
    ]
  );

  itemElement.append(item.image);
  inner.append(itemElement);
  indicators.append(indicator);
});

inner.firstChild.classList.add('active');
indicators.firstChild.classList.add('active');

const prev = DOMHelper.createElement(
  'a',
  ['carousel-control-prev'],
  [
    { prop: 'href', value: '#instructions' },
    { prop: 'role', value: 'button' },
    { prop: 'data-slide', value: 'prev' },
  ],
);

const prevIcon = DOMHelper.createElement(
  'span',
  ['carousel-control-prev-icon', 'bg-dark'],
  [{ prop: 'aria-hidden', value: 'true' }],
);

const prevText = DOMHelper.createElement('span', ['sr-only']);

prevText.innerText = 'Previous';
prev.append(prevIcon, prevText);

const next = DOMHelper.createElement(
  'a',
  ['carousel-control-next'],
  [
    { prop: 'href', value: '#instructions' },
    { prop: 'role', value: 'button' },
    { prop: 'data-slide', value: 'next' },
  ],
);

const nextIcon = DOMHelper.createElement(
  'span',
  ['carousel-control-next-icon', 'bg-dark'],
  [{ prop: 'aria-hidden', value: 'true' }],
);

const nextText = DOMHelper.createElement('span', ['sr-only']);

nextText.innerText = 'Next';
next.append(nextIcon, nextText);
carousel.append(indicators, inner, prev, next);

export default carousel;
