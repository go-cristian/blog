import { Result } from "../data/models";
import {
  SearchAction,
  DO_SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from "./searchActions";

export interface SearchState {
  isLoading: boolean;
  result?: Result;
  searchTerm: string;
  error?: string;
}

export const searchReducer = (
  state: SearchState = {
    searchTerm: "",
    result: undefined,
    isLoading: false,
    error: undefined
  },
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case DO_SEARCH:
      return {
        ...state,
        searchTerm: action.searchTerm,
        isLoading: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        error: undefined,
        result: action.results,
        isLoading: false
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default searchReducer;
