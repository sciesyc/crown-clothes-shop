import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const midleWares = [logger];

const composedEnhancer = compose(applyMiddleware(...midleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);
