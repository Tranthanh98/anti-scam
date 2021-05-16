import { combineReducers } from "redux";
import { selectMenu } from "./select-menu";

const appReducers = combineReducers({
    selectMenu:selectMenu
});
export default appReducers;