import { Dispatch } from "redux";
import { State } from "State";
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
  session: session
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

interface GistUser {
  login: string;
  avatar_url: string;
}

export const doLogin = () => (
  dispatch: Dispatch<AuthAction>,
  getState: () => State
) => {
  const state = getState();

  if (state.auth.isLoading) {
    return Promise.resolve();
  }

  dispatch(login());

  let token = "8e8b044c78b1303efedda85e4261e70bb03d4dd5";

  return fetch(`https://api.github.com/user?access_token=${token}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(json => json as GistUser)
    .then(
      user =>
        new Session(token, {
          name: user.login,
          avatarUrl: user.avatar_url,
          nick: user.login
        })
    )
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
