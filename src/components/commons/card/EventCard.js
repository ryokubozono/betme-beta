import React, { useState, useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GetYearMonthDate from '../atoms/GetYearMonthDate';

const useStyles = makeStyles((theme) => ({
  beforeOpen: {
    backgroundColor: '#fff',
  },
  afterOpen: {
    backgroundColor: '#eee',
  },
  textOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const EventCard = (props) => {
  const history = useHistory();
  const classes = useStyles();


  return (
    <>
      <ListItem
        onClick={props.handleSelect}
        button
      >
        <ListItemText
          className={classes.textOverflow}
          primary={<GetYearMonthDate timestamp={props.event.studyDate} />}
          secondary={'[学習時間]' + props.event.studyTime + 'min'}
        />
      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default EventCard;
