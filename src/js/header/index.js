import { DOMHelper } from '../helpers';
import Navigation from './navigation';

export default class Header {
  render() {
    const container = DOMHelper.createElement('header', ['container-fluid']);
    const navigation = new Navigation();

    container.appendChild(navigation.render());
    return container;
  }
}
