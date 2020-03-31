import { DOMHelper, TodoStorage } from '../helpers';
import Task from './task';
import Sidebar from './sidebar';

const storage = new TodoStorage();

export default class Main {
  heading() {
    const h1 = DOMHelper.createElement('h1', ['text-center']);

    h1.textContent = storage.getActiveProject().title;

    return h1;
  }

  tasks() {
    const tasks = storage.getActiveProject().tasks;
    const container = DOMHelper.createElement('div', ['container']);
    const taskList = DOMHelper.createElement('div', ['row']);

    Object.values(tasks).forEach(task => {
      taskList.append((new Task(task)).render());
    });

    container.append(taskList);

    return container;
  }

  render() {
    const main = DOMHelper.createElement('main');
    const heading = this.heading();
    const tasks = this.tasks();

    main.append(heading, tasks);

    return main;
  }
}
