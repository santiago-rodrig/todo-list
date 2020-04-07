import { TodoStorage, DOMHelper } from '../helpers';
import Project from './model';

export default class ProjectsController {
  renderHeading() {
    const storage = new TodoStorage();
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-4']);

    h1.textContent = storage.getActiveProject().title;
    h1.id = 'project-heading';

    return h1;
  }

  renderProject(project) {
    const item = DOMHelper.createElement('li', ['list-group-item']);

    item.textContent = project.title;

    if (project.active) {
      item.id = 'current-project';
      item.classList.add('active');
    }

    item.addEventListener(
      'click',
      this.setActive.bind(this, project, item),
    );

    item.addEventListener('click', this.setTasks);

    return item;
  }

  setTasks() {
    const storage = new TodoStorage();

    if (storage.tasksMode === 'pending') {
      const pendingTasksRadio = document.getElementById('task-type-pending');

      pendingTasksRadio.click();
    } else {
      const completedTasksRadio = document.getElementById(
        'task-type-completed',
      );

      completedTasksRadio.click();
    }
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
    /* eslint-disable no-alert */
    const projectName = prompt('Please provide the name of the project');
    const projectsList = document.getElementById('projects-list');

    if (!projectName) return;

    const project = new Project({
      title: projectName,
      tasks: {},
      active: false,
      id: storage.nextId,
    });

    const projectElement = this.renderProject(project);
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
      'projects-list',
    ).firstChild;

    /* eslint-disable no-restricted-globals */
    const userWantsToRemove = confirm(
      'Are you sure you want to delete the current project?',
    );
    /* eslint-enable no-restricted-globals */

    if (userWantsToRemove) {
      this.setActive(defaultProject, defaultProjectElement);
      this.setTasks();
      storage.update().removeProject(project);
      projectElement.parentNode.removeChild(projectElement);
    }
  }

  editProject() {
    const projectName = prompt('Please provide the new name of the project');

    if (!projectName) return;

    const storage = new TodoStorage();
    const project = { ...storage.getActiveProject() };
    const projectElement = document.getElementById('current-project');

    project.title = projectName;

    const projectStatus = storage.checkProjectStatus(project);
    const projectHeading = document.getElementById('project-heading');

    if (projectStatus.invalid) {
      alert(projectStatus.message);
      /* eslint-enable no-alert */

      return;
    }

    storage.updateProject(project);
    projectElement.textContent = projectName;
    projectHeading.textContent = projectName;
  }
}
