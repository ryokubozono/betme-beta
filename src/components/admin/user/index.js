import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { UsersContext } from 'hooks/Users';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from "components/commons/atoms/Spacer";
import AddIcon from '@material-ui/icons/Add';
import UserCardAdmin from 'components/commons/card/UserCardAdmin';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const UserIndex = (props) => {

  const classes = useStyles();
  const { users } = useContext(UsersContext);
  const history = useHistory();

  return (
    <>
      <AppLayout>
        <AdminGate>
          <List className={classes.root}>
            {users && users.map(user => (
              <UserCardAdmin user={user} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default UserIndex;
