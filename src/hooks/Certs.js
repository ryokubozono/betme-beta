import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const CertsContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const CertsProvider = ({ children }) => {
  const [certs, setCerts] = useState([])

    useEffect(() => {
      
      db.collection('cert').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setCerts(data)
        })
      
    }, []);

  return (
    <CertsContext.Provider value={{ certs }}>
      {children}
    </CertsContext.Provider>
  )
}

export { CertsContext, CertsProvider }