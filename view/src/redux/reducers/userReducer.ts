import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_COORDINATES
} from '../types';
const initialState = {
  authenticated: false,
  coordinates: {}
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
    default:
      return state;
  }
}
