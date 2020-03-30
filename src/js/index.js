import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './home/header';

const HelloComponent = () => {
  const container = document.createElement('div');
  container.appendChild(new Header().render());

  return container;
};

document.body.append(HelloComponent());