import { DOMHelper } from '../../../../Helpers';

export default class Links {
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