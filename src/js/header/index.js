import { DOMHelper } from '../../../Helpers';
import Navigation from './navigation';

export default class Header {
  render() {
    const container = DOMHelper.createElement('header', ['container-fluid']);
    container.appendChild(new Navigation().render());
    return container;
  }
}
