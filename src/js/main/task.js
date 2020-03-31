import { DOMHelper } from '../helpers';

export default class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
  }

  header() {
    const header = DOMHelper.createElement(
      'div', ['card-header', 'text-muted']
    );

    header.textContent = this.priority;

    return header;
  }

  body() {
    const body = DOMHelper.createElement('div', ['card-body']);
    const title = DOMHelper.createElement('h3', ['card-title']);
    const text = DOMHelper.createElement('p', ['card-text']);

    title.textContent = this.title;
    text.textContent = this.description;
    body.append(title, text);

    return body;
  }

  footer() {
    const footer = DOMHelper.createElement(
      'div', ['card-footer', 'text-muted']
    );

    footer.textContent = this.dueDate;

    return footer;
  }

  render() {
    const box = DOMHelper.createElement('div', ['col-12', 'col-md-4']);
    const task = DOMHelper.createElement('div', ['card']);
    const taskHeader = this.header();
    const taskBody = this.body();
    const taskFooter = this.footer();

    task.append(taskHeader, taskBody, taskFooter);
    box.append(task);

    return box;
  }
}
