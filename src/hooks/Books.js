import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const BooksContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([])

    useEffect(() => {
      
      db.collection('book').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setBooks(data)
        })
      
    }, []);

  return (
    <BooksContext.Provider value={{ books }}>
      {children}
    </BooksContext.Provider>
  )
}

export { BooksContext, BooksProvider }