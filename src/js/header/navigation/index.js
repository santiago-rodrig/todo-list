import { DOMHelper } from '../../helpers';
import Link from './links';

export default class Navigation {
  constructor() {
    this.navList = [
      'Home',
    ];
  }

  renderDropdown() {
    const container = DOMHelper.createElement('li', ['nav-item', 'dropleft']);
    const anchor = DOMHelper.createElement(
      'a',
      ['nav-link', 'dropdown-toggle', 'text-white'],
      [
        { prop: 'data-toggle', value: 'dropdown' },
        { prop: 'href', value: '#' },
        { prop: 'role', value: 'button' },
        { prop: 'aria-haspopup', value: 'true' },
        { prop: 'aria-expanded', value: 'false' },
      ],
    );
    const menuContainer = DOMHelper.createElement('li', ['dropdown-menu']);
    const icon = DOMHelper.createElement('i', ['fas', 'fa-cog']);
    anchor.append(icon);
    container.append(anchor, this.loopNavLinks(menuContainer));
    return container;
  }

  loopNavLinks(container) {
    let link;

    this.navList.forEach((navItem) => {
      link = new Link(navItem);
      container.appendChild(link.render());
    });

    return container;
  }

  render() {
    const container = DOMHelper.createElement('ul', ['nav', 'justify-content-end']);
    container.appendChild(this.renderDropdown());
    return container;
  }
}
