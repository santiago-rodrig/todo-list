import { DOMHelper } from '../helpers';
import infoIcon from './info_icon';

export default (() => {
  const jumbotron = DOMHelper.createElement('div', [
    'jumbotron',
    'jumbotron-fluid',
    'bg-transparent',
    'text-center',
  ]);

  const h1 = DOMHelper.createElement('h1');
  const p = DOMHelper.createElement('p', ['lead']);

  h1.innerText = 'A handy TODO-List app';
  p.innerText = 'Use it to manage your day to day life with ease';
  jumbotron.append(h1, p);

  const container = DOMHelper.createElement(
    'header',
    ['p-5', 'position-relative'],
  );

  container.append(jumbotron, infoIcon);

  return container;
})();
