import { DOMHelper } from '../helpers';
import Instructions from '../../images/instructions';

export default (() => {
  const carousel = DOMHelper.createElement(
    'div',
    ['carousel', 'slide'],
    [
      { prop: 'data-ride', value: 'false' },
      { prop: 'id', value: 'infoCarousel' },
    ],
  );

  const carouselIndicator = DOMHelper.createElement(
    'ol',
    ['carousel-indicators'],
    [
      { prop: 'id', value: 'infoCarousel' },
    ],
  );

  const carouselInner = DOMHelper.createElement(
    'div',
    ['carousel-inner'],
    [
      { prop: 'data-ride', value: 'false' },
      { prop: 'id', value: 'infoCarousel' },
    ],
  );

  Instructions.forEach((instructions, index) => {
    const carouselItem = DOMHelper.createElement('div', [
      'carousel-item',
      'text-center',
    ]);
    const carouselCaption = DOMHelper.createElement('div', [
      'text-center',
      'd-none',
      'd-md-block',
    ]);
    const title = DOMHelper.createElement('h5', ['text-dark']);
    title.textContent = `Step ${index + 1}. ${instructions.title}`;
    carouselCaption.appendChild(title);
    const image = DOMHelper.createElement(
      'img',
      null,
      [{ prop: 'src', value: instructions.image }],
    );

    carouselItem.append(carouselCaption, image);

    carouselInner.appendChild(carouselItem);

    const li = DOMHelper.createElement('ol', null, [
      { prop: 'data-slide-to', value: index.toString() },
      { prop: 'data-target', value: '#infoCarousel' },
    ]);
    if (index === 0) {
      li.classList.add('active');
      carouselItem.classList.add('active');
    }
    carouselIndicator.appendChild(li);
  });

  const carouselPrev = DOMHelper.createElement(
    'a',
    ['carousel-control-prev'],
    [
      { prop: 'href', value: '#infoCarousel' },
      { prop: 'role', value: 'button' },
      { prop: 'data-slide', value: 'prev' },
    ],
  );

  const spanPrevIcon = DOMHelper.createElement(
    'span',
    ['carousel-control-prev-icon', 'bg-dark'],
    [{ prop: 'aria-hidden', value: 'true' }],
  );

  const spanPrev = DOMHelper.createElement('span', ['sr-only']);
  spanPrev.innerText = 'Previous';

  carouselPrev.append(spanPrevIcon, spanPrev);

  const carouselNext = DOMHelper.createElement(
    'a',
    ['carousel-control-next'],
    [
      { prop: 'href', value: '#infoCarousel' },
      { prop: 'role', value: 'button' },
      { prop: 'data-slide', value: 'next' },
    ],
  );

  const spanNextIcon = DOMHelper.createElement(
    'span',
    ['carousel-control-next-icon', 'bg-dark'],
    [{ prop: 'aria-hidden', value: 'true' }],
  );

  const spanNext = DOMHelper.createElement('span', ['sr-only']);
  spanPrev.innerText = 'Next';

  carouselNext.append(spanNextIcon, spanNext);

  carousel.append(carouselIndicator, carouselInner, carouselPrev, carouselNext);

  const modal = DOMHelper.createElement(
    'div',
    ['modal', 'fade'],
    [
      { prop: 'tabIndex', value: '-1' },
      { prop: 'role', value: 'dialog' },
      { prop: 'id', value: 'info-modal' },
      { prop: 'aria-labelledby', value: 'info-modal-label' },
      { prop: 'aria-hidden', value: 'true' },
    ],
  );

  const modalDialog = DOMHelper.createElement(
    'div',
    ['modal-dialog', 'modal-xl', 'modal-dialog-centered'],
    [
      { prop: 'role', value: 'document' },
    ],
  );

  const modalContent = DOMHelper.createElement('div', ['modal-content']);
  const modalHeader = DOMHelper.createElement('div', ['modal-header']);
  const modalFooter = DOMHelper.createElement('div', ['modal-footer']);
  const modalBody = DOMHelper.createElement('div', ['modal-body']);

  const modalTitle = DOMHelper.createElement(
    'h3',
    ['modal-title'],
    [
      { prop: 'id', value: 'info-modal-label' },
    ],
  );

  modalTitle.textContent = 'How to get started';

  const submitButton = DOMHelper.createElement(
    'button',
    ['btn'],
    [
      { prop: 'type', value: 'button' },
    ],
  );

  const closeButton = DOMHelper.createElement(
    'button',
    ['close'],
    [
      { prop: 'type', value: 'button' },
      { prop: 'data-dismiss', value: 'modal' },
      { prop: 'aria-lable', value: 'close' },
    ],
  );

  closeButton.innerHTML = '&times;';
  modalHeader.append(modalTitle, closeButton);
  modalFooter.append(submitButton);
  modalBody.appendChild(carousel);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  return modal;
})();
