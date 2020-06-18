import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const AdminNav = (props) => {

  const history = useHistory();

  return (
    <>
      <List>
        <ListItem
          button 
          key={'Inbox'}
          onClick={() => history.push(`${paths.bookindex}`)}
        >
          <ListItemText primary={'Book'} />
        </ListItem>
        <ListItem
          button 
          key={'Inbox'}
          onClick={() => history.push(`${paths.certindex}`)}
        >
          <ListItemText primary={'Cert'} />
        </ListItem>        
        <ListItem
          button 
          key={'Inbox'}
          onClick={() => history.push(`${paths.examindex}`)}
        >
          <ListItemText primary={'Exam'} />
        </ListItem>        
        <ListItem
          button 
          key={'Inbox'}
          onClick={() => history.push(`${paths.userindex}`)}
        >
          <ListItemText primary={'User'} />
        </ListItem>
      </List>
    </>
  )
}

export default AdminNav;
