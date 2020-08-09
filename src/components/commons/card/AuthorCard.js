import React, { useState, useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GetYearMonthDate from '../atoms/GetYearMonthDate';
import { Typography } from '@material-ui/core';

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

const AuthorCard = (props) => {
  const history = useHistory();
  const classes = useStyles();


  return (
    <>
      <ListItem
        onClick={() => props.handleSelectStory(props.story.docId)}
        button
      >
        <ListItemText
          className={classes.textOverflow}
          primary={
            <Typography>
              {props.story.job}({props.story.biz})
            </Typography>
          }
          secondary={
            <Typography>
              {props.story.age}/{props.story.gender}
            </Typography>
          }
        />
      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default AuthorCard;
