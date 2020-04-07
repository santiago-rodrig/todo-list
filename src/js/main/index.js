import { DOMHelper, TodoStorage } from '../helpers';
import Sidebar from '../sidebar';
import TasksController from '../tasks/controller';

export default class Main {
  heading() {
    const storage = new TodoStorage();
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-4']);

    h1.textContent = storage.getActiveProject().title;
    h1.id = 'project-heading';

    return h1;
  }

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
