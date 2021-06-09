export const UPDATE_PROGRESS = "UPDATE_PROGRESS";

export const updateLoading = (status) => {
  return {
    type: UPDATE_PROGRESS,
    payload: status,
  };
};
