import moment from 'moment';
import { DOMHelper, TodoStorage } from '../helpers';
import Main from './index';
import Task from './task';
import Form from './form';

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
    let promptAction;

    if (activeProject.textContent === 'Default') {
      alert('You can\'t delete the default project');

      return;
    }

    promptAction = confirm(
      'Are you sure you want to delete this project?'
    );

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
    const projectStatus = storage.checkProjectStatus(projectName);

    if (!projectName) return;

    if (projectStatus.invalid) {
      alert(projectStatus.message);
    } else {
      // create the project in the local storage
      storage.addProject(projectName);
      // append the project to the projects list and set it to be active
      activeProject.id = undefined;
      activeProject.classList.remove('active');
      projectsList.append(this.projectItem(storage.getActiveProject()));
      this.changeTasks();
    }
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
      ['btn-light', 'btn', 'ml-2', 'rounded', 'border'],
      [{ prop: 'type', value: 'button' }],
    );

    const box = DOMHelper.createElement('div', ['mt-4']);

    addProject.textContent = 'Add';
    addProject.addEventListener('click', this.addProjectHandler.bind(this));
    removeProject.addEventListener('click', this.removeProjectHandler.bind(this));
    removeProject.textContent = 'Remove';
    addTask.innerHTML = 'Add a task';
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
        'col-md-6',
        'col-lg-4',
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
    );

    return column;
  }
}
