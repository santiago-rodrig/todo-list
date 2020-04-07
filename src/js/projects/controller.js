import alertify from 'alertifyjs/build/alertify';
import { TodoStorage, DOMHelper } from '../helpers';
import Project from './model';

export default (() => {
  function renderHeading() {
    const storage = new TodoStorage();
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-4']);

    h1.textContent = storage.getActiveProject().title;
    h1.id = 'project-heading';

    return h1;
  }

  function renderProject(project) {
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

  function setTasks() {
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

  function setActive(project, item) {
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

  function addProject() {
    alertify.prompt(
      '<h4>New project</h4>',
      '<p>Please provide the name of the project</p>',
      '',
      (evt, value) => {
        alertify.success(`OK: ${value}`);

        const storage = new TodoStorage();
        const projectsList = document.getElementById('projects-list');

        const project = new Project({
          title: value,
          id: storage.nextId,
          tasks: {},
          active: false,
          nextId: 0,
        });

        const projectElement = this.renderProject(project);
        const projectStatus = storage.checkProjectStatus(project);

        if (projectStatus.invalid) {
          alertify.alert(projectStatus.message, () => {
            alertify.message('OK');
          });
        } else {
          storage.addProject(project);
          this.setActive(project, projectElement);
          this.setTasks();
          projectsList.append(projectElement);
        }
      },
      () => {
        alertify.error('Cancel');
      },
    );
  }

  function removeProject() {
    const storage = new TodoStorage();
    const project = storage.getActiveProject();
    const projectElement = document.getElementById('current-project');
    const defaultProject = storage.projects[0];

    const defaultProjectElement = document.getElementById(
      'projects-list',
    ).firstChild;

    alertify.confirm(
      '<h4>Are you sure?</h4>',
      `<p>All tasks of the ${project.title} project are going to be deleted.</p>`,
      () => {
        alertify.success('OK');

        this.setActive(defaultProject, defaultProjectElement);
        this.setTasks();
        storage.update().removeProject(project);
        projectElement.parentNode.removeChild(projectElement);
      },
      () => {
        alertify.error('Cancel');
      },
    );
  }

  function editProject() {
    const storage = new TodoStorage();
    const project = { ...storage.getActiveProject() };

    alertify.prompt(
      `<h4>Editing ${project.title} project</h4>`,
      '<p>Please provide the new name of the project</p>',
      '',
      (evt, value) => {
        alertify.success(`OK: ${value}`);

        const projectElement = document.getElementById('current-project');

        project.title = value;

        const projectStatus = storage.checkProjectStatus(project);
        const projectHeading = document.getElementById('project-heading');

        if (projectStatus.invalid) {
          alertify.alert(projectStatus.message, () => {
            alertify.message('OK');
          });

          return;
        }

        storage.updateProject(project);
        projectElement.textContent = value;
        projectHeading.textContent = value;
      },
      () => {
        alertify.error('Cancel');
      },
    );
  }

  return {
    editProject,
    removeProject,
    addProject,
    setActive,
    setTasks,
    renderProject,
    renderHeading,
  };
})();
