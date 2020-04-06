import { DOMHelper } from '../helpers';

export default class Footer {
  constructor() {
    this.linkIcons = {
      twitter: '<i class="fab fa-twitter"></i>',
      facebook: '<i class="fab fa-facebook-f"></i>',
      linkedIn: '<i class="fab fa-linkedin-in"></i>',
    };
  }

  copyRight() {
    const p = DOMHelper.createElement('p', ['text-center', 'text-light']);

    p.innerHTML = '&copy; Sharmarke Ahmed and Santiago Rodríguez';

    return p;
  }

  link(prop) {
    const a = DOMHelper.createElement('a', [], [{ prop: 'href', value: '#' }]);
    const li = DOMHelper.createElement(
      'li',
      ['list-group-item'],
    );

    a.innerHTML = this.linkIcons[prop];
    li.appendChild(a);

    return li;
  }

  links() {
    const linkProps = Object.keys(this.linkIcons);

    const ul = DOMHelper.createElement(
      'ul',
      ['list-group',
        'list-group-horizontal',
        'justify-content-center',
        'mb-4',
      ],
    );

    linkProps.forEach(prop => ul.appendChild(this.link(prop)));

    return ul;
  }

  footer() {
    const footer = DOMHelper.createElement('footer', ['bg-dark', 'py-5']);

    footer.id = 'main-footer';

    return footer;
  }

  render() {
    const footer = this.footer();
    const links = this.links();
    const copyRight = this.copyRight();

    footer.append(links, copyRight);

    return footer;
  }
}
