import { DOMHelper, TodoStorage } from '../helpers';
import TasksController from '../tasks/controller';
import ProjectsController from '../projects/controller';

export default (() => {
  function projectsList() {
    const storage = new TodoStorage();
    const list = DOMHelper.createElement('ul', ['list-group']);
    const projects = Object.values(storage.projects);

    projects.forEach(p => {
      list.append(ProjectsController.renderProject(p));
    });

    list.id = 'projects-list';

    return list;
  }

  function taskType() {
    const container = DOMHelper.createElement('div');
    const heading = DOMHelper.createElement('h4', ['mt-4']);
    const form = DOMHelper.createElement('form');
    const formGroup = DOMHelper.createElement('div', ['form-group']);
    const pendingCheck = DOMHelper.createElement('div', ['form-check']);
    const tasksController = new TasksController();

    const pendingCheckInput = DOMHelper.createElement(
      'input',
      ['form-check-input'],
      [
        { prop: 'type', value: 'radio' },
        { prop: 'name', value: 'task_type' },
        { prop: 'id', value: 'task-type-pending' },
        { prop: 'value', value: 'pending' },
      ],
    );

    const pendingCheckLabel = DOMHelper.createElement(
      'label',
      ['form-check-label'],
      [
        { prop: 'for', value: 'task-type-pending' },
      ],
    );

    const completedCheck = DOMHelper.createElement('div', ['form-check']);

    const completedCheckInput = DOMHelper.createElement(
      'input',
      ['form-check-input'],
      [
        { prop: 'type', value: 'radio' },
        { prop: 'name', value: 'task_type' },
        { prop: 'id', value: 'task-type-completed' },
        { prop: 'value', value: 'completed' },
      ],
    );

    const completedCheckLabel = DOMHelper.createElement(
      'label',
      ['form-check-label'],
      [
        { prop: 'form', value: 'task-type-completed' },
      ],
    );

    pendingCheckLabel.textContent = 'Pending';
    pendingCheck.append(pendingCheckInput, pendingCheckLabel);
    pendingCheckInput.checked = true;

    pendingCheckInput.addEventListener(
      'click',
      tasksController.showPending.bind(tasksController),
    );

    completedCheckLabel.textContent = 'Completed';
    completedCheck.append(completedCheckInput, completedCheckLabel);

    completedCheckInput.addEventListener(
      'click',
      tasksController.showCompleted.bind(tasksController),
    );

    formGroup.append(pendingCheck, completedCheck);
    form.append(formGroup);
    heading.textContent = 'Tasks type';
    container.append(heading, form);

    return container;
  }

  function mainActions() {
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
        { prop: 'id', value: 'remove-project-btn' },
      ],
    );

    const addTask = DOMHelper.createElement(
      'button',
      ['btn-dark', 'btn', 'ml-2'],
      [
        { prop: 'type', value: 'button' },
        { prop: 'data-toggle', value: 'modal' },
        { prop: 'data-target', value: '#tasks-modal' },
        { prop: 'id', value: 'add-task-btn' },
      ],
    );

    const editProject = DOMHelper.createElement(
      'button',
      ['btn', 'btn-dark', 'ml-2'],
      [
        { prop: 'type', value: 'button' },
        { prop: 'id', value: 'edit-project-btn' },
      ],
    );

    const box = DOMHelper.createElement('div', ['mt-4']);
    const tasksController = new TasksController();

    addProject.addEventListener(
      'click',
      ProjectsController.addProject.bind(ProjectsController),
    );

    removeProject.addEventListener(
      'click',
      ProjectsController.removeProject.bind(ProjectsController),
    );

    editProject.addEventListener(
      'click',
      ProjectsController.editProject.bind(ProjectsController),
    );

    addTask.addEventListener(
      'click',
      tasksController.setModal.bind(tasksController, 'add'),
    );

    addProject.textContent = 'Add';
    editProject.textContent = 'Edit';
    addTask.textContent = 'Add a task';
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

  function heading() {
    const heading = DOMHelper.createElement('h2', ['mb-4']);

    heading.textContent = 'Projects';

    return heading;
  }

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
    heading(),
    projectsList(),
    mainActions(),
    taskType(),
  );

  return column;
})();
