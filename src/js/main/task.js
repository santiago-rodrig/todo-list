import { DOMHelper, TodoStorage } from '../helpers';

const storage = new TodoStorage();

export default class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.id = this.title.trim().split(' ').map(
      e => e.toLowerCase().trim().replace(/\W/gi, '')
    ).join('-');
  }

  header() {
    const header = DOMHelper.createElement(
      'div', ['card-header', 'bg-dark', 'text-light']
    );

    header.textContent = this.priority;

    return header;
  }

  deleteHandler() {
    const task = document.getElementById(this.id);

    const fadeEffect = setInterval(function () {
      if (!task.style.opacity) {
        task.style.opacity = 1;
      }

      if (task.style.opacity > 0) {
        task.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        task.parentNode.removeChild(task);
      }
    }, 8);

    storage.deleteTask(this.id);
  }

  completeHandler() {
    const task = document.getElementById(this.id);

    const fadeEffect = setInterval(function () {
      if (!task.style.opacity) {
        task.style.opacity = 1;
      }

      if (task.style.opacity > 0) {
        task.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        task.parentNode.removeChild(task);
      }
    }, 8);

    storage.completeTask(this.id);
  }

  actions() {
    const flexContainer = DOMHelper.createElement(
      'div', ['d-flex', 'justify-content-end', 'bg-dark', 'p-2']
    );

    const deleteAction = DOMHelper.createElement(
      'div', ['text-danger', 'mx-2', 'task-action']
    );

    const completeAction = DOMHelper.createElement(
      'div', ['text-success', 'task-action']
    );

    deleteAction.innerHTML = '<i class="fas fa-window-close"></i>';
    completeAction.innerHTML = '<i class="fas fa-check-square"></i>';
    deleteAction.addEventListener('click', this.deleteHandler.bind(this));
    completeAction.addEventListener('click', this.completeHandler.bind(this));
    flexContainer.append(completeAction, deleteAction);

    return flexContainer;
  }

  body() {
    const body = DOMHelper.createElement('div', ['card-body']);
    const title = DOMHelper.createElement('h3', ['card-title']);
    const text = DOMHelper.createElement('p', ['card-text']);
    const actions = this.actions();

    title.textContent = this.title;
    text.textContent = this.description;
    body.append(title, text, actions);

    return body;
  }

  footer() {
    const footer = DOMHelper.createElement(
      'div', ['card-footer', 'bg-dark', 'text-light']
    );

    footer.textContent = this.dueDate;

    return footer;
  }

  render() {
    const box = DOMHelper.createElement(
      'div', ['col-12', 'col-md-6', 'my-4']
    );

    const task = DOMHelper.createElement('div', ['card']);

    switch (this.priority) {
      case 'important':
        task.classList.add('bg-danger');
        break;
      case 'optional':
        task.classList.add('bg-secondary');
        break;
      default:
        task.classList.add('bg-light');
        break;
    }

    const taskHeader = this.header();
    const taskBody = this.body();
    const taskFooter = this.footer();

    task.append(taskHeader, taskBody, taskFooter);
    box.append(task);
    box.id = this.id;
    box.classList.add('toggle-content', 'is-visible');

    return box;
  }
}
