import { DOMHelper, TodoStorage } from '../helpers';

const storage = new TodoStorage();

export default class Sidebar {
  changeProject() {
    const currentProject = document.getElementById('current-project');

    if (this === currentProject) return;

    currentProject.id = undefined;
    currentProject.classList.remove('active');
    this.id = 'current-project';
    this.classList.add('active');
  }

  projectItem(project) {
    const item = DOMHelper.createElement('li', ['list-group-item']);

    item.textContent = project.title;

    if (project.active) {
      item.id = 'current-project';
      item.classList.add('active');
    }

    item.addEventListener('click', this.changeProject);

    return item;
  }

  projectList() {
    const list = DOMHelper.createElement('ul', ['list-group']);
    const projectKeys = Object.keys(storage.projects);

    projectKeys.forEach(key => {
      list.append(this.projectItem(storage.projects[key]));
    });

    list.id = 'projects-list';

    return list;
  }

  addProjectHandler() {
    const projectName = prompt('Please provide the name of the project');
    const projectsList = document.getElementById('projects-list');
    const activeProject = document.getElementById('current-project');

    // create the project in the local storage
    storage.addProject(projectName);
    // append the project to the projects list and set it to be active
    activeProject.id = undefined;
    activeProject.classList.remove('active');
    projectsList.append(this.projectItem(storage.getActiveProject()));
  }

  mainActions() {
    const addProject = DOMHelper.createElement(
      'button',
      ['btn-success', 'btn'],
      [{ prop: 'type', value: 'button' }]
    );

    const removeProject = DOMHelper.createElement(
      'button',
      ['btn-danger', 'btn', 'ml-2'],
      [{ prop: 'type', value: 'button' }]
    );

    const box = DOMHelper.createElement('div', ['mt-4']);

    addProject.textContent = 'Add';
    addProject.addEventListener('click', this.addProjectHandler.bind(this));
    removeProject.textContent = 'Remove';
    box.append(addProject, removeProject);

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

    column.append(this.heading(), this.projectList(), this.mainActions());

    return column;
  }
}
