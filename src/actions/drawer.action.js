export const OPEN_DRAWER ="OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";

export const openDrawerAct = (data)=>{
    return {
        type: OPEN_DRAWER,
        payload: data
    }
}

export const closeDrawerAct = ()=>{
    return {
        type: CLOSE_DRAWER
    }
}