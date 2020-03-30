import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.min.css';

const HelloComponent = () => {
  const container = document.createElement('div');
  container.textContent = 'Hello world!';

  return container;
};

document.body.append(HelloComponent());