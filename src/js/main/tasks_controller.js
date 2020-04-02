import Task from './task';
import { DOMHelper } from '../helpers';
import Form from './form';

export default class TasksController {
  setModal(action) {
    const modalTitle = document.querySelector('#tasks-modal .modal-title');
    const modalBody = document.querySelector('#tasks-modal .modal-body');

    const modalButton = document.querySelector(
      '#tasks-modal .modal-footer button'
    );

    if (action === 'add') {
      modalTitle.textContent = 'Adding a task';
      DOMHelper.emptyElement(modalBody);
      modalBody.append((new Form('add')).render());
      modalButton.textContent = 'Add task';
      modalButton.classList.add('btn-success');
    } else {
      modalTitle.textContent = 'Editing a task';
      DOMHelper.emptyElement(modalBody);
      modalBody.append((new Form('edit')).render());
      modalButton.textContent = 'Edit task';
      modalButton.classList.add('btn-primary');
    }
  }

  addTaskToProject(storage, buildTask) {
    const task = buildTask();
    const taskElement = (new Task(task)).render();
    const taskList = document.getElementById('task-list');

    taskList.append(taskElement);
    storage.addTask(task);
  }

  updateProjectTask(storage, buildTask, previousId) {
    const taskElement = document.getElementById(previousId);
    const task = buildTask();

    console.log(buildTask);

    const taskPriority = taskElement.querySelector(
      'card-header > *:first-child',
    );

    const taskTitle = taskElement.querySelector(
      'card-body card-title',
    );

    const taskDescription = taskElement.querySelector(
      'card-body card-text',
    );

    const taskDueDate = taskElement.querySelector(
      'card-footer > *:first-child',
    );

    taskPriority.textContent = task.priority;
    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskElement.id = task.id;
    // update the storage here
    storage.updateTask(previousId, task);
  }
}
