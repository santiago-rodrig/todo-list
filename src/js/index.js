import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

const hello_component = () => {
  const container = document.createElement('div')
  container.textContent = 'Hello world!';

  return container;
}

document.body.append(hello_component());
