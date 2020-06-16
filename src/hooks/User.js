import React, { createContext, useState, useEffect, useContext } from 'react'
import { UsersContext } from "hooks/Users";
import { AuthContext } from "hooks/Auth";

const UserContext = createContext()
// provide campaigns from user. user is provided by outside.
const UserProvider = ({ children }) => {

  const [user, setUser] = useState([])
  const { users } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (users && currentUser) {
      let userRef = users.find(u => u.docId === currentUser.uid)
      if (userRef) {
        setUser(userRef)
      }
    }
  }, [currentUser, users]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }