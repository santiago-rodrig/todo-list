import { DOMHelper } from '../../helpers';

export default class Link {
  constructor(link) {
    this.linkName = link;
  }

  render() {
    const link = DOMHelper.createElement(
      'a',
      ['dropdown-item'],
      [{ prop: 'href', value: '#' }],
    );

    link.innerText = this.linkName;
    return link;
  }
}
