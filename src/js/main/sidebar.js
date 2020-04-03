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
      [
        { prop: 'type', value: 'button' },
        { prop: 'data-toggle', value: 'modal' },
        { prop: 'data-target', value: '#tasks-modal' }
      ]
    );

    const box = DOMHelper.createElement('div', ['mt-4']);
    const tasksController = new TasksController();
    const projectsController = new ProjectsController();

    addProject.textContent = 'Add';

    addProject.addEventListener(
      'click',
      projectsController.addProject.bind(projectsController)
    );

    // removeProject.addEventListener('click', projectsController.removeProject.bind(projecstController));
    removeProject.textContent = 'Remove';
    addTask.innerHTML = 'Add a task';

    addTask.addEventListener(
      'click',
      tasksController.setModal.bind(tasksController, 'add')
    );

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
      this.projectsList(),
      this.mainActions(),
    );

    return column;
  }
}
