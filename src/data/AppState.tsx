import { AuthState } from "./auth/authReducer";
import { DetailState } from "./detail/detailReducer";
import { SearchState } from "./search/searchReducer";
import { WriteState } from "./write/writeReducer";

export interface AppState {
  auth: AuthState;
  search: SearchState;
  write: WriteState;
  detail: DetailState;
}
