import moment from 'moment';
import Task from './task';
import { DOMHelper, TodoStorage } from '../helpers';
import Form from './form';

export default class TasksController {
  updateTaskBackground(taskElement, priority) {
    taskElement.classList.remove('bg-light', 'bg-danger', 'bg-secondary');

    switch (priority) {
      case 'optional':
        taskElement.classList.add('bg-secondary');
        break;
      case 'important':
        taskElement.classList.add('bg-danger');
        break;
      default:
        taskElement.classList.add('bg-light');
        break;
    }
  }

  taskIsInvalid(storage, task, action) {
    const taskStatus = storage.checkTaskStatus(task, action);

    if (taskStatus.invalid) {
      alert(taskStatus.message);

      return true;
    }

    return false;
  }

  updateTask(form, task) {
    const storage = new TodoStorage();
    const taskObject = this.setTaskFromForm(form); taskObject.id = task.id;

    if (this.taskIsInvalid(storage, taskObject, 'edit')) return;

    const taskElement = document.getElementById(`task-${taskObject.id}`);

    const taskPriority = taskElement.querySelector(
      '.card-header > *:first-child > *:first-child'
    );

    const taskTitle = taskElement.querySelector('.card-title');
    const taskDescription = taskElement.querySelector('.card-text');

    const taskDueDate = taskElement.querySelector(
      '.card-footer > *:first-child > *:first-child'
    );

    this.updateTaskBackground(taskElement, this.priority);
    taskPriority.textContent = taskObject.priority;
    taskTitle.textContent = taskObject.title;
    taskDescription.textContent = taskObject.description;
    taskDueDate.textContent = taskObject.dueDate;
    storage.updateTask(taskObject);
  }

  setTaskFromForm(form) {
    const title = document.getElementById(`${form.prefix}-task-title`).value;

    const description = document.getElementById(
      `${form.prefix}-task-description`
    ).value;

    const priority = document.getElementById(
      `${form.prefix}-task-priority`
    ).value;

    const dueDate = document.getElementById(
      `${form.prefix}-task-due-date`
    ).value;

    const dueTime = document.getElementById(
      `${form.prefix}-task-due-time`
    ).value;

    let taskDueDate;
    let task;

    if (!dueDate && !dueTime) {
      taskDueDate = 'No due date';
    } else if (!dueDate && dueTime) {
      taskDueDate = `Today ${moment(dueTime, 'HH:mm').format('h:mm a')}`;
    } else if (dueDate && !dueTime) {
      taskDueDate = moment(dueDate).format('MMM Do YYYY');
    } else {
      taskDueDate = moment(`${dueDate}T${dueTime}`).format('MMM Do YYYY h:mm a');
    }

    task = { title, description, priority, dueDate: taskDueDate };

    return task;
  }

  setModal(action, task={}) {
    const modalTitle = document.querySelector('#tasks-modal .modal-title');
    const modalBody = document.querySelector('#tasks-modal .modal-body');
    let modalForm;

    const modalButton = document.querySelector(
      '#tasks-modal .modal-footer button'
    );

    if (action === 'add') {
      modalTitle.textContent = 'Adding a task';
      DOMHelper.emptyElement(modalBody);
      modalForm = new Form('add', task);
      modalBody.append(modalForm.render());
      modalButton.textContent = 'Add task';
      modalButton.classList.add('btn-success');

      modalButton.addEventListener(
        'click',
        this.addTask.bind(this, modalForm)
      );
    } else {
      modalTitle.textContent = 'Editing a task';
      DOMHelper.emptyElement(modalBody);
      modalForm = new Form('edit', task);
      modalBody.append(modalForm.render());
      modalButton.textContent = 'Edit task';
      modalButton.classList.add('btn-primary');

      modalButton.addEventListener(
        'click',
        this.updateTask.bind(this, modalForm, task)
      );
    }
  }

  addTask(form) {
    const storage = new TodoStorage();
    const task = this.setTaskFromForm(form); task.id = storage.nextId;

    if (this.taskIsInvalid(storage, task, 'add')) return;

    const taskElement = (new Task(task)).render();
    const taskList = document.getElementById('tasks-list');

    taskList.append(taskElement);
    storage.addTask(task);
  }
}
