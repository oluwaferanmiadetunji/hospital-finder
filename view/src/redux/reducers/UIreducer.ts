import { SET_ERRORS, LOADING, STOP_LOADING, CLEAR_ERRORS } from '../types';

const initialState = {
  loading: false,
  errors: {}
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
