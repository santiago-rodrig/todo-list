import { DOMHelper } from '../helpers';

export default (() => {
  const linkIcons = {
    twitter: '<i class="fab fa-twitter"></i>',
    facebook: '<i class="fab fa-facebook-f"></i>',
    linkedIn: '<i class="fab fa-linkedin-in"></i>',
  };

  function copyRight() {
    const p = DOMHelper.createElement('p', ['text-center', 'text-light']);

    p.innerHTML = '&copy; Sharmarke Ahmed and Santiago Rodríguez';

    return p;
  }

  function link(prop) {
    const a = DOMHelper.createElement('a', [], [{ prop: 'href', value: '#' }]);
    const li = DOMHelper.createElement(
      'li',
      ['list-group-item'],
    );

    a.innerHTML = linkIcons[prop];
    li.appendChild(a);

    return li;
  }

  function links() {
    const linkProps = Object.keys(linkIcons);

    const ul = DOMHelper.createElement(
      'ul',
      ['list-group',
        'list-group-horizontal',
        'justify-content-center',
        'mb-4',
      ],
    );

    linkProps.forEach(prop => ul.appendChild(link(prop)));

    return ul;
  }

  function footer() {
    const footer = DOMHelper.createElement('footer', ['bg-dark', 'py-5']);

    footer.id = 'main-footer';

    return footer;
  }

  const footerElement = footer();
  const linksElement = links();
  const copyRightElement = copyRight();

  footerElement.append(linksElement, copyRightElement);

  return footerElement;
})();
