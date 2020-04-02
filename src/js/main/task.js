import { DOMHelper, TodoStorage } from '../helpers';
import Form from './form';

export default class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.id = this.title.trim().split(' ').map(
      e => e.toLowerCase().trim().replace(/\W/gi, ''),
    ).join('-');
  }

  header() {
    const header = DOMHelper.createElement(
      'div', ['card-header', 'bg-dark'],
    );

    const flexContainer = DOMHelper.createElement(
      'div', ['d-flex', 'justify-content-between', 'bg-dark'],
    );

    const deleteAction = DOMHelper.createElement(
      'div', ['text-danger', 'task-action'],
    );

    const priority = DOMHelper.createElement('div', ['text-light']);

    priority.textContent = this.priority;
    deleteAction.innerHTML = '<i class="fas fa-window-close"></i>';
    deleteAction.addEventListener('click', this.deleteHandler.bind(this));
    flexContainer.append(priority, deleteAction);
    header.append(flexContainer);

    return header;
  }

  deleteHandler() {
    const task = document.getElementById(this.id);

    const fadeEffect = setInterval(() => {
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
    const storage = new TodoStorage();
    storage.deleteTask(this.id);
  }

  completeHandler() {
    const task = document.getElementById(this.id);

    const fadeEffect = setInterval(() => {
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
    const storage = new TodoStorage();
    storage.completeTask(this.id);
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

  setEditTaskForm(task) {
    const form = new Form('edit', this);
    console.log(form);
    const tasksModalBody = document.querySelector('#tasks-modal .modal-body');
    console.log(tasksModalBody);

    tasksModalBody.removeChild(tasksModalBody.firstChild);
    tasksModalBody.append(form.render());
  }

  footer() {
    const footer = DOMHelper.createElement(
      'div', ['card-footer', 'bg-dark'],
    );

    const flexContainer = DOMHelper.createElement(
      'div', ['d-flex', 'justify-content-between', 'bg-dark', 'p-2'],
    );

    const completeAction = DOMHelper.createElement(
      'div', ['text-success', 'task-action'],
    );

    const editAction = DOMHelper.createElement(
      'div',
      ['text-light', 'task-action', 'mr-2'],
      [
        { prop: 'data-toggle', value: 'modal' },
        { prop: 'data-target', value: '#tasks-modal' },
      ],
    );

    const actions = DOMHelper.createElement('div', ['d-flex']);

    const dueDate = DOMHelper.createElement('div', ['text-light']);

    dueDate.textContent = this.dueDate;
    completeAction.innerHTML = '<i class="fas fa-check-square"></i>';
    editAction.innerHTML = '<i class="fas fa-edit"></i>';
    editAction.addEventListener('click', this.setEditTaskForm.bind(this));
    completeAction.addEventListener('click', this.completeHandler.bind(this));
    actions.append(editAction, completeAction);
    flexContainer.append(dueDate, actions);
    footer.append(flexContainer);

    return footer;
  }

  render() {
    const box = DOMHelper.createElement(
      'div', ['col-12', 'col-lg-6', 'my-4'],
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

    return box;
  }
}
