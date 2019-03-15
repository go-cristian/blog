import { Dispatch } from "react";

import { fetchCreateGist } from "../api";
import { State } from "../State";

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
  title,
  content
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

  dispatch(saveGist(title, content));

  if (state.write.isLoading) {
    return Promise.resolve();
  }

  if (state.auth.session) {
    const token = state.auth.session.token;
    return fetchCreateGist(token, title, content)
      .then(() => dispatch(gistSaved()))
      .catch((error: Error) => dispatch(gistNotSaved(error)));
  }
  return Promise.resolve().then(() =>
    dispatch(gistNotSaved(new Error("No session available")))
  );
};

export const doReset = () => (
  dispatch: Dispatch<SaveGistAction>,
  getState: () => State
) => {
  return Promise.resolve().then(() => dispatch(reset()));
};
