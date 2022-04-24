import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState('');

  const isLoggedIn = !!token;

  const login = (token) => {
    setToken(token);
  }

  const logout = () => {
    setToken('');
  }

  const contextValue = {
    token,
    isLoggedIn,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
