import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import userReducer from './reducers/userReducer';
import UIreducer from './reducers/UIreducer';
import DataReducer from './reducers/DataReducer';
const middleware = [thunk];
const persistedStore = loadState();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const reducer = combineReducers({
  user: userReducer,
  UI: UIreducer,
  data: DataReducer
});

const store = createStore(
  reducer,
  persistedStore,
  compose(
    applyMiddleware(...middleware)
    // (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__()) as any
  )
);

store.subscribe(
  throttle(() => {
    saveState({ user: store.getState().user, data: store.getState().data });
  }, 1000)
);

export default store;
