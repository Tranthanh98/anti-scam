import { UPDATE_PROGRESS } from "../actions/apploading.action";

const initState = false;

export const apploading = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PROGRESS:
      return action.payload;
    default:
      return state;
  }
};
