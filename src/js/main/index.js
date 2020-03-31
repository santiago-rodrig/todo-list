import { DOMHelper, TodoStorage } from '../helpers';

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

    main.append(h1);

    return main;
  }
}
