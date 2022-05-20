export const debounce = (fn, wait) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), wait);
    }
  };
};
