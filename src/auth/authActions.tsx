import { Dispatch } from "redux";
import { State } from "State";

import { fetchAccessToken, fetchSession } from "../data/api";
import { Session } from "../data/models";

export type AuthAction =
  | DoLoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | DoLogoutAction
  | LogoutSuccessAction;

export const DO_LOGIN = "DO_LOGIN";
export interface DoLoginAction {
  type: typeof DO_LOGIN;
}
export const login = (): DoLoginAction => ({
  type: DO_LOGIN
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  session: Session;
}
export const loginSuccess = (session: Session): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  session
});

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}
export const loginFailed = (error: Error): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  error: error.message
});

export const DO_LOGOUT = "DO_LOGOUT";
export interface DoLogoutAction {
  type: typeof DO_LOGOUT;
}
export const logout = (): DoLogoutAction => ({ type: DO_LOGOUT });

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}
const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

export const doLogin = () => (
  dispatch: Dispatch<AuthAction>,
  getState: () => State
) => {
  const state = getState();

  dispatch(login());

  if (state.auth.isLoading) {
    return Promise.resolve();
  }

  // https://github.com/login/oauth/authorize?client_id=fb60535dac0bced1e8f5&redirect_uri=http://localhost:3000&scope=gist

  const code = new URL(window.location.href).searchParams.get("code");

  if (code === undefined) {
    throw new Error("No code on github auth.");
  }

  return fetchAccessToken(code!!)
    .then(fetchSession)
    .then((session: Session) => dispatch(loginSuccess(session)))
    .catch((error: Error) => dispatch(loginFailed(error)));
};

export const doLogout = () => (
  dispatch: Dispatch<AuthAction>,
  getState: () => State
) => {
  const state = getState();
  if (state.auth.isLoading) {
    return Promise.resolve();
  }
  dispatch(logout());
  return Promise.resolve().then(() => dispatch(logoutSuccess()));
};
