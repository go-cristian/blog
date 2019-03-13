import { Dispatch } from "react";
import { State } from "State";

export type SaveGistAction =
  | DoSaveGistAction
  | SaveGistSuccessAction
  | SaveGistFailureAction
  | SaveGistResetAction;

export const DO_SAVE_GIST = "DO_SAVE_GIST";
export interface DoSaveGistAction {
  type: typeof DO_SAVE_GIST;
  title: string;
  content: string;
}
const saveGist = (title: string, content: string): DoSaveGistAction => ({
  type: DO_SAVE_GIST,
  title: title,
  content: content
});

export const SAVE_SUCCESS = "SAVE_SUCCESS";
export interface SaveGistSuccessAction {
  type: typeof SAVE_SUCCESS;
}
const gistSaved = (): SaveGistSuccessAction => ({
  type: SAVE_SUCCESS
});

export const SAVE_FAILURE = "SAVE_FAILURE";
export interface SaveGistFailureAction {
  type: typeof SAVE_FAILURE;
  error: string;
}
const gistNotSaved = (error: Error): SaveGistFailureAction => ({
  type: SAVE_FAILURE,
  error: error.message
});

export const RESET = "RESET";
export interface SaveGistResetAction {
  type: typeof RESET;
}
const reset = (): SaveGistResetAction => ({
  type: RESET
});

export const doSave = (title: string, content: string) => (
  dispatch: Dispatch<SaveGistAction>,
  getState: () => State
) => {
  const state = getState();

  if (state.write.isLoading) {
    return Promise.resolve();
  }

  dispatch(saveGist(title, content));

  if (state.auth.session) {
    let file: any = {};
    file[title] = { content: content };
    let obj = { public: true, files: file };
    let token = state.auth.session.token;
    let params = {
      body: JSON.stringify(obj),
      method: "POST"
    };
    return fetch(`https://api.github.com/gists?access_token=${token}`, params)
      .then(() => dispatch(gistSaved()))
      .catch((error: Error) => dispatch(gistNotSaved(error)));
  } else {
    return Promise.resolve().then(() =>
      dispatch(gistNotSaved(new Error("No session available")))
    );
  }
};

export const doReset = () => (
  dispatch: Dispatch<SaveGistAction>,
  getState: () => State
) => {
  return Promise.resolve().then(() => dispatch(reset()));
};
