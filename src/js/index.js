/* eslint-disable import/no-unresolved */
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'alertifyjs/build/css/alertify.min.css';
/* eslint-enable import/no-unresolved */

import '../scss/main.scss';
import header from './header';
import footer from './footer';
import main from './main';
import tasksModal from './tasks/modal';
import infoModal from './header/modal';

document.body.append(
  header, main, footer, tasksModal, infoModal,
);
