import { DOMHelper } from '../../../../Helpers';
import Links from './links';

export default class Navigation {
  constructor() {
    this.navList = [
      'Home',
    ];
  }

  loopNavLinks(container) {
    this.navList.forEach((navItem) => {
      container.appendChild(new Links(navItem).render());
    });
    return container;
  }

  render() {
    const container = DOMHelper.createElement('ul', ['nav', 'justify-content-end']);
    return this.loopNavLinks(container);
  }
}