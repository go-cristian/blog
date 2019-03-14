import { Dispatch } from "redux";
import { State } from "State";

import { Gist, GistContent } from "../data/models";

export type DetailAction =
  | RequestDetailAction
  | RequestSuccessDetailAction
  | RequestFailureDetailAction;

export const DO_REQUEST = "DO_REQUEST";
export interface RequestDetailAction {
  type: typeof DO_REQUEST;
  id: string;
}
const request = (id: string): RequestDetailAction => ({
  type: DO_REQUEST,
  id
});

export const REQUEST_DETAIL_SUCCESS = "REQUEST_DETAIL_SUCCESS";
export interface RequestSuccessDetailAction {
  type: typeof REQUEST_DETAIL_SUCCESS;
  gist: GistContent;
  previousId?: string;
  nextId?: string;
}
const requestSuccess = (
  gist: GistContent,
  previousId?: string,
  nextId?: string
): RequestSuccessDetailAction => ({
  type: REQUEST_DETAIL_SUCCESS,
  gist,
  previousId,
  nextId
});

export const REQUEST_DETAIL_FAILURE = "REQUEST_DETAIL_FAILURE";
export interface RequestFailureDetailAction {
  type: typeof REQUEST_DETAIL_FAILURE;
  error: string;
}
const requestFailure = (error: Error): RequestFailureDetailAction => ({
  type: REQUEST_DETAIL_FAILURE,
  error: error.message
});

export const requestGist = (id: string) => (
  dispatch: Dispatch<DetailAction>,
  getState: () => State
) => {
  const state = getState();

  dispatch(request(id));

  if (state.search.result) {
    let previous: string | undefined;
    let next: string | undefined;
    let gist: Gist | undefined;
    const array = state.search.result.posts;
    for (let i = 0; i < array.length; i = i + 1) {
      const value = array[i];
      if (value.id === id) {
        gist = value;
        if (i > 0) {
          previous = array[i - 1].id;
        }
        if (i < array.length - 1) {
          next = array[i + 1].id;
        }
        break;
      }
    }

    if (gist === undefined) {
      throw new Error("Id not found");
    }

    return fetch(gist.contentUrl)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(response.statusText);
      })
      .then(content => {
        const gistContent: GistContent = {
          title: gist!!.title,
          content,
          date: new Date(gist!!.date),
          owner: gist!!.user
        };
        return gistContent;
      })
      .then((gistContent: GistContent) =>
        dispatch(requestSuccess(gistContent, next, previous))
      )
      .catch((error: Error) => dispatch(requestFailure(error)));
  } else {
    return Promise.resolve();
  }
};
