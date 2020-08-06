import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
import { AuthContext } from './Auth';
import { NoticesContext } from './Notices';
// import { useCollectionData } from "react-firebase-hooks/firestore";

const MyNoticesContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const MyNoticesProvider = ({ children }) => {
  const [myNotices, setMyNotices] = useState([])
  const { currentUser } = useContext(AuthContext);
  const { notices } = useContext(NoticesContext);
  useEffect(() => {   
    let tmpMyNotices = []
    if (notices && currentUser) {
      let tmpMyNotices = notices
      tmpMyNotices = tmpMyNotices.filter(row => {
        if (row.userId === currentUser.uid) {
          return row;
        } else {
          return false;
        }
      })
      setMyNotices(tmpMyNotices);
    } else {
      setMyNotices('');
    }
    // db.collection('notice').onSnapshot(query => {
    // const data = []
    // query.forEach(d => data.push({ ...d.data(), uid: d.uid}))
    // setMyNotices(data)
    //   })

  }, [currentUser, notices]);

  return (
    <MyNoticesContext.Provider value={{ myNotices }}>
      {children}
    </MyNoticesContext.Provider>
  )
}

export { MyNoticesContext, MyNoticesProvider }