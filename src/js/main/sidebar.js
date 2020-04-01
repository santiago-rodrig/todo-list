import { DOMHelper, TodoStorage } from '../helpers';
import Main from './index';

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

  taskName() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-name' }]
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: 'task-name' },
        { prop: 'name', value: 'task-name' },
        { prop: 'type', value: 'text' }
      ]
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
      [{ prop: 'for', value: 'task-importance' }]
    );

    const input = DOMHelper.createElement(
      'select',
      ['form-control'],
      [
        { prop: 'id', value: 'task-importance' },
        { prop: 'name', value: 'task-importance' }
      ]
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
      [{ prop: 'for', value: 'task-due-date' }]
    );

    const input = DOMHelper.createElement(
      'input',
      ['form-control'],
      [
        { prop: 'id', value: 'task-due-date' },
        { prop: 'name', value: 'task-due-date' },
        { prop: 'type', value: 'datetime-local' }
      ]
    );

    label.textContent = 'Due date';
    wrapper.append(label, input);

    return wrapper;
  }

  taskFormSubmit() {
    const submitButton = DOMHelper.createElement(
      'button',
      ['btn', 'btn-success']
    );

    submitButton.textContent = 'Create task';

    return submitButton;
  }

  taskDescription() {
    const wrapper = DOMHelper.createElement('div', ['form-group']);

    const label = DOMHelper.createElement(
      'label',
      [],
      [{ prop: 'for', value: 'task-description' }]
    );

    const input = DOMHelper.createElement(
      'textarea',
      ['form-control'],
      [
        { prop: 'id', value: 'task-description' },
        { prop: 'name', value: 'task-description' },
      ]
    );

    label.textContent = 'Description';
    wrapper.append(label, input);

    return wrapper;
  }

  taskForm() {
    const form = DOMHelper.createElement('form', ['slider', 'closed', 'mt-4']);
    const taskName = this.taskName();
    const taskDescription = this.taskDescription();
    const taskImportance = this.taskImportance();
    const taskDueDate = this.taskDueDate();
    const submitButton = this.taskFormSubmit();

    form.append(
      taskName,
      taskDescription,
      taskImportance,
      taskDueDate,
      submitButton
    );

    form.id = 'task-form';

    return form;
  }

  displayForm() {
    const form = document.getElementById('task-form');

    form.classList.toggle('closed');
  }

  taskFromForm() {
  }

  addTaskToProject() {
    const storage = new TodoStorage();
    const currentProject = document.getElementById('current-project');
    const task = this.taskFromForm();
    storage.addTask(task);
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
      [{ prop: 'type', value: 'button' }]
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
      ]
    );

    column.append(
      this.heading(),
      this.projectList(),
      this.mainActions(),
      this.taskForm()
    );

    return column;
  }
}
