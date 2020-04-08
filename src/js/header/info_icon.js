import { DOMHelper } from '../helpers';

export default (() => {
  const icon = DOMHelper.createElement(
    'i',
    ['fas', 'fa-info-circle'],
    [
      { prop: 'data-toggle', value: 'modal' },
      { prop: 'data-target', value: '#info-modal' },
      { prop: 'id', value: 'info-icon' },
    ],
  );

  return icon;
})();
