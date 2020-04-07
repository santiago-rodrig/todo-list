import { DOMHelper } from '../helpers';
import Sidebar from '../sidebar';
import TasksController from '../tasks/controller';

export default class Main {
  render() {
    const main = DOMHelper.createElement('main');
    const tasks = (new TasksController()).renderTasksList();
    const sideBar = (new Sidebar()).render();
    const container = DOMHelper.createElement('div', ['container']);
    const row = DOMHelper.createElement('div', ['row']);

    container.append(row);
    row.append(sideBar, tasks);
    main.append(container);

    return main;
  }
}
