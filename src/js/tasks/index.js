import Model from './model';
import Controller from './controller';
import { DOMHelper, TodoStorage } from '../helpers';

const deleteTask = (model) => {
  const taskColumn = document.getElementById(`task-${model.id}`).parentNode;

  const fadeEffect = setInterval(() => {
    if (!taskColumn.style.opacity) {
      taskColumn.style.opacity = 1;
    }

    if (taskColumn.style.opacity > 0) {
      taskColumn.style.opacity -= 0.05;
    } else {
      clearInterval(fadeEffect);
      taskColumn.parentNode.removeChild(taskColumn);
    }
  }, 8);

  const storage = new TodoStorage();
  storage.deleteTask(model.id);
};

const taskHeader = (model) => {
  const header = DOMHelper.createElement(
    'div', ['card-header', 'bg-dark'],
  );

  const flexContainer = DOMHelper.createElement(
    'div', ['d-flex', 'justify-content-between', 'bg-dark'],
  );

  const deleteAction = DOMHelper.createElement(
    'div', ['text-danger', 'task-action'],
  );

  const priority = DOMHelper.createElement('div', ['text-light']);

  priority.textContent = model.priority;
  deleteAction.innerHTML = '<i class="fas fa-window-close"></i>';
  deleteAction.addEventListener('click', deleteHandler.bind(model));
  flexContainer.append(priority, deleteAction);
  header.append(flexContainer);

  return header;
};

const renderTask = (model, controller) => {
  const box = DOMHelper.createElement(
    'div', ['col-12', 'col-lg-6', 'my-4'],
  );

  const task = DOMHelper.createElement('div', ['card']);

  switch (model.priority) {
    case 'important':
      task.classList.add('bg-danger');
      break;
    case 'optional':
      task.classList.add('bg-secondary');
      break;
    default:
      task.classList.add('bg-light');
      break;
  }

  const taskHeader = model.header();
  const taskBody = model.body();
  const taskFooter = model.footer();

  task.append(taskHeader, taskBody, taskFooter);
  task.id = `task-${model.id}`;
  box.append(task);

  return box;
};
