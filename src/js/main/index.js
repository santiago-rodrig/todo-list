import { DOMHelper, TodoStorage } from '../helpers';
import Task from './task';
import Sidebar from './sidebar';

const storage = new TodoStorage();

export default class Main {
  heading() {
    const h1 = DOMHelper.createElement('h1', ['text-center', 'my-5']);

    h1.textContent = storage.getActiveProject().title;

    return h1;
  }

  tasks() {
    const tasks = storage.getActiveProject().tasks;
    const container = DOMHelper.createElement('div', ['col-12', 'col-md-8']);
    const taskList = DOMHelper.createElement(
      'div', ['row', 'justify-content-even']
    );

    Object.values(tasks).forEach(task => {
      if (!task.completed) {
        taskList.append((new Task(task)).render());
      }
    });

    container.append(taskList);

    return container;
  }

  render() {
    const main = DOMHelper.createElement('main');
    const heading = this.heading();
    const tasks = this.tasks();
    const sideBar = (new Sidebar()).render();
    const container = DOMHelper.createElement('div', ['container']);
    const row = DOMHelper.createElement('div', ['row']);

    container.append(row);
    row.append(sideBar, tasks);
    main.append(heading, container);

    return main;
  }
}
