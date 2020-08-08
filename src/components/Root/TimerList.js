import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from 'hooks/Events';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from "components/commons/card/EventCard";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "hooks/Auth";
import queryString from 'query-string';
import { EventFindFilter } from "components/commons/filters/EventFindFilter";
import { List } from "@material-ui/core";


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
      // filtered by currentUser & examId
      eventRef = eventRef.filter(row => {
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
    <List>
      {filteredEvent && filteredEvent.map(event => (
        <EventCard
          handleSelect={() => handleSelect(event.docId)}
          event={event}
        />
      ))}
    </List>
    
    </>
  )
}

export default TimerList;
