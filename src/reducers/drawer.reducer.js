import { CLOSE_DRAWER, OPEN_DRAWER } from "../actions/drawer.action";

const initState={
    title:null,
    body:null,
    isOpen:false
}

export const drawerReducer = (state = initState, action)=>{
    switch(action.type){
        case OPEN_DRAWER:{
            let cloneState = {...state};
            cloneState.isOpen = true;
            cloneState.title = action.payload.title;
            cloneState.body = action.payload.body;

            return cloneState;
        }
        case CLOSE_DRAWER:{
            let cloneState = {...state};
            cloneState.isOpen = false;
            cloneState.title = null;
            cloneState.body = null;
            return cloneState;
        }
        default : return state;
    }
}