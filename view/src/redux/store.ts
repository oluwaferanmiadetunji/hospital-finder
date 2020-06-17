import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import userReducer from './reducers/userReducer';
import UIreducer from './reducers/UIreducer';
import DataReducer from './reducers/DataReducer';
const middleware = [thunk];
const persistedStore = loadState();

// combine all reducers
const reducer = combineReducers({
  user: userReducer,
  UI: UIreducer,
  data: DataReducer
});

// create redux store
const store = createStore(reducer, persistedStore, compose(applyMiddleware(...middleware)));

// save redux store to local storage
store.subscribe(
  throttle(() => {
    saveState({ email: store.getState().user.email });
  }, 1000)
);

export default store;
