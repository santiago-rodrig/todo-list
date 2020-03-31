import { DOMHelper } from '../helpers';

export default class Sidebar {
  renderProjectItem(projectName, active = false) {
    const item = DOMHelper.createElement('button', [
      'list-group-item',
      'list-group-item-action',
    ], [{ prop: 'type', value: 'button' }]);
    item.textContent = projectName;
    if (active) item.classList.add('active');
    return item;
  }

  loopProjects() {}

  renderProjectList() {
    const container = DOMHelper.createElement('div', ['list-group', 'row']);
    container.appendChild(this.renderProjectItem('Default', true));
    container.appendChild(this.renderProjectItem('Default', false));
    container.appendChild(this.renderProjectItem('Default', false));
    return container;
  }

  renderHeading() {
    const container = DOMHelper.createElement('div', ['row']);
    const h1 = DOMHelper.createElement('h1', ['text-center']);
    h1.textContent = 'Projects';
    container.appendChild(h1);
    return container;
  }

  render() {
    const container = DOMHelper.createElement('div', [
      'col-12',
      'col-md-4',
      'border-right',
      'shadow',
    ]);
    container.append(this.renderHeading(), this.renderProjectList());
    return container;
  }
}
