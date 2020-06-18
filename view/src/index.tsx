import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwtDecode from 'jwt-decode';
import './assets/main.css';
import axios from 'axios';
// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { BASE_URL } from './constants';

axios.defaults.baseURL = BASE_URL;
const token = localStorage.Token;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    store.dispatch({ type: SET_UNAUTHENTICATED });
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
