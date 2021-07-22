const loadDirective = (app) => {
  app.directive("focus", {
    mounted(el) {
      el.focus();
    },
  });
};

export default loadDirective;
