import defineButton from './t-button/async';
import defineIcon from './t-icon/async';

export function define(srcs) {
  const {
    button,
    icon,
  } = srcs;

  if (button) {
    defineButton(button);
  }

  if (icon) {
    defineIcon(icon);
  }
}
export default define;
