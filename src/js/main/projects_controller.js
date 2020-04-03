import { TodoStorage } from '../helpers';
import Project from './project';
import Main from './index';
import TasksController from './tasks_controller';

export default class ProjectsController {
  setTasks() {
    const tasksListContainer = document.getElementById('tasks-list-container');
    const containerParent = tasksListContainer.parentNode;
    const tasks = (new TasksController()).tasks();

    containerParent.removeChild(tasksListContainer);
    containerParent.append(tasks);
  }

  setActive(project, item) {
    const storage = new TodoStorage();
    const currentProject = document.getElementById('current-project');

    if (item === currentProject) return;

    currentProject.id = undefined;
    currentProject.removeAttribute('id');
    currentProject.classList.remove('active');
    item.id = 'current-project';
    item.classList.add('active');
    storage.changeToProject(project.id);
  }

  addProject() {
    const storage = new TodoStorage();
    const projectName = prompt('Please provide the name of the project');
    const projectsList = document.getElementById('projects-list');
    const activeProject = document.getElementById('current-project');

    if (!projectName) return;

    const project = new Project({
      title: projectName,
      tasks: {},
      active: true,
      id: storage.nextId
    });

    const projectStatus = storage.checkProjectStatus(project);

    if (projectStatus.invalid) {
      alert(projectStatus.message);
    } else {
      storage.addProject(project);
      activeProject.id = undefined;
      activeProject.removeAttribute('id');
      activeProject.classList.remove('active');
      projectsList.append(project.render());
      this.setTasks();
    }
  }
}
