import moment from 'moment';
import { DOMHelper, TodoStorage } from '../helpers';
import Main from './index';
import Task from './task';
import TasksController from './tasks_controller';
import Form from './form';
import Project from './project';
import ProjectsController from './projects_controller';

export default class Sidebar {
  projectsList() {
    const storage = new TodoStorage();
    const list = DOMHelper.createElement('ul', ['list-group']);
    const projects = Object.values(storage.projects);

    projects.forEach(p => {
      list.append((new Project(p)).render());
    });

    list.id = 'projects-list';

    return list;
  }

  mainActions() {
    const storage = new TodoStorage();

    const addProject = DOMHelper.createElement(
      'button',
      ['btn-success', 'btn'],
      [{ prop: 'type', value: 'button' }],
    );

    const removeProject = DOMHelper.createElement(
      'button',
      ['btn-danger', 'btn', 'ml-2'],
      [
        { prop: 'type', value: 'button' },
        { prop: 'id', value: 'remove-project-btn' }
      ],
    );

    const addTask = DOMHelper.createElement(
      'button',
      ['btn-dark', 'btn', 'ml-2'],
      [
        { prop: 'type', value: 'button' },
        { prop: 'data-toggle', value: 'modal' },
        { prop: 'data-target', value: '#tasks-modal' }
      ]
    );

    const editProject = DOMHelper.createElement(
      'button',
      ['btn', 'btn-dark', 'ml-2'],
      [
        { prop: 'type', value: 'button' },
        { prop: 'id', value: 'edit-project-btn' }
      ]
    );

    const box = DOMHelper.createElement('div', ['mt-4']);
    const tasksController = new TasksController();
    const projectsController = new ProjectsController();

    addProject.addEventListener(
      'click',
      projectsController.addProject.bind(projectsController)
    );

    removeProject.addEventListener(
      'click',
      projectsController.removeProject.bind(projectsController)
    );

    editProject.addEventListener(
      'click',
      projectsController.editProject.bind(projectsController)
    );

    addTask.addEventListener(
      'click',
      tasksController.setModal.bind(tasksController, 'add')
    );

    addProject.textContent = 'Add';
    editProject.textContent = 'Edit';
    addTask.innerHTML = 'Add a task';
    removeProject.textContent = 'Remove';
    box.append(addProject, editProject, addTask, removeProject);

    if (storage.getActiveProject().title === 'Default') {
      removeProject.disabled = true;
      editProject.disabled = true;
      removeProject.classList.remove('unclickable');
      removeProject.classList.add('unclickable');
      editProject.classList.remove('unclickable');
      editProject.classList.add('unclickable');
    }

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
      this.projectsList(),
      this.mainActions(),
    );

    return column;
  }
}
