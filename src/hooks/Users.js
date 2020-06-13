import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const UsersContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])

    useEffect(() => {
      db.collection('user').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setUsers(data)
        })
      
    }, []);

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersProvider }