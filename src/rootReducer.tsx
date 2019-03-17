import { combineReducers, Reducer } from "redux";

import { AppState } from "./data/AppState";
import authReducer from "./data/auth/authReducer";
import { detailReducer } from "./data/detail/detailReducer";
import { searchReducer } from "./data/search/searchReducer";
import { writeReducer } from "./data/write/writeReducer";

const rootReducer: Reducer<AppState> = combineReducers({
  auth: authReducer,
  search: searchReducer,
  write: writeReducer,
  detail: detailReducer
});

export default rootReducer;
