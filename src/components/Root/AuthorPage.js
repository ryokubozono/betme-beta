import React, { createContext, useState, useEffect } from 'react'
import AuthorProfile from './AuthorProfile';
import AuthorStory from './AuthorStory';
import Spacer from 'components/commons/atoms/Spacer';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: '#ffd7db',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    borderLeft: '4px solid #E60114', 
    fontWeight: 'bold',
  },
}));


const AuthorPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <AuthorProfile 
        story={props.story}
        classes={classes}
      />
      <Spacer />
      <AuthorStory 
        story={props.story}
        classes={classes}
      />
    </>
  )
}
export default AuthorPage;
