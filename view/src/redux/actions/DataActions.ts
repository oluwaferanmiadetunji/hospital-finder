import { SET_RESULT, ADD_HISTORY, SET_HISTORY, RESULTS_LOADING, STOP_RESULTS_LOADING } from '../types';
import axios from 'axios';
import { ACCESS_TOKEN, API } from '../../constants';

// Search for place
export const getResult = (data: any) => (dispatch: any) => {
  const latitude: number = data.latitude;
  const longitude: number = data.longitude;
  const radius: number = data.radius;
  const searchText: string = data.searchText;
  const type: string = data.type;
  const url: string = `${API}${latitude},${longitude};r=${radius}&q=${searchText}+${type}&limit=100&apiKey=${ACCESS_TOKEN}`;
  const saveData = {
    searchText,
    url
  };
  dispatch({ type: RESULTS_LOADING });
  axios
    .get(url)
    .then((res) => {
      dispatch({ type: SET_RESULT, payload: res.data.items });
      dispatch(saveResult(saveData));
      dispatch({ type: STOP_RESULTS_LOADING });
    })
    .catch(() => {
      dispatch({ type: SET_RESULT, payload: [] });
      dispatch({ type: STOP_RESULTS_LOADING });
    });
};

const saveResult = (data: any) => (dispatch: any) => {
  axios
    .post('/history', data)
    .then((res) => {
      dispatch({ type: ADD_HISTORY, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const getHistory = (data: any) => (dispatch: any) => {
  dispatch({ type: SET_HISTORY, payload: data });
};

export const seeHistory = (url: string) => (dispatch: any) => {
  dispatch({ type: RESULTS_LOADING });
  axios
    .get(url)
    .then((res) => {
      dispatch({ type: SET_RESULT, payload: res.data.items });
      dispatch({ type: STOP_RESULTS_LOADING });
    })
    .catch(() => {
      dispatch({ type: SET_RESULT, payload: [] });
      dispatch({ type: STOP_RESULTS_LOADING });
    });
};
