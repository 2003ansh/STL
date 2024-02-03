import React, { createContext,useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
const LoginContext = createContext();
export const useAuth = () => {
  
    return useContext(LoginContext);
  };


export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [acess, setAcess] = useState({role: null,acess: []});
    

  const login = (authtoken) => {
    console.log(authtoken);
    setLoggedIn(authtoken);
    localStorage.setItem('auth-token', authtoken);
  };

  const logout = () => {
    setLoggedIn(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('role');
  };

  const access1 = (data1) => {
    console.log(data1);
    setAcess({
      role: data1.role_name,
      acess: data1.access
    });
    localStorage.setItem('role', JSON.stringify({
      role_name: data1.role_name,
      access: data1.access
    }));
    
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    acess,
    access1
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
