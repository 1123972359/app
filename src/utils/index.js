/**
 * 延时
 * @param {Number} times 毫秒
 * @returns
 */
export const delay = (times = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, times);
  });
};

/**
 * 兼容动画结束写法
 * @returns String 方法名称
 */
export const CSSEnd = () => {
  const el = document.createElement("surface");
  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};
