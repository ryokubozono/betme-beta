import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const NoticesContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const NoticesProvider = ({ children }) => {
  const [notices, setNotices] = useState([])

  useEffect(() => {   
    
    db.collection('notice').onSnapshot(query => {
    const data = []
    query.forEach(d => data.push({ ...d.data(), uid: d.uid}))
    setNotices(data)
      })

  }, []);

  return (
    <NoticesContext.Provider value={{ notices }}>
      {children}
    </NoticesContext.Provider>
  )
}

export { NoticesContext, NoticesProvider }