import { DOMHelper, TodoStorage } from '../helpers';
import Task from './task';
import Sidebar from './sidebar';
import TasksController from './tasks_controller';

export default class Main {
  heading() {
    const storage = new TodoStorage();
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-4']);

    h1.textContent = storage.getActiveProject().title;

    return h1;
  }

  render() {
    const main = DOMHelper.createElement('main');
    const tasks = (new TasksController()).tasks();
    const sideBar = (new Sidebar()).render();
    const container = DOMHelper.createElement('div', ['container']);
    const row = DOMHelper.createElement('div', ['row']);

    container.append(row);
    row.append(sideBar, tasks);
    main.append(container);

    return main;
  }
}
