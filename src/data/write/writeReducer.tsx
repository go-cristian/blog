import {
  DO_SAVE_GIST,
  RESET,
  SAVE_FAILURE,
  SAVE_SUCCESS,
  SaveGistAction
} from "./writeActions";

export interface WriteState {
  isLoading: boolean;
  completed: boolean;
  error?: string;
}

export const writeReducer = (
  state: WriteState = {
    isLoading: false,
    completed: false,
    error: undefined
  },
  action: SaveGistAction
): WriteState => {
  switch (action.type) {
    case DO_SAVE_GIST:
      return { ...state, isLoading: true, completed: false };
    case SAVE_SUCCESS:
      return { ...state, isLoading: false, error: undefined, completed: true };
    case SAVE_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case RESET:
      return { error: undefined, isLoading: false, completed: false };
    default:
      return state;
  }
};
