import { combineReducers } from "redux";
import { drawerReducer } from "./drawer.reducer";
import { modalReducer } from "./modal.reducer";
import { selectLanguage } from "./select-language";
import { selectMenu } from "./select-menu";

const appReducers = combineReducers({
    selectMenu:selectMenu,
    selectLanguage: selectLanguage,
    modalReducer: modalReducer,
    drawerReducer: drawerReducer
});
export default appReducers;