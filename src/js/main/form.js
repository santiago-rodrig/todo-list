import moment from 'moment';
import TasksController from './tasks_controller';
import { DOMHelper, TodoStorage } from '../helpers';

export default class Form {
  constructor(prefix, task) {
    // things like add-* or edit-*
    this.prefix = prefix;
    this.task = task;
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

    if (this.prefix === 'edit') input.value = this.task.title;

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
    important.textContent = 'important';
    optional.textContent = 'optional';
    input.append(normal, important, optional);

    if (this.prefix === 'edit') {
      input.value = this.task.priority;
    } else {
      input.value = 'normal';
    }

    wrapper.append(label, input);

    return wrapper;
  }

  dueDate() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);
    let date;

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

    if (this.prefix === 'edit') {
      if (this.task.dueDate === 'No due date') {
        input.value = '';
      } else {
        date = moment(this.task.dueDate, 'MMM Do YYYY HH:mm');
        input.value = date.format('Y-MM-DD');
      }
    }

    return wrapper;
  }

  dueTime() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);
    let time;

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

    if (this.prefix === 'edit') {
      if (this.task.dueDate === 'No due date') {
        input.value = '';
      } else {
        time = moment(this.task.dueDate, 'MMM Do YYYY HH:mm');

        if ((time.hour === 0) && (time.minute === 0)) {
          input.value = '';
        } else {
          input.value = time.format('HH:mm');
        }
      }
    }

    return wrapper;
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

    if (this.prefix === 'edit') input.value = this.task.description;

    return wrapper;
  }

  render() {
    const form = DOMHelper.createElement('form');
    const taskName = this.title();
    const description = this.description();
    const priority = this.priority();
    const dueDate = this.dueDate();
    const dueTime = this.dueTime();

    form.append(
      taskName,
      description,
      priority,
      dueDate,
      dueTime
    );

    form.id = `${this.prefix}-task-form`;

    return form;
  }
}
