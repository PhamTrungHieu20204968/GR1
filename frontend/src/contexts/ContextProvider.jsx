import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER")));
  const [admin, _setAdmin] = useState(
    JSON.parse(localStorage.getItem("ADMIN"))
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  };

  const setAdmin = (admin) => {
    _setAdmin(admin);
    if (admin) {
      localStorage.setItem("ADMIN", JSON.stringify(admin));
    } else {
      localStorage.removeItem("ADMIN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        admin,
        setAdmin,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
