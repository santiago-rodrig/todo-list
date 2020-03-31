import { DOMHelper, TodoStorage } from '../helpers';
import Sidebar from './sidebar';

const storage = new TodoStorage();

export default class Main {
  heading() {
    const h1 = DOMHelper.createElement('h1', ['text-center']);

    h1.textContent = storage.getActiveProject().title;

    return h1;
  }

  render() {
    const main = DOMHelper.createElement('main');
    const h1 = this.heading();
    const sidebar = new Sidebar();

    main.append(h1, sidebar.render());

    return main;
  }
}
