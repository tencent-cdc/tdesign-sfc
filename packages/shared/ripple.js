let rippleContainer = null;
let startTimeId = null;
let count = 0;

export function handleShowRippler(e) {
  let el = e.target;

  if (el.tagName !== 'BUTTON') {
    const { path } = e;
    const button = path.find(item => item.tagName === 'BUTTON');
    if (!button) {
      return;
    }
    el = button;
  }

  // 非鼠标左键点击；避免出现动画之后不消失的bug
  if (e.button !== 0) {
    return;
  }

  // 由于容器的尺寸可能会发生变更，因此在动画结束之后，手动移除
  const reset = () => {
    if (rippleContainer) {
      rippleContainer.parentNode.removeChild(rippleContainer);
    }

    rippleContainer = null;
    count = 0;
  };

  const period = 200;
  let bg = 'rgba(0, 0, 0, 0.35)';

  // 支持通过css variable传递背景色
  const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
  if (cssVariable) {
    bg = cssVariable;
  }

  const elBorder = parseInt(getComputedStyle(el).borderWidth.replace('px', ''), 10);
  const border = elBorder > 0 ? elBorder : 0;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const style = getComputedStyle(el);

  if (rippleContainer) {
    reset();
  }

  rippleContainer = document.createElement('div');

  Object.assign(rippleContainer.style, {
    position: 'absolute',
    left: `${0 - border}px`,
    top: `${0 - border}px`,
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: style.borderRadius,
    pointerEvents: 'none',
    overflow: 'hidden',
  });

  el.appendChild(rippleContainer);

  const ripple = document.createElement('div');

  Object.assign(ripple.style, {
    marginTop: '0',
    marginLeft: '0',
    right: `${width}px`,
    width: `${width + 20}px`,
    height: '100%',
    transition: `transform ${period}ms cubic-bezier(.38, 0, .24, 1), background ${period * 2}ms linear`,
    transform: 'skewX(-8deg)',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: '-1',
    backgroundColor: bg,
    opacity: '0.9',
  });

  // fix zIndex：避免遮盖内部元素
  const elMap = new WeakMap();
  for (let n = el.children.length, i = 0; i < n; ++i) {
    const child = el.children[i];
    if ((child).style.zIndex === '' && child !== rippleContainer) {
      (child).style.zIndex = '1';
      elMap.set(child, true);
    }
  }

  // fix position
  const initPosition = el.style.position ? el.style.position : getComputedStyle(el).position;
  if (initPosition === '' || initPosition === 'static') {
    // eslint-disable-next-line no-param-reassign
    el.style.position = 'relative';
  }

  rippleContainer.insertBefore(ripple, rippleContainer.firstChild);
  count += 1;

  clearTimeout(startTimeId);
  startTimeId = setTimeout(() => {
    ripple.style.transform = `translateX(${width}px)`;
  }, 0);

  const handleClearRipple = () => {
    if (!rippleContainer) {
      return;
    }

    ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    el.removeEventListener('pointerup', handleClearRipple, false);
    el.removeEventListener('pointerleave', handleClearRipple, false);

    setTimeout(() => {
      ripple.parentNode.removeChild(ripple);
      count -= 1;

      // 避免因为移除了relative的定位，从而导致动画漂移
      if (count > 0) {
        reset();
        return;
      }

      // eslint-disable-next-line no-param-reassign
      el.style.position = initPosition !== 'static' ? initPosition : '';

      // reset zIndex
      for (let n = el.children.length, i = 0; i < n; ++i) {
        const child = el.children[i];
        if (elMap.has(child)) {
          (child).style.zIndex = '';
          elMap.delete(child);
        }
      }

      reset();
    }, period * 2 + 100);
  };

  el.addEventListener('pointerup', handleClearRipple, false);
  el.addEventListener('pointerleave', handleClearRipple, false); // 处理鼠标按下不松手直接离开点击block的情况..
}
