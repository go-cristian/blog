import { combineReducers, Reducer } from "redux";

import authReducer from "./data/auth/authReducer";
import { detailReducer } from "./data/detail/detailReducer";
import { searchReducer } from "./data/search/searchReducer";
import { State } from "./data/State";
import { writeReducer } from "./data/write/writeReducer";

const rootReducer: Reducer<State> = combineReducers({
  auth: authReducer,
  search: searchReducer,
  write: writeReducer,
  detail: detailReducer
});

export default rootReducer;
