import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../scss/main.scss';
import Header from './header';
import Footer from './footer';
import Main from './main';
import Sidebar from './main/sidebar';
import Modal from './main/modal';
import { DOMHelper } from './helpers';

const header = new Header();
const footer = new Footer();
const main = new Main();

document.body.append(
  header.render(), main.render(), footer.render(), Modal,
);
