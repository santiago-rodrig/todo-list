import { DOMHelper } from '../../helpers';

export default class Navigation {
  constructor() {
    this.navList = [
      'Home',
    ];
  }

  renderDropdown() {
    const container = DOMHelper.createElement('li', ['nav-item']);
    const anchor = DOMHelper.createElement(
      'a',
      ['nav-link', 'text-dark'],
      [
        { prop: 'href', value: '#' },
        { prop: 'data-toggle', value: 'modal' },
        { prop: 'data-target', value: '#info-modal' },
      ],
    );
    const icon = DOMHelper.createElement('i', ['fas', 'fa-info-circle']);
    anchor.append(icon);
    container.append(anchor);
    return container;
  }

  render() {
    const container = DOMHelper.createElement('ul', ['nav', 'justify-content-end']);
    container.appendChild(this.renderDropdown());
    return container;
  }
}
