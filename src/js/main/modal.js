import { DOMHelper } from '../helpers';

export default (() => {
  const modal = DOMHelper.createElement(
    'div',
    ['modal', 'fade'],
    [
      { prop: 'tabIndex', value: '-1' },
      { prop: 'role', value: 'dialog' },
      { prop: 'id', value: 'tasks-modal' },
      { prop: 'aria-labelledby', value: 'tasks-modal-label' },
      { prop: 'aria-hidden', value: 'true' },
    ],
  );

  const modalDialog = DOMHelper.createElement(
    'div',
    ['modal-dialog'],
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
      { prop: 'id', value: 'tasks-modal-label' },
    ],
  );

  const submitButton = DOMHelper.createElement(
    'button',
    ['btn'],
    [
      { prop: 'type', value: 'button' }
    ]
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
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  return modal;
})();
