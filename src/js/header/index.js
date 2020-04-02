import { DOMHelper } from '../helpers';
import Navigation from './navigation';

export default class Header {
  renderJumboTron() {
    const jumbotron = DOMHelper.createElement('div', [
      'jumbotron',
      'jumbotron-fluid',
      'bg-transparent',
    ]);
    const container = DOMHelper.createElement('div', [
      'container',
    ]);
    const h1 = DOMHelper.createElement('h1', ['display-4', 'text-center']);
    const p = DOMHelper.createElement('p', ['lead', 'text-center']);

    h1.innerText = 'A handy TODO-List app';
    p.innerText = 'Use it to manage your day to day life with ease';

    container.append(h1, p);
    jumbotron.appendChild(container);
    return jumbotron;
  }

  render() {
    const container = DOMHelper.createElement('header', [
      'container-fluid',
      'p-4',
      'mb-5',
    ]);
    const row = DOMHelper.createElement('div', ['row', 'align-items-start']);
    const placeHolderCol = DOMHelper.createElement('div', ['col-lg-4', 'col-md-0', 'col-sm-0']);
    const jumboContainer = DOMHelper.createElement('div', ['col-lg-4', 'col-md-8', 'col-sm-8']);
    const navContainer = DOMHelper.createElement('div', ['col-lg-4', 'col-md-4', 'col-sm-4']);
    const navigation = new Navigation();
    navContainer.appendChild(navigation.render());
    jumboContainer.appendChild(this.renderJumboTron());
    row.append(placeHolderCol, jumboContainer, navContainer);

    container.appendChild(row);
    return container;
  }
}
