import { DOMHelper } from '../../helpers';

export default class Link {
  constructor(link) {
    this.linkName = link;
  }

  render() {
    const link = DOMHelper.createElement('li', ['nav-item']);
    const anchor = DOMHelper.createElement('a', ['nav-link'], [{ prop: 'href', value: '#' }]);

    anchor.innerText = this.linkName;
    link.appendChild(anchor);

    return link;
  }
}
