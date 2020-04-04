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
    const removeButton = document.getElementById('remove-project-btn');
    const editButton = document.getElementById('edit-project-btn');

    if (item === currentProject) return;

    currentProject.id = undefined;
    currentProject.removeAttribute('id');
    currentProject.classList.remove('active');
    item.id = 'current-project';
    item.classList.add('active');
    storage.changeToProject(project);
    removeButton.disabled = project.title === 'Default';
    editButton.disabled = removeButton.disabled;

    if (project.title === 'Default') {
      removeButton.classList.remove('unclickable');
      removeButton.classList.add('unclickable');
      editButton.classList.remove('unclickable');
      editButton.classList.add('unclickable');
    } else {
      removeButton.classList.remove('unclickable');
      editButton.classList.remove('unclickable');
    }
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
      active: false,
      id: storage.nextId
    });

    const projectElement = project.render();
    const projectStatus = storage.checkProjectStatus(project);

    if (projectStatus.invalid) {
      alert(projectStatus.message);
    } else {
      storage.addProject(project);
      this.setActive(project, projectElement);
      this.setTasks();
      projectsList.append(projectElement);
    }
  }

  removeProject() {
    const storage = new TodoStorage();
    const project = storage.getActiveProject();
    const projectElement = document.getElementById('current-project');
    const defaultProject = storage.projects[0];

    const defaultProjectElement = document.getElementById(
      'projects-list'
    ).firstChild;

    const userWantsToRemove = confirm(
      'Are you sure you want to delete the current project?'
    );

    if (userWantsToRemove) {
      this.setActive(defaultProject, defaultProjectElement);
      this.setTasks();
      storage.removeProject(project);
      projectElement.parentNode.removeChild(projectElement);
    }
  }

  editProject() {
    const projectName = prompt('Please provide the new name of the project');

    if (!projectName) return;

    const storage = new TodoStorage();
    const project = Object.assign({}, storage.getActiveProject());
    const projectElement = document.getElementById('current-project');

    project.title = projectName;

    const projectStatus = storage.checkProjectStatus(project);

    if (projectStatus.invalid) {
      alert(projectStatus.message);

      return;
    }

    storage.updateProject(project);
    projectElement.textContent = projectName;
  }
}
