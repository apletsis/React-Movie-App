import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import movieAppReducer from './reducers/movie-app.reducers';

// Parent of all reducers
const rootReducer = combineReducers({
    movieApp: movieAppReducer,
});

// Set information to the console
const loggerMiddleware = createLogger();

const store = createStore(
    // reducer
    rootReducer,
    // preloadedState
    undefined,
    //compose for apply store upgrades
    compose(
      //midleware for catch dispatched actions before they reach the reducer
      applyMiddleware(
          // allows functions to be returned from action creators
          // usefull, for example, to combine multiple actions in a single one
          // for async actions
          thunkMiddleware,
          // just output details to the console
          loggerMiddleware
      )  
    )
);

export default store;