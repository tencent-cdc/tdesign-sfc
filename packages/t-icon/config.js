import { initDarkMode } from '../shared';

export default {
  pendingSlot: false,
  props: [
    'name',
    'size',
    'color',
  ],
  events: [
    'click',
  ],
  onConnect: initDarkMode,
};
