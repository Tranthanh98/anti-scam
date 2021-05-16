import { SELECT_MENU } from "../actions/select-menu";

const initState = {};

export const selectMenu = (state= initState, action)=>{
    switch(action.type){
        case SELECT_MENU:{
            return action.payload;
        }
        default: return state;
    }
}