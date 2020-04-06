import { DOMHelper } from '../helpers';
import demo from '../../images/instructions/demo.gif';

export default (() => {
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

  const instructions = new Image();

  instructions.src = demo;
  instructions.classList.add('w-100', 'd-block');
  modalTitle.textContent = 'How to get started';
  closeButton.innerHTML = '&times;';
  modalHeader.append(modalTitle, closeButton);
  modalFooter.append(submitButton);
  modalBody.appendChild(instructions);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  return modal;
})();
