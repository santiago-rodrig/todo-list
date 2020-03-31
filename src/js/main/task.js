import { DOMHelper } from '../helpers';

export default class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
  }

  render() {
    const box = DOMHelper.createElement('div', ['col-12']);
    const task = DOMHelper.createElement('div', ['card']);
    const taskBody = DOMHelper.createElement('div', ['card-body']);

    const taskFooter = DOMHelper.createElement(
      'div', ['card-footer', 'text-muted']
    );

    const taskHeader = DOMHelper.createElement(
      'div', ['card-header', 'text-muted']
    );

    const title = DOMHelper.createElement('h3', ['card-title']);
    const description = DOMHelper.createElement('p', ['card-text']);
    const dueDate = DOMHelper.createElement('span', ['task-due-date']);
    const priority = DOMHelper.createElement('span', ['task-priority']);

    title.textContent = this.title;
    description.textContent = this.description;
    dueDate.textContent = this.dueDate;
    priority.textContent = this.priority;
    taskHeader.append(priority);
    taskFooter.append(dueDate);
    taskBody.append(title, description);
    task.append(taskHeader, taskBody, taskFooter);
    box.append(task);

    return box;
  }
}
