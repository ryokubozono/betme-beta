import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { StoriesContext } from 'hooks/Stories';
import StoryCard from 'components/commons/card/StoryCard';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from "components/commons/atoms/Spacer";
import AddIcon from '@material-ui/icons/Add';
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

const StoryIndex = (props) => {
  const classes = useStyles();
  const { stories } = useContext(StoriesContext);
  const history = useHistory();
  
  return (
    <>
      <AppLayout>
        <AdminGate>
          <Button
            color='primary'
            variant="contained"
            onClick={() => history.push(`${paths.storynew}`)}
            startIcon={<AddIcon />}
          >
            Add Story
          </Button>
          <Spacer />
          <List className={classes.root}>
            {stories && stories.map(story => (
              <StoryCard story={story} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default StoryIndex;
