/* eslint-disable import/no-unresolved */
import moment from 'moment';
import alertify from 'alertifyjs/build/alertify';
/* eslint-enable import/no-unresolved */
import { DOMHelper, TodoStorage } from '../helpers';
import Form from './form';
import Task from './model';
import ProjectsController from '../projects/controller';

export default class TasksController {
  updateTaskBackground(priority) {
    this.classList.remove('bg-light', 'bg-danger', 'bg-secondary');

    switch (priority) {
      case 'optional':
        this.classList.add('bg-secondary');
        break;
      case 'important':
        this.classList.add('bg-danger');
        break;
      default:
        this.classList.add('bg-light');
        break;
    }
  }

  showPending() {
    const tasksContainer = document.getElementById('tasks-list-container');
    const tasksContainerParent = tasksContainer.parentNode;
    const addTaskButton = document.getElementById('add-task-btn');
    const storage = new TodoStorage();

    tasksContainerParent.removeChild(tasksContainer);
    tasksContainerParent.append(this.renderTasksList());
    storage.swapTasksMode('pending');
    addTaskButton.disabled = false;
    addTaskButton.classList.remove('unclickable');
  }

  showCompleted() {
    const tasksContainer = document.getElementById('tasks-list-container');
    const tasksContainerParent = tasksContainer.parentNode;
    const addTaskButton = document.getElementById('add-task-btn');
    const storage = new TodoStorage();

    tasksContainerParent.removeChild(tasksContainer);
    tasksContainerParent.append(this.renderTasksList('completed'));
    storage.swapTasksMode('completed');
    addTaskButton.disabled = true;
    addTaskButton.classList.add('unclickable');
  }

  taskHeader(task) {
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

    priority.textContent = task.priority;

    deleteAction.innerHTML = '<i class="fas fa-window-close"></i>';
    deleteAction.addEventListener('click', this.deleteTask.bind(task));
    flexContainer.append(priority, deleteAction);
    header.append(flexContainer);

    return header;
  }

  taskBody() {
    const body = DOMHelper.createElement('div', ['card-body']);
    const title = DOMHelper.createElement('h3', ['card-title']);
    const text = DOMHelper.createElement('p', ['card-text']);

    title.textContent = this.title;
    text.textContent = this.description;
    body.append(title, text);

    return body;
  }

  renderTask(task) {
    const box = DOMHelper.createElement(
      'div', ['col-12', 'col-lg-6', 'my-4'],
    );

    const taskElement = DOMHelper.createElement('div', ['card']);

    switch (task.priority) {
      case 'important':
        taskElement.classList.add('bg-danger');
        break;
      case 'optional':
        taskElement.classList.add('bg-secondary');
        break;
      default:
        taskElement.classList.add('bg-light');
        break;
    }

    const taskHeader = this.taskHeader(task);
    const taskBody = this.taskBody.call(task);
    const taskFooter = this.taskFooter(task);

    taskElement.append(taskHeader, taskBody, taskFooter);
    taskElement.id = `task-${task.id}`;
    box.append(taskElement);

    return box;
  }

  taskFooter(task) {
    const footer = DOMHelper.createElement(
      'div', ['card-footer', 'bg-dark'],
    );

    const flexContainer = DOMHelper.createElement(
      'div',
      ['d-flex', 'justify-content-between', 'bg-dark', 'p-2'],
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

    const actions = DOMHelper.createElement('div', ['d-flex', 'align-self-end']);
    const dueDate = DOMHelper.createElement('p', ['text-light']);
    const completeDate = DOMHelper.createElement('p', ['text-light']);
    const completeHeading = DOMHelper.createElement('h4', ['text-info']);
    const dueDateHeading = DOMHelper.createElement('h4', ['text-info']);
    const completeContainer = DOMHelper.createElement('div');
    const dueDateContainer = DOMHelper.createElement('div');

    dueDate.textContent = task.dueDate;
    completeDate.textContent = task.completeDate;
    completeHeading.textContent = 'Completion date';
    dueDateHeading.textContent = 'Due date';
    completeAction.innerHTML = '<i class="fas fa-check-square"></i>';
    editAction.innerHTML = '<i class="fas fa-edit"></i>';
    dueDateContainer.append(dueDateHeading, dueDate);
    completeContainer.append(completeHeading, completeDate);

    editAction.addEventListener(
      'click',
      this.setModal.bind(this, 'edit', task),
    );

    completeAction.addEventListener('click', this.completeTask.bind(task));
    actions.append(editAction, completeAction);

    if (!task.completed) {
      flexContainer.append(dueDateContainer, actions);
    } else {
      flexContainer.classList.add('flex-column');
      flexContainer.append(dueDateContainer, completeContainer);
    }

    footer.append(flexContainer);

    return footer;
  }

  deleteTask() {
    const taskColumn = document.getElementById(`task-${this.id}`).parentNode;

    const fadeEffect = setInterval(() => {
      if (!taskColumn.style.opacity) {
        taskColumn.style.opacity = 1;
      }

      if (taskColumn.style.opacity > 0) {
        taskColumn.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        taskColumn.parentNode.removeChild(taskColumn);
      }
    }, 8);

    const storage = new TodoStorage();

    storage.deleteTask(this);
  }

  completeTask() {
    const taskColumn = document.getElementById(`task-${this.id}`).parentNode;

    const fadeEffect = setInterval(() => {
      if (!taskColumn.style.opacity) {
        taskColumn.style.opacity = 1;
      }

      if (taskColumn.style.opacity > 0) {
        taskColumn.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        taskColumn.parentNode.removeChild(taskColumn);
      }
    }, 8);

    const storage = new TodoStorage();

    storage.completeTask(this);
  }

  renderTasksList(type = 'pending') {
    const storage = new TodoStorage();
    const { tasks } = storage.getActiveProject();

    const container = DOMHelper.createElement(
      'div', ['col-12', 'col-md-6', 'col-lg-8', 'pt-5'],
    );

    const heading = ProjectsController.renderHeading();

    const taskList = DOMHelper.createElement(
      'div', ['row', 'justify-content-even'],
    );

    taskList.id = 'tasks-list';

    if (type === 'pending') {
      Object.values(tasks).forEach(task => {
        if (!task.completed) {
          taskList.append(this.renderTask(new Task(task)));
        }
      });
    } else {
      Object.values(tasks).forEach(task => {
        if (task.completed) {
          taskList.append(this.renderTask(new Task(task)));
        }
      });
    }

    container.append(heading, taskList);
    container.id = 'tasks-list-container';

    return container;
  }

  taskIsInvalid(task, action) {
    const taskStatus = this.checkTaskStatus(task, action);

    if (taskStatus.invalid) {
      alertify.alert(taskStatus.message, () => {
        alertify.message('OK');
      });

      return true;
    }

    return false;
  }

  updateTask(form, task) {
    const storage = new TodoStorage();
    let taskObject = this.setTaskFromForm().bind(form);

    taskObject = Object.assign(taskObject, task);

    const modalClose = document.querySelector('#tasks-modal .close');

    if (this.taskIsInvalid(taskObject, 'edit').bind(storage)) return;

    const taskElement = document.getElementById(`task-${taskObject.id}`);

    const taskEditButton = taskElement.querySelector(
      '.card-footer .task-action.text-light',
    );

    const taskEditButtonClone = taskEditButton.cloneNode(true);

    const taskPriority = taskElement.querySelector(
      '.card-header > *:first-child > *:first-child',
    );

    const taskTitle = taskElement.querySelector('.card-title');
    const taskDescription = taskElement.querySelector('.card-text');

    const taskDueDate = taskElement.querySelector(
      '.card-footer > *:first-child > *:first-child',
    );

    taskEditButtonClone.addEventListener(
      'click',
      this.setModal.bind(this, 'edit', taskObject),
    );

    taskEditButton.parentNode.replaceChild(taskEditButtonClone, taskEditButton);
    this.updateTaskBackground(taskObject.priority).bind(taskElement);
    taskPriority.textContent = taskObject.priority;
    taskTitle.textContent = taskObject.title;
    taskDescription.textContent = taskObject.description;
    taskDueDate.textContent = taskObject.dueDate;
    storage.updateTask(taskObject);
    modalClose.click();
  }

  setTaskFromForm() {
    const title = document.getElementById(`${this.prefix}-task-title`).value;

    const description = document.getElementById(
      `${this.prefix}-task-description`,
    ).value;

    const priority = document.getElementById(
      `${this.prefix}-task-priority`,
    ).value;

    const dueDate = document.getElementById(
      `${this.prefix}-task-due-date`,
    ).value;

    const dueTime = document.getElementById(
      `${this.prefix}-task-due-time`,
    ).value;

    let taskDueDate;

    if (!dueDate && !dueTime) {
      taskDueDate = 'No due date';
    } else if (!dueDate && dueTime) {
      taskDueDate = `Today ${moment(dueTime, 'HH:mm').format('h:mm a')}`;
    } else if (dueDate && !dueTime) {
      taskDueDate = moment(dueDate).format('MMM Do YYYY');
    } else {
      taskDueDate = moment(`${dueDate}T${dueTime}`).format('MMM Do YYYY h:mm a');
    }

    const task = {
      title, description, priority, dueDate: taskDueDate,
    };

    return task;
  }

  setModal(action, task = {}) {
    const modalTitle = document.querySelector('#tasks-modal .modal-title');
    const modalBody = document.querySelector('#tasks-modal .modal-body');
    let modalForm;

    const modalButton = document.querySelector(
      '#tasks-modal .modal-footer button',
    );

    const modalButtonClone = modalButton.cloneNode(true);

    modalButton.parentNode.replaceChild(modalButtonClone, modalButton);

    if (action === 'add') {
      modalTitle.textContent = 'Adding a task';
      modalForm = new Form('add', task);
      DOMHelper.emptyElement(modalBody);
      modalBody.append(modalForm.render());
      modalButtonClone.textContent = 'Add task';
      modalButtonClone.classList.remove('btn-primary');
      modalButtonClone.classList.add('btn-success');

      modalButtonClone.addEventListener(
        'click',
        this.addTask.bind(this, modalForm),
      );
    } else {
      modalTitle.textContent = 'Editing a task';
      modalForm = new Form('edit', task);
      DOMHelper.emptyElement(modalBody);
      modalBody.append(modalForm.render());
      modalButtonClone.textContent = 'Edit task';
      modalButtonClone.classList.remove('btn-success');
      modalButtonClone.classList.add('btn-primary');

      modalButtonClone.addEventListener(
        'click',
        this.updateTask.bind(this, modalForm, task),
      );
    }
  }

  addTask(form) {
    const storage = new TodoStorage();
    const task = this.setTaskFromForm().bind(form);

    const modalClose = document.querySelector(
      '.modal-header .close',
    );

    task.id = storage.getActiveProject().nextId;
    task.completed = false;

    if (this.taskIsInvalid(task, 'add').bind(storage)) return;

    const taskElement = this.renderTask(new Task(task));
    const taskList = document.getElementById('tasks-list');

    taskList.append(taskElement);
    storage.addTask(task);
    modalClose.click();
  }
}
