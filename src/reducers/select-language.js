import { SELECT_LANGUAGE } from "../actions/select-language";

const initState={};

export const selectLanguage = (state = initState, action)=>{
    switch(action.type){
        case SELECT_LANGUAGE:{
            return action.payload;
        }
        default: return state;
    }
}