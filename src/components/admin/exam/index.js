import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from 'components/commons/atoms/Spacer';
import { List, Button } from '@material-ui/core';
import { ExamsContext } from 'hooks/Exams';
import ExamCardAdmin from 'components/commons/card/ExamCardAdmin';
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

const ExamIndex = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { exams } = useContext(ExamsContext);

  return (
    <>
      <AppLayout>
        <AdminGate>
          <Button
            color='primary'
            variant="contained"
            onClick={() => history.push(`${paths.examnew}`)}
            startIcon={<AddIcon />}
          >
            Add Exam
          </Button>
          <Spacer />
          <List className={classes.root}>
            {exams && exams.map(exam => (
              <ExamCardAdmin exam={exam} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamIndex;
