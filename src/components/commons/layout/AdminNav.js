import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { Link } from '@material-ui/core';

const AdminNav = (props) => {

  const history = useHistory();

  return (
    <>
      <List>
        <ListItem
          button 
          key={'Book'}
          onClick={() => history.push(`${paths.bookindex}`)}
        >
          <ListItemText primary={'Book'} />
        </ListItem>
        <ListItem
          button 
          key={'Cert'}
          onClick={() => history.push(`${paths.certindex}`)}
        >
          <ListItemText primary={'Cert'} />
        </ListItem>        
        <ListItem
          button 
          key={'Exam'}
          onClick={() => history.push(`${paths.examindex}`)}
        >
          <ListItemText primary={'Exam'} />
        </ListItem>        
        <ListItem
          button 
          key={'User'}
          onClick={() => history.push(`${paths.userindex}`)}
        >
          <ListItemText primary={'User'} />
        </ListItem>
        <ListItem
          button 
          key={'Notice'}
          onClick={() => history.push(`${paths.noticeindex}`)}
        >
          <ListItemText primary={'Notice'} />
        </ListItem>        
      </List>
    </>
  )
}

export default AdminNav;
