import { GistContent } from "../data/models";
import {
  DetailAction,
  DO_REQUEST,
  REQUEST_DETAIL_SUCCESS,
  REQUEST_DETAIL_FAILURE
} from "./detailActions";

export interface DetailState {
  isLoading: boolean;
  gist?: GistContent;
  id: string;
  error?: string;
  previousId?: string;
  nextId?: string;
}

export const detailReducer = (
  state: DetailState = {
    id: "",
    gist: undefined,
    isLoading: false,
    error: undefined,
    previousId: undefined,
    nextId: undefined
  },
  action: DetailAction
): DetailState => {
  switch (action.type) {
    case DO_REQUEST:
      return {
        ...state,
        id: action.id,
        isLoading: true
      };
    case REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        error: undefined,
        gist: action.gist,
        isLoading: false,
        previousId: action.previousId,
        nextId: action.nextId
      };
    case REQUEST_DETAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default detailReducer;
