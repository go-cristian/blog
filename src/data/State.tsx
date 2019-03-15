import { AuthState } from "./auth/authReducer";
import { DetailState } from "./detail/detailReducer";
import { SearchState } from "./search/searchReducer";
import { WriteState } from "./write/writeReducer";

export interface State {
  auth: AuthState;
  search: SearchState;
  write: WriteState;
  detail: DetailState;
}
