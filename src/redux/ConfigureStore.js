import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Exercises } from './exercises';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      exercises: Exercises,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};