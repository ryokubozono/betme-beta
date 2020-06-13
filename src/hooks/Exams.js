import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const ExamsContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const ExamsProvider = ({ children }) => {
  const [exams, setExams] = useState([])

    useEffect(() => {
      
      db.collection('exam').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setExams(data)
        })
      
    }, []);

  return (
    <ExamsContext.Provider value={{ exams }}>
      {children}
    </ExamsContext.Provider>
  )
}

export { ExamsContext, ExamsProvider }