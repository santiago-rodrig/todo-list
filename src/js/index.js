import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/main.scss';
import Header from './header';
import Footer from './footer';

const footer = new Footer();

document.body.appendChild(footer.render());
