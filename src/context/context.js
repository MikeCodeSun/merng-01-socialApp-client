import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";
import jwt_decode from "jwt-decode";

const AppContext = React.createContext();

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const token = JSON.parse(localStorage.getItem("token"));
  const decodeToken = jwt_decode(token);
  if (decodeToken.exp > Date.now() / 1000) {
    initialState.user = decodeToken;
  } else {
    console.log("token exp");
  }
}

export const AppProvider = ({ children }) => {
  const [state, dsipatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    dsipatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    dsipatch({ type: "LOGOUT" });
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
