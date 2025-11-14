export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...action.payload,
        isShown: true,
      };
    case "CLEAR":
    default:
      return initNotification;
  }
};
export const initNotification = {
  isShown: false,
  msg: "",
  type: "",
};
