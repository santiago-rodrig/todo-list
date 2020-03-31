import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/main.scss';
import Header from './header';
import Footer from './footer';
import Main from './main';

const footer = new Footer();
const main = new Main();

document.body.append(
  main.render(),
  footer.render()
);
