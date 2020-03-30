import { DOMHelper } from '../../../../Helpers';

export default class Links {
  constructor() {
    this.navList = [
      'Home',
    ];
  }

  renderLinkItem(nav) {
    const link = DOMHelper.createElement('li', ['nav-item']);
    const anchor = DOMHelper.createElement('li', ['nav-link'], [{ prop: 'href', value: '#' }]);
    anchor.innerText = nav;
    link.appendChild(anchor);
    return link;
  }

  render() {
    const container = DOMHelper.createElement('ul', ['nav', 'justify-content-end']);
  }
}