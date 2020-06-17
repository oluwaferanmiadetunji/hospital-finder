//in useActions.ts file
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  LOADING,
  STOP_LOADING,
  CLEAR_ERRORS,
  SET_COORDINATES
} from '../types';
import axios from 'axios';
export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: STOP_LOADING });
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING });
    });
};

export const registerUser = (userData: any, history: any) => (
  dispatch: any
) => {
  dispatch({ type: LOADING });
  axios
    .post('/signup', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: STOP_LOADING });
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING });
    });
};
//for fetching authenticated user information
// export const getUserData = () => (dispatch: any) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .get('/user')
//     .then((res) => {
//       console.log('user data', res.data);
//       dispatch({
//         type: SET_USER,
//         payload: res.data
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED
  });
  window.location.href = '/login'; //redirect to login page
};

export const getLocation = () => (dispatch: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: any) => {
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      dispatch({ type: SET_COORDINATES, payload: coordinates });
    });
  } else {
    alert('Location service is unavailable');
  }
};

const setAuthorizationHeader = (token: string) => {
  const Token = `Bearer ${token}`;
  localStorage.setItem('Token', Token);
  axios.defaults.headers.common['Authorization'] = Token;
};
