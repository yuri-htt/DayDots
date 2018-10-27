import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';

/* from app */
import { getActiveRouteName } from 'app/src/navigation/AppNavigator';
import reducers from 'app/src/reducers';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const screenTracking = store => next => (action) => {
  if (action.type.indexOf('Navigation') === -1 || action.type === 'TAKEMODAL_CLOSE') {
    return next(action);
  }

  const currentScreen = getActiveRouteName(store.getState().nav);
  const result = next(action);
  const nextScreen = getActiveRouteName(store.getState().nav);

  store.dispatch({
    type: 'SCREEN_SET',
    payload: {
      current: currentScreen,
      next: nextScreen,
    },
  });

  return result;
};

/* create store */
const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    ),
    logger,
    screenTracking,
  ),
);

export default store;
