import moment from 'moment';
import { DOMHelper, TodoStorage } from '../helpers';
import Main from './index';
import Task from './task';

export default class Sidebar {
  changeProject() {
    const storage = new TodoStorage();
    const currentProject = document.getElementById('current-project');

    if (this === currentProject) return;

    currentProject.id = undefined;
    currentProject.removeAttribute('id');
    currentProject.classList.remove('active');
    this.id = 'current-project';
    this.classList.add('active');
    storage.changeToProject(this.textContent);
  }

  changeTasks() {
    const main = new Main();
    const tasksContainer = document.getElementById('tasks-container');
    const row = tasksContainer.parentNode;

    row.removeChild(tasksContainer);
    row.append(main.tasks());
  }

  projectItem(project) {
    const item = DOMHelper.createElement('li', ['list-group-item']);

    item.textContent = project.title;

    if (project.active) {
      item.id = 'current-project';
      item.classList.add('active');
    }

    item.addEventListener('click', this.changeProject);
    item.addEventListener('click', this.changeTasks);

    return item;
  }

  projectList() {
    const storage = new TodoStorage();
    const list = DOMHelper.createElement('ul', ['list-group']);
    const projectKeys = Object.keys(storage.projects);

    projectKeys.forEach(key => {
      list.append(this.projectItem(storage.projects[key]));
    });

    list.id = 'projects-list';

    return list;
  }

  removeProjectHandler() {
    const projectsList = document.getElementById('projects-list');
    const activeProject = document.getElementById('current-project');
    const storage = new TodoStorage();

    const promptAction = confirm(
      'Are you sure you want to delete this project?'
    );

    if (activeProject.textContent === 'Default') return;

    if (promptAction) {
      storage.removeProject(activeProject.textContent);
      projectsList.removeChild(activeProject);
      projectsList.firstChild.id = 'current-project';
      projectsList.firstChild.classList.add('active');
      this.changeTasks();
    }
  }

  addProjectHandler() {
    const storage = new TodoStorage();
    const projectName = prompt('Please provide the name of the project');
    if (!projectName) return;
    const projectsList = document.getElementById('projects-list');
    const activeProject = document.getElementById('current-project');

    // create the project in the local storage
    storage.addProject(projectName);
    // append the project to the projects list and set it to be active
    activeProject.id = undefined;
    activeProject.classList.remove('active');
    projectsList.append(this.projectItem(storage.getActiveProject()));
    this.changeTasks();
  }

  taskTitle() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-title' }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: 'task-title' },
        { prop: 'name', value: 'task-title' },
        { prop: 'type', value: 'text' },
      ],
    );

    label.textContent = 'Title';
    wrapper.append(label, input);

    return wrapper;
  }

  taskImportance() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-importance' }],
    );

    const input = DOMHelper.createElement(
      'select',
      ['form-control'],
      [
        { prop: 'id', value: 'task-importance' },
        { prop: 'name', value: 'task-importance' },
      ],
    );

    const normal = document.createElement('option');
    const important = document.createElement('option');
    const optional = document.createElement('option');

    label.textContent = 'Importance';
    normal.textContent = 'normal';
    normal.setAttribute('selected', 'selected');
    important.textContent = 'important';
    optional.textContent = 'optional';
    input.append(normal, important, optional);
    wrapper.append(label, input);

    return wrapper;
  }

  taskDueDate() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-due-date' }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: 'task-due-date' },
        { prop: 'name', value: 'task-due-date' },
        { prop: 'type', value: 'date' },
      ],
    );

    label.textContent = 'Due date';
    wrapper.append(label, input);

    return wrapper;
  }

  taskDueTime() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-due-time' }],
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: 'task-due-time' },
        { prop: 'name', value: 'task-due-time' },
        { prop: 'type', value: 'time' },
      ],
    );

    label.textContent = 'Due Time';
    wrapper.append(label, input);

    return wrapper;
  }

  taskFormSubmit() {
    const submitButton = DOMHelper.createElement(
      'button',
      ['btn', 'btn-success'],
      [{ prop: 'type', value: 'button' }],
    );

    submitButton.textContent = 'Create task';
    submitButton.addEventListener('click', this.addTaskToProject.bind(this));

    return submitButton;
  }

  taskDescription() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-description' }],
    );

    const input = DOMHelper.createElement(
      'textarea',
      ['form-control'],
      [
        { prop: 'id', value: 'task-description' },
        { prop: 'name', value: 'task-description' },
      ],
    );

    label.textContent = 'Description';
    wrapper.append(label, input);

    return wrapper;
  }

  taskForm() {
    const form = DOMHelper.createElement('form', ['slider', 'closed', 'mt-4']);
    const taskName = this.taskTitle();
    const taskDescription = this.taskDescription();
    const taskImportance = this.taskImportance();
    const taskDueDate = this.taskDueDate();
    const taskDueTime = this.taskDueTime();
    const submitButton = this.taskFormSubmit();

    form.append(
      taskName,
      taskDescription,
      taskImportance,
      taskDueDate,
      taskDueTime,
      submitButton,
    );

    form.id = 'task-form';

    return form;
  }

  displayForm() {
    const form = document.getElementById('task-form');

    form.classList.toggle('closed');
  }

  taskFromForm() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-importance').value;
    const dueDate = document.getElementById('task-due-date').value;
    const dueTime = document.getElementById('task-due-time').value;
    const task = { title, description, priority };
    let taskDueDate;

    console.log(title);

    const taskId = title.trim().split(' ').map(e => {
      return e.trim().toLowerCase().replace(/\W/gi, '')
    }).join('-');

    console.log(taskId);

    task.id = taskId;

    if (dueDate && !dueTime) {
      taskDueDate = moment(dueDate).format('MMM Do YYYY');
    } else if (dueTime && !dueDate) {
      taskDueDate = moment().format('Y-MM-DD') + 'T' + dueTime;
      taskDueDate = moment(taskDueDate).format('MMM Do YYYY HH:mm');
    } else if (!dueTime && !dueDate) {
      taskDueDate = 'No due date';
    } else {
      taskDueDate = moment(dueDate + 'T' + dueTime).format('MMM Do YYYY HH:mm');
    }

    task.dueDate = taskDueDate;

    return task;
  }

  clearTaskFields() {
    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');
    const importance = document.getElementById('task-importance');
    const dueDate = document.getElementById('task-due-date');

    [title, description, dueDate].forEach(e => { e.value = ''; });
    importance.value = 'normal';
  }

  addTaskToProject() {
    const storage = new TodoStorage();
    const taskForm = document.getElementById('task-form');
    const task = this.taskFromForm();
    const taskList = document.getElementById('task-list');
    const taskStatus = storage.checkTaskStatus(task);

    if (taskStatus.invalid) {
      alert(taskStatus.message);
    } else {
      this.clearTaskFields();
      taskForm.classList.toggle('closed');
      storage.addTask(task);
      taskList.append((new Task(task)).render());
    }
  }

  mainActions() {
    const addProject = DOMHelper.createElement(
      'button',
      ['btn-success', 'btn'],
      [{ prop: 'type', value: 'button' }],
    );

    const removeProject = DOMHelper.createElement(
      'button',
      ['btn-danger', 'btn', 'ml-2'],
      [{ prop: 'type', value: 'button' }],
    );

    const addTask = DOMHelper.createElement(
      'button',
      ['btn-light', 'btn', 'ml-2', 'rounded-circle', 'border'],
      [{ prop: 'type', value: 'button' }],
    );

    const box = DOMHelper.createElement('div', ['mt-4']);

    addProject.textContent = 'Add';
    addProject.addEventListener('click', this.addProjectHandler.bind(this));
    removeProject.addEventListener('click', this.removeProjectHandler.bind(this));
    removeProject.textContent = 'Remove';
    addTask.innerHTML = '<i class="fas fa-plus"></i>';
    addTask.addEventListener('click', this.displayForm);
    box.append(addProject, removeProject, addTask);

    return box;
  }

  heading() {
    const heading = DOMHelper.createElement('h2', ['mb-4']);

    heading.textContent = 'Projects';

    return heading;
  }

  render() {
    const column = DOMHelper.createElement(
      'div',
      [
        'col-12',
        'col-md-4',
        'border',
        'shadow',
        'align-self-start',
        'p-4',
      ],
    );

    column.append(
      this.heading(),
      this.projectList(),
      this.mainActions(),
      this.taskForm(),
    );

    return column;
  }
}
