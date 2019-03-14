import { Session } from "../data/models";

import {
  AuthAction,
  DO_LOGIN,
  DO_LOGOUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./authActions";

export interface AuthState {
  session?: Session;
  error?: string;
  isLoading: boolean;
}

const authReducer = (
  state: AuthState = { isLoading: false },
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        session: action.session,
        error: undefined
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        session: undefined,
        error: action.error
      };
    case DO_LOGOUT:
      return {
        ...state,
        isLoading: true,
        session: undefined
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
