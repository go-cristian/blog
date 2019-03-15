import { Dispatch } from "redux";

import { fetchGists, fetchUser } from "../api";
import { Gist, GistSchema, GistUserSchema, Result, User } from "../models";
import { State } from "../State";

export type SearchAction =
  | RequestSearchAction
  | RequestSuccessSearchAction
  | RequestFailureSearchAction;

export const DO_SEARCH = "DO_SEARCH";
export interface RequestSearchAction {
  type: typeof DO_SEARCH;
  searchTerm: string;
}
const search = (searchTerm: string): RequestSearchAction => ({
  type: DO_SEARCH,
  searchTerm
});

export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export interface RequestSuccessSearchAction {
  type: typeof SEARCH_SUCCESS;
  results?: Result;
}
const searchSuccess = (results?: Result): RequestSuccessSearchAction => ({
  type: SEARCH_SUCCESS,
  results
});

export const SEARCH_FAILURE = "SEARCH_FAILURE";
export interface RequestFailureSearchAction {
  type: typeof SEARCH_FAILURE;
  error: string;
}
const searchFailure = (error: Error): RequestFailureSearchAction => ({
  type: SEARCH_FAILURE,
  error: error.message
});

export const doSearch = (searchTerm: string) => (
  dispatch: Dispatch<SearchAction>,
  getState: () => State
) => {
  dispatch(search(searchTerm));
  return fetchResults(searchTerm)
    .then((result?: Result) => dispatch(searchSuccess(result)))
    .catch((error: Error) => dispatch(searchFailure(error)));
};

const fetchResults = (nick: string): Promise<Result> => {
  const all: [Promise<GistUserSchema>, Promise<GistSchema[]>] = [
    fetchUser(nick),
    fetchGists(nick)
  ];
  return Promise.all(all).then(([user, gists]) => join(user, gists));
};

const join = (gistUser: GistUserSchema, gists: GistSchema[]): Result => {
  if (gists.length > 0) {
    const user: User = {
      name: gistUser.name,
      avatarUrl: gistUser.avatar_url,
      nick: gistUser.login
    };

    const posts: Gist[] = gists.map((item: GistSchema) => gistFrom(user, item));

    return {
      user,
      posts
    };
  }
  throw new Error("No user found");
};

const gistFrom = (user: User, gist: GistSchema): Gist => {
  const keys = Object.keys(gist.files);
  return {
    id: gist.id,
    date: new Date(gist.created_at),
    title: gist.files[keys[0]].filename,
    contentUrl: gist.files[keys[0]].raw_url,
    user
  };
};
