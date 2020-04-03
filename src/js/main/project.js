import { DOMHelper, todoStorage } from '../helpers';
import Main from './index';
import ProjectsController from './projects_controller';

export default class Project {
  constructor(project) {
    this.title = project.title;
    this.tasks = project.tasks;
    this.active = project.active;
    this.id = project.id;
    this.nextId = project.nextId ? project.nextId : 0;
  }

  render() {
    const item = DOMHelper.createElement('li', ['list-group-item']);
    const projectsController = new ProjectsController();

    item.textContent = this.title;

    if (this.active) {
      item.id = 'current-project';
      item.classList.add('active');
    }

    item.addEventListener(
      'click',
      projectsController.setActive.bind(projectsController, this, item)
    );

    item.addEventListener('click', projectsController.setTasks);

    return item;
  }
}
