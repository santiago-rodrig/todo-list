import { DOMHelper } from '../helpers';
import Navigation from './navigation';

export default class Header {
  render() {
    const container = DOMHelper.createElement('header', [
      'container-fluid',
      'p-4',
      'bg-dark',
      'mb-5',
    ]);
    const navigation = new Navigation();

    container.appendChild(navigation.render());
    return container;
  }
}
