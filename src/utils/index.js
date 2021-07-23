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
