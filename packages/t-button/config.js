import { initDarkMode } from '../shared';

export default {
  pendingSlot: false,
  props: [
    'block',
    'disabled',
    'ghost',
    'icon',
    'loading',
    'shape',
    'size',
    'theme',
    'type',
    'variant',
  ],
  events: [
    'click',
  ],
  onConnect: initDarkMode,
  globalCss: 't-button t-icon + * { margin-left: 8px; }',
};
