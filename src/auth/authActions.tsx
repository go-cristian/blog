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

  //https://github.com/login/oauth/authorize?client_id=fb60535dac0bced1e8f5&redirect_uri=http://localhost:3000&scope=gist

  let code = new URL(window.location.href).searchParams.get("code");

  if (code == undefined) throw new Error("No code on github auth.");

  let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  let targetUrl = "https://github.com/login/oauth/access_token";

  let data = new FormData();
  data.append("client_id", "fb60535dac0bced1e8f5");
  data.append("client_secret", "88232f5d90c4a2dd537c8cfb2da6213bdaf0fd3e");
  data.append("code", code);

  let params: RequestInit = {
    body: data,
    method: "POST"
  };

  return fetch(proxyUrl + targetUrl, params)
    .then(response => response.text())
    .then(text => text.split("=")[1].split("&")[0])
    .then(token =>
      fetch(`https://api.github.com/user?access_token=${token}`)
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
