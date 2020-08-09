import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const StoriesContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const StoriesProvider = ({ children }) => {
  const [stories, setStories] = useState([])

    useEffect(() => {
      db.collection('story').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setStories(data)
        })
      
    }, []);

  return (
    <StoriesContext.Provider value={{ stories }}>
      {children}
    </StoriesContext.Provider>
  )
}

export { StoriesContext, StoriesProvider }