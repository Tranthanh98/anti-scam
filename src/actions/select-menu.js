export const SELECT_MENU = "SELECT_MENU";

export const selectMenuAct = (menu)=>{
    return {
        type: SELECT_MENU,
        payload: menu
    }
}