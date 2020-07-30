import { SET_ERRORS, CLEAR_ERRORS, STOP_RESULTS_LOADING, RESULTS_LOADING, LOADING, STOP_LOADING } from '../types';

const initialState = {
  loading: false,
  errors: {},
  resultsLoading: false
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
    case RESULTS_LOADING:
      return {
        ...state,
        resultsLoading: true
      };
    case STOP_RESULTS_LOADING:
      return {
        ...state,
        resultsLoading: false
      };
    default:
      return state;
  }
}
