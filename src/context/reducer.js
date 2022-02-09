export const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem("token", JSON.stringify(action.payload.token));
    return { ...state, user: action.payload };
  }

  if (action.type === "LOGOUT") {
    localStorage.removeItem("token");
    return { ...state };
  }

  return state;
};
