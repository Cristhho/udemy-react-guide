import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
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
