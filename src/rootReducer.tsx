import { combineReducers, Reducer } from "redux";
import { State } from "State";

import authReducer from "./auth/authReducer";
import { detailReducer } from "./detail/detailReducer";
import { searchReducer } from "./search/searchReducer";
import { writeReducer } from "./write/writeReducer";

const rootReducer: Reducer<State> = combineReducers({
  auth: authReducer,
  search: searchReducer,
  write: writeReducer,
  detail: detailReducer
});

export default rootReducer;
