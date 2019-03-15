import { getEnv } from "./environment";
import { GistSchema, GistUserSchema, Session } from "./models";

const GET_SESSION_URL = "https://api.github.com/user?access_token=";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const GET_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GET_USER_URL = "https://api.github.com/users/";
const CREATE_GIST_URL = "https://api.github.com/gists?access_token=";

export const fetchAccessToken = (code: string): Promise<string> => {
  const data = new FormData();
  const env = getEnv();
  data.append("client_id", env.id);
  data.append("client_secret", env.secret);
  data.append("code", code);

  const params: RequestInit = {
    body: data,
    method: "POST"
  };
  return fetch(`${CORS_PROXY_URL}${GET_ACCESS_TOKEN_URL}`, params)
    .then(response => response.text())
    .then(text => text.split("=")[1].split("&")[0]);
};

export const fetchSession = (token: string): Promise<Session> =>
  fetch(`${GET_SESSION_URL}${token}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(json => json as GistUserSchema)
    .then(
      user =>
        new Session(token, {
          name: user.login,
          avatarUrl: user.avatar_url,
          nick: user.login
        })
    );

export const fetchUser = (nick: string): Promise<GistUserSchema> =>
  fetch(`${GET_USER_URL}${nick}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(json => json as GistUserSchema);

export const fetchGists = (nick: string): Promise<GistSchema[]> => {
  return fetch(`${GET_USER_URL}${nick}/gists`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(json => json as GistSchema[]);
};

export const fetchCreateGist = (
  token: string,
  title: string,
  content: string
) => {
  const file: any = {};
  file[title] = { content };
  const obj = { public: true, files: file };

  const params = {
    body: JSON.stringify(obj),
    method: "POST"
  };
  return fetch(`${CREATE_GIST_URL}${token}`, params);
};
