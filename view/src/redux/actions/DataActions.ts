import { SET_RESULT, ADD_HISTORY, LOADING, STOP_LOADING } from '../types';
import axios from 'axios';
import { ACCESS_TOKEN, API } from '../../constants';

export const getResult = (data: any) => (dispatch: any) => {
  const latitude = data.latitude;
  const longitude = data.longitude;
  const radius = data.radius;
  const searchText = data.searchText;
  const type = data.type;
  const url = `${API}${latitude},${longitude};r=${radius}&q=${searchText}+${type}&limit=100&apiKey=${ACCESS_TOKEN}`;
  const saveData = {
    searchText,
    url
  };
  dispatch({ type: LOADING });
  axios
    .get(url)
    .then((res) => {
      dispatch({ type: SET_RESULT, payload: res.data.items });
      dispatch(saveResult(saveData));
      dispatch({ type: STOP_LOADING });
    })
    .catch(() => {
      dispatch({ type: SET_RESULT, payload: [] });
      dispatch({ type: STOP_LOADING });
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
