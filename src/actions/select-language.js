
export const SELECT_LANGUAGE="SELECT_LANGUAGE";

export const selectLanguageAct = (language)=>{
    return {
        type:SELECT_LANGUAGE,
        payload:language
    }
}
