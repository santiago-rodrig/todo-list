import { DOMHelper } from '../../../../Helpers';
import Links from './links';

export default class Navigation {
  render() {
    const container = DOMHelper.createElement('div', ['container-fluid']);
    container.appendChild(Links);
  }
}