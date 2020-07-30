import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState } from './localStorage';
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

// combine all reducers
const reducer = combineReducers({
  user: userReducer,
  UI: UIreducer,
  data: DataReducer
});

// create redux store
const store = createStore(reducer, persistedStore, compose(applyMiddleware(...middleware)));

export default store;
