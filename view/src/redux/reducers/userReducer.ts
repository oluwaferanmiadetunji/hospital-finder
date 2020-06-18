import { SET_UNAUTHENTICATED, SET_COORDINATES, SET_USER, LOADING_USER, SET_AUTHENTICATED } from '../types';
const initialState = {
  authenticated: false,
  email: '',
  coordinates: {},
  loading: false
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_COORDINATES:
      return {
        ...state,
        coordinates: { ...action.payload }
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        email: action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
