import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import createSagaMiddle from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddle();
export const middlewares = [thunk,logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares,sagaMiddleware));
sagaMiddleware.run(rootSaga)

export default store;