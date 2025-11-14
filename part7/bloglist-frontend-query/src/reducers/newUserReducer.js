export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...action.payload,
        isShown: true,
      };
    case "LOGOUT":
    default:
      return null;
  }
};
