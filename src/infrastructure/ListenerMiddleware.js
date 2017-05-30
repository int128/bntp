export default (...listeners) => store => next => action => {
  next(action);

  setTimeout(() =>
    listeners
      .filter(listener => listener[action.type] !== undefined)
      .forEach(listener => listener[action.type](action, store.dispatch, store)));
};
