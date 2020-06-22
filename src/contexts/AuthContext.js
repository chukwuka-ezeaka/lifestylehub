import React, { useEffect, useContext, createContext, useReducer, useState } from 'react';
import { authReducer } from '../reducers/authReducer';


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(localData){
      //console.log(localData)
      if(Date.now() <= localData.expires_in * 1000){
        setIsAuthenticated(true);
        return localData;
      }
      setIsAuthenticated(false);
      return null;
    }
    return null;
  });

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
   };

  useEffect(() => {
    //localStorage.setItem('user', JSON.stringify(user))
  });

  return ( 
    <AuthContext.Provider value={{user, dispatch, logout, isAuthenticated, setIsAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
   );
}
 
export default AuthContextProvider;


