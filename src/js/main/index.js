import { DOMHelper, TodoStorage } from '../helpers';
import Task from './task';
import Sidebar from './sidebar';

export default class Main {
  heading() {
    const storage = new TodoStorage();
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-4']);

    h1.textContent = storage.getActiveProject().title;

    return h1;
  }

  tasks() {
    const storage = new TodoStorage();
    const tasks = storage.getActiveProject().tasks;
    const container = DOMHelper.createElement('div', ['col-12', 'col-md-6', 'col-lg-8']);
    const heading = this.heading();
    let taskElement;

    const taskList = DOMHelper.createElement(
      'div', ['row', 'justify-content-even']
    );

    taskList.id = 'task-list';

    Object.values(tasks).forEach(task => {
      if (!task.completed) {
        taskList.append((new Task(task)).render());
      }
    });

    container.append(heading, taskList);
    container.id = 'tasks-container';

    return container;
  }

  render() {
    const main = DOMHelper.createElement('main');
    const tasks = this.tasks();
    const sideBar = (new Sidebar()).render();
    const container = DOMHelper.createElement('div', ['container']);
    const row = DOMHelper.createElement('div', ['row']);

    container.append(row);
    row.append(sideBar, tasks);
    main.append(container);

    return main;
  }
}
