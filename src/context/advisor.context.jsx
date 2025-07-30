import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(() => window.localStorage.getItem('jwt'));
  const [isAdmin, setIsAdmin] = useState(() => {
    const decodedToken = jwt && jwt !== "" && jwt !== "null" ? jwtDecode(jwt) : null; // Usa jwtDecode para decodificar el token
    return decodedToken && decodedToken.userForToken.userType === 'admin';
  });

  return (
    <Context.Provider value={{ jwt, setJWT, isAdmin, setIsAdmin }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
