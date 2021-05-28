import { random, sleep } from "../general/helper";
import { addAlert } from "./alertify.action";
import { loadingAct } from "./loading.action";
import * as httpClient from "../general/HttpClient";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const loginAct = (email, password, callback) => async (dispatch) => {
  console.log("loading");
  dispatch(loadingAct(true));
  try {
    dispatch({ type: REQUEST_LOGIN });

    let response = await httpClient.sendPost("/user/login", {
      email,
      password,
    });
    if (!response.data.isSuccess) {
      throw new Error(response.data.messages);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    callback && callback();
  } catch (e) {
    console.error("error login:", String(e));
    dispatch(addAlert(String(e), "error"));
    dispatch({ type: LOGIN_FAIL, payload: String(e) });
  } finally {
    dispatch(loadingAct(false));
  }
};
