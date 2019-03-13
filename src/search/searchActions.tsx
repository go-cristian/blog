import { Dispatch } from "redux";
import { State } from "State";
import { Gist, Result, User, GistSchema, GistUserSchema } from "../data/models";

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
  searchTerm: searchTerm
});

export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export interface RequestSuccessSearchAction {
  type: typeof SEARCH_SUCCESS;
  results?: Result;
}
const searchSuccess = (results?: Result): RequestSuccessSearchAction => ({
  type: SEARCH_SUCCESS,
  results: results
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

const map = (gistUser: GistUserSchema, schema: GistSchema[]): Result => {
  if (schema.length > 0) {
    const user: User = {
      name: gistUser.name,
      avatarUrl: gistUser.avatar_url,
      nick: gistUser.login
    };

    const posts: Gist[] = schema.map((item: GistSchema) => {
      let keys = Object.keys(item.files);
      return {
        id: item.id,
        date: new Date(item.created_at),
        title: item.files[keys[0]].filename,
        contentUrl: item.files[keys[0]].raw_url,
        user: user
      };
    });
    const result: Result = {
      user: user,
      posts: posts
    };

    return result;
  } else {
    throw new Error("No user found");
  }
};

export const doSearch = (searchTerm: string) => (
  dispatch: Dispatch<SearchAction>,
  getState: () => State
) => {
  dispatch(search(searchTerm));
  return fetch(`https://api.github.com/users/${searchTerm}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(json => json as GistUserSchema)
    .then(user => {
      return fetch(`https://api.github.com/users/${searchTerm}/gists`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(json => json as GistSchema[])
        .then(schema => map(user, schema));
    })
    .then((result?: Result) => dispatch(searchSuccess(result)))
    .catch((error: Error) => dispatch(searchFailure(error)));
};
