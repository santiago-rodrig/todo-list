import { DOMHelper } from '../helpers';
import sideBar from '../sidebar';
import TasksController from '../tasks/controller';

export default (() => {
  const main = DOMHelper.createElement('main');
  const tasks = (new TasksController()).renderTasksList();
  const container = DOMHelper.createElement('div', ['container']);
  const row = DOMHelper.createElement('div', ['row']);

  container.append(row);
  row.append(sideBar, tasks);
  main.append(container);

  return main;
})();
