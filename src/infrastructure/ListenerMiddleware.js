export default (...listeners) => store => next => action => {
  next(action);

  setTimeout(() => {
    listeners.forEach(listener => {
      if (listener[action.type]) {
        listener[action.type](action, store.dispatch, store.getState());
      }
    });
  });
};
