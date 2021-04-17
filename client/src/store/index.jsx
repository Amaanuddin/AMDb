import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? createStore(rootReducer , applyMiddleware(thunk))
    : createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
      );


export default store;
