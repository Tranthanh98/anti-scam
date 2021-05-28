export const SIGN_IN_DATA = "SIGN_IN_DATA";

export const signIdData = (authenticationModel) => {
  return {
    type: SIGN_IN_DATA,
    payload: authenticationModel,
  };
};
