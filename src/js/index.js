/* eslint-disable import/no-unresolved */
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'alertifyjs/build/css/alertify.min.css';
/* eslint-enable import/no-unresolved */

import '../scss/main.scss';
import Header from './header';
import Footer from './footer';
import Main from './main';
import TasksModal from './tasks/modal';
import InfoModal from './header/modal';

const header = new Header();
const footer = new Footer();
const main = new Main();

document.body.append(
  header.render(), main.render(), footer.render(), TasksModal, InfoModal,
);
