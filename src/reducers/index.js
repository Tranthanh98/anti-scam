import { combineReducers } from "redux";
import { alertify } from "./alertify.reducer";
import { drawerReducer } from "./drawer.reducer";
import { loadingReducer } from "./loading.reducer";
import { loginReducer } from "./login.reducer";
import { modalReducer } from "./modal.reducer";
import { selectLanguage } from "./select-language";
import { selectMenu } from "./select-menu";

const appReducers = combineReducers({
  selectMenu: selectMenu,
  selectLanguage: selectLanguage,
  modalReducer: modalReducer,
  drawerReducer: drawerReducer,
  loginReducer: loginReducer,
  alert: alertify,
  loadingReducer: loadingReducer,
});
export default appReducers;
