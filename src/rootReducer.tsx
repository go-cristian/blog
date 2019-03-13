import { combineReducers, Reducer } from "redux";

import authReducer from "./auth/authReducer";
import { State } from "State";

import { writeReducer } from "./write/writeReducer";
import { searchReducer } from "./search/searchReducer";
import { detailReducer } from "./detail/detailReducer";

const rootReducer: Reducer<State> = combineReducers({
  auth: authReducer,
  search: searchReducer,
  write: writeReducer,
  detail: detailReducer
});

export default rootReducer;
