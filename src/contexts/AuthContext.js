import React, { useEffect, useContext, createContext, useReducer, useState } from 'react';
import { authReducer } from '../reducers/authReducer';


export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  data: null
} 

const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(authReducer, initialState, () => {
  const data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  if(data){
    if(Date.now() <= data.expires_in * 1000){
      return {
        data,
        isAuthenticated: true
      }
    }
    
  }
    return initialState;
  });

  // const logout = () => {
  //   localStorage.clear();
  //   //setIsAuthenticated(false);
  //  };

  return ( 
    <AuthContext.Provider value={{user, dispatch}}>
      {props.children}
    </AuthContext.Provider>
   );
}
 
export default AuthContextProvider;


