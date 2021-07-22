/**
 * 延时
 * @param {Function} callback
 * @param {Number} times 毫秒
 * @returns
 */
export const delay = (callback, times = 250) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      callback && callback();
      await resolve();
    }, times);
  });
};
