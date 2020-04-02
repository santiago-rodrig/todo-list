import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../scss/main.scss';
import Header from './header';
import Footer from './footer';
import Main from './main';
import Sidebar from './main/sidebar';
import Form from './main/form';
import { DOMHelper } from './helpers';

const header = new Header();
const footer = new Footer();

function editTaskModal() {
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

  const modalTitle = DOMHelper.createElement(
    'h3',
    ['modal-title'],
    [
      { prop: 'id', value: 'tasks-modal-label' },
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

  const modalBody = DOMHelper.createElement('div', ['modal-body']);
  const form = new Form('add');
  modalBody.append(form.render());
  modalTitle.textContent = 'Editing task';
  closeButton.innerHTML = '&times;';
  modalHeader.append(modalTitle, closeButton);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  return modal;
}

const main = new Main();

document.body.append(
  header.render(), main.render(), footer.render(), editTaskModal(),
);
