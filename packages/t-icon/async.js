import * as SFCJS from 'sfcjs';
import config from './config';

export default function (src) {
  SFCJS.privilege('t-icon', {
    ...config,
    src,
  });
}
