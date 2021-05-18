import { combineReducers } from "redux";
import { selectLanguage } from "./select-language";
import { selectMenu } from "./select-menu";

const appReducers = combineReducers({
    selectMenu:selectMenu,
    selectLanguage: selectLanguage
});
export default appReducers;