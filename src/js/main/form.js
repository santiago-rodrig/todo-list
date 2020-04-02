import moment from 'moment';
import TasksController from './tasks_controller';
import { DOMHelper, TodoStorage } from '../helpers';

export default class Form {
  constructor(prefix, task) {
    // things like add-* or edit-*
    this.prefix = prefix;
    this.task = task;
    // you'll set previous id when creating an update form
  }

  buildTask() {
    const title = document.getElementById(`${this.prefix}-task-title`).value;
    const description = document.getElementById(`${this.prefix}-task-description`).value;
    const priority = document.getElementById(`${this.prefix}-task-importance`).value;
    let dueDate = document.getElementById(`${this.prefix}-task-due-date`).value;
    const dueTime = document.getElementById(`${this.prefix}-task-due-time`).value;
    const task = { title, description, priority };

    const taskId = title.trim().split(' ').map(e => {
      return e.trim().toLowerCase().replace(/\W/gi, '')
    }).join('-');

    task.id = taskId;

    if (dueDate && !dueTime) {
      dueDate = moment(dueDate).format('MMM Do YYYY');
    } else if (dueTime && !dueDate) {
      dueDate = moment().format('Y-MM-DD') + 'T' + dueTime;
      dueDate = moment(dueDate).format('MMM Do YYYY HH:mm');
    } else if (!dueTime && !dueDate) {
      dueDate = 'No due date';
    } else {
      dueDate = moment(dueDate + 'T' + dueTime).format('MMM Do YYYY HH:mm');
    }

    task.dueDate = dueDate;

    return task;
  }

  clearFields() {
    const title = document.getElementById(`${this.prefix}-task-title`);
    const description = document.getElementById(`${this.prefix}-task-description`);
    const priority = document.getElementById(`${this.prefix}-task-priority`);
    const dueDate = document.getElementById(`${this.prefix}-task-due-date`);

    [title, description, dueDate].forEach(e => { e.value = ''; });
    priority.value = 'normal';
  }

  title() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: `${this.prefix}-task-title` }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: `${this.prefix}-task-title` },
        { prop: 'name', value: `${this.prefix}-task-title` },
        { prop: 'type', value: 'text' },
      ],
    );

    label.textContent = 'Title';
    wrapper.append(label, input);

    return wrapper;
  }

  priority() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: `${this.prefix}-task-priority` }],
    );

    const input = DOMHelper.createElement(
      'select',
      ['form-control'],
      [
        { prop: 'id', value: `${this.prefix}-task-priority` },
        { prop: 'name', value: `${this.prefix}-task-priority` },
      ],
    );

    const normal = document.createElement('option');
    const important = document.createElement('option');
    const optional = document.createElement('option');

    label.textContent = 'Priority';
    normal.textContent = 'normal';
    normal.setAttribute('selected', 'selected');
    important.textContent = 'important';
    optional.textContent = 'optional';
    input.append(normal, important, optional);
    wrapper.append(label, input);

    return wrapper;
  }

  dueDate() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: `${this.prefix}-task-due-date` }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: `${this.prefix}-task-due-date` },
        { prop: 'name', value: `${this.prefix}-task-due-date` },
        { prop: 'type', value: 'date' },
      ],
    );

    label.textContent = 'Due date';
    wrapper.append(label, input);

    return wrapper;
  }

  dueTime() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: `${this.prefix}-task-due-time` }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: `${this.prefix}-task-due-time` },
        { prop: 'name', value: `${this.prefix}-task-due-time` },
        { prop: 'type', value: 'time' },
      ],
    );

    label.textContent = 'Due Time';
    wrapper.append(label, input);

    return wrapper;
  }

  submitButton() {
    const submitButton = DOMHelper.createElement(
      'button',
      ['btn', 'btn-success'],
      [{ prop: 'type', value: 'button' }],
    );

    const storage = new TodoStorage();
    const tasksController = new TasksController();

    if (this.prefix === 'add') {
      submitButton.textContent = 'Create task';
      submitButton.addEventListener(
        'click',
        tasksController.addTaskToProject.bind(
          tasksController,
          storage,
          this.buildTask // pass the function instead
        )
      );
    } else {
      submitButton.textContent = 'Edit task';
      submitButton.addEventListener(
        'click',
        tasksController.updateProjectTask.bind(
          tasksController,
          storage,
          this.buildTask.bind(this),
          this.previousId
        )
      );
    }

    return submitButton;
  }

  description() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: `${this.prefix}-task-description` }],
    );

    const input = DOMHelper.createElement(
      'textarea',
      ['form-control'],
      [
        { prop: 'id', value: `${this.prefix}-task-description` },
        { prop: 'name', value: `${this.prefix}-task-description` },
      ],
    );

    label.textContent = 'Description';
    wrapper.append(label, input);

    return wrapper;
  }

  render() {
    const form = DOMHelper.createElement('form', ['mt-4']);
    const taskName = this.title();
    const description = this.description();
    const priority = this.priority();
    const dueDate = this.dueDate();
    const dueTime = this.dueTime();
    const submitButton = this.submitButton();

    form.append(
      taskName,
      description,
      priority,
      dueDate,
      dueTime,
      submitButton,
    );

    form.id = `${this.prefix}-task-form`;

    return form;
  }
}
