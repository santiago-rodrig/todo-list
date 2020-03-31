import { DOMHelper } from '../../helpers';
import Link from './links';

export default class Navigation {
  constructor() {
    this.navList = [
      'Home',
    ];
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
    return this.loopNavLinks(container);
  }
}
