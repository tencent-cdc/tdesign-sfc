import { config } from 'sfcjs';

export function initDarkMode() {
  if (config('darkMode') === true) {
    this.setAttribute('color-scheme', 'dark');
  } else {
    this.setAttribute('color-scheme', 'light');
  }
}
