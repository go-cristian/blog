import { AuthState } from "./auth/authReducer";
import { SearchState } from "./search/searchReducer";
import { WriteState } from "./write/writeReducer";
import { DetailState } from "./detail/detailReducer";

export interface State {
  auth: AuthState;
  search: SearchState;
  write: WriteState;
  detail: DetailState;
}
