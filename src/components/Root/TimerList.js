import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from 'hooks/Events';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from "components/commons/card/EventCard";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "hooks/Auth";
import queryString from 'query-string';
import { EventFindFilter } from "components/commons/filters/EventFindFilter";


const TimerList = (props) => {
  const { events } = useContext(EventsContext);
  // const [event, setEvent] = useState('');
  const { currentUser } = useContext(AuthContext);
  const [filteredEvent, setFilteredEvent] = useState([]);
  const location = useLocation();

  const handleSelect = (eventId) => {
    if (eventId) {
      let eventRef = EventFindFilter(events, eventId);
      if (eventRef && eventRef.examId === queryString.parse(location.search).examId) {
        props.setEvent(eventRef)
        props.setFormFrag(true)
      } else {
        props.setEvent('')
        props.setFormFrag(false)
      }
    } else {
      props.setEvent('')
      props.setFormFrag(false)
    }
  }
  
  useEffect(() => {
    if (events) {
      // all events
      let eventRef = events;
      console.log(eventRef)
      // filtered by currentUser & examId
      eventRef = eventRef.filter(row => {
        console.log(row.userId)
        console.log(currentUser.uid)
        console.log(queryString.parse(location.search).examId)
        console.log(row.examId)
        if (
          row.userId === currentUser.uid && 
          queryString.parse(location.search).examId === row.examId
          ) 
        {
          return row;          
        } else {
          return false;
        }
      })
      setFilteredEvent(eventRef);
    }
  }, [currentUser, location.search, events])

  return (
    <>
      {filteredEvent && filteredEvent.map(event => (
        <EventCard
          handleSelect={() => handleSelect(event.docId)}
          event={event}
        />
      ))}
    </>
  )
}

export default TimerList;
