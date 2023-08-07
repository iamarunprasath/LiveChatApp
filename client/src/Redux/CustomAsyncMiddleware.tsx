import { Middleware } from 'redux';

const customAsyncMiddleware: Middleware = store => next => action => {
  if (typeof action === 'function') {
    // If the action is a function (thunk), execute it with dispatch and getState
    return action(store.dispatch, store.getState);
  }

  // Pass the action to the next middleware or reducer
  return next(action);
};

export default customAsyncMiddleware;
