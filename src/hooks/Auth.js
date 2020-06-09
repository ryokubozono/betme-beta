import React, { createContext, useEffect, useState } from "react";
import { auth } from "FirebaseConfig";

const AuthContext = createContext();

const AuthProvider = (props) => {
  // provides current login user from Firebase Auth
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };