import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from 'components/commons/atoms/Spacer';
import { List, Button } from '@material-ui/core';
import { NoticesContext } from 'hooks/Notices';
import NoticeCardAdmin from 'components/commons/card/NoticeCardAdmin';
import { makeStyles } from '@material-ui/core/styles';

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

const NoticeIndex = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { notices } = useContext(NoticesContext);

  return (
    <>
      <AppLayout>
        <AdminGate>
          <Button
            color='primary'
            variant="contained"
            onClick={() => history.push(`${paths.noticenew}`)}
            startIcon={<AddIcon />}
          >
            Add Notice
          </Button>
          <Spacer />
          <List className={classes.root}>
            {notices && notices.map(notice => (
              <NoticeCardAdmin notice={notice} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default NoticeIndex;
