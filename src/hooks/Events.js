import React, { createContext, useState, useEffect } from 'react'
// import { AuthContext } from '../components/Auth'
import { db } from "FirebaseConfig";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const EventsContext = createContext()
// const uid = auth.currentUser.uid

// provide medias
const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([])

    useEffect(() => {
      
      db.collection('event').onSnapshot(query => {
      const data = []
      query.forEach(d => data.push({ ...d.data(), uid: d.uid }))
      setEvents(data)
        })
      
    }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsContext, EventsProvider }