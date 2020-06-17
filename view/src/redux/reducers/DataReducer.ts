import { SET_RESULT, ADD_HISTORY } from '../types';
const initialState = {
  results: [],
  history: {}
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        results: [...action.payload]
      };
    case ADD_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    default:
      return state;
  }
}
