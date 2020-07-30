import { SET_RESULT, ADD_HISTORY, SET_HISTORY } from '../types';
const initialState = {
  results: [],
  history: []
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        results: [...action.payload]
      };
    case SET_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    case ADD_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history]
      };
    default:
      return state;
  }
}
