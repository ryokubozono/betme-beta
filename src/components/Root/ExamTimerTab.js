import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TimerNew from "./TimerNew";
import TimerList from "./TimerList";
import TimerEdit from "./TimerEdit";
import { makeStyles } from '@material-ui/core/styles';
import Spacer from "components/commons/atoms/Spacer";
import { db } from "FirebaseConfig";
import paths from "paths";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const ExamTimerTab = (props) => {

  const classes = useStyles();
  const [frag, setFrag] = useState(false);
  const [formFrag, setFormFrag] = useState(false);
  const history = useHistory('');

  const handleNew = () => {
    props.setEditFrag(false)
    setFrag(true)
  };

  const handleEdit = () => {
    props.setEditFrag(true);
    setFrag(true)
  };

  const deleteEvent = () => {
    if (window.confirm('削除しますか？')) {
      db.collection('event').doc(props.event.docId).delete()
      .then(() => {
        history.push({
          pathname: `${paths.root}`,
          search: `examId=${props.examTarget.docId}`,
          state: {
            text: '削除しました',
            type: 'success',      
          }
        })
        setFormFrag(false)
      })
      .catch((error) => {
        console.log(error)
        // history.go(0)
        history.push({
          state: {
            text: `${error}`,
            type: 'error',
          }
        })
      })
    }
  }

  return (
    <>

      {!frag &&
      <div
        className={classes.buttonAlign}
      >
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {handleNew}
        >
          新しい学習を登録
        </Button>
        <br />
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {handleEdit}
        >
          学習記録一覧
        </Button>
      </div>
      }

      {!props.editFrag && frag &&
      <>
        <TimerNew 
          examTarget={props.examTarget} 
        />
        <div
          className={classes.buttonAlign}
        >
          <Button
            variant = 'outlined'
            color = 'primary'
            onClick = {() => props.setEditFrag(true)}
          >
            学習記録一覧
          </Button>
        </div>
      </>
      }

      {props.editFrag && frag && !formFrag &&
      <>
        <TimerList
          examTarget={props.examTarget}
          setFormFrag={setFormFrag}
          setEvent={props.setEvent}
        />
        <div
          className={classes.buttonAlign}
        >
          <Button
            variant = 'outlined'
            color = 'primary'
            onClick = {() => props.setEditFrag(false)}
          >
            新しい学習を登録
          </Button>
        </div>
      </>
      }
      {props.editFrag && frag && formFrag && props.event &&
        <div
          className={classes.buttonAlign}
        >
          <TimerEdit
            examTarget={props.examTarget}
            event={props.event}
          />
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => deleteEvent(props.eevent)}
          >
            学習記録を削除
          </Button>
          <br />
          <Button
            variant='outlined'
            color='primary'
            onClick={() => setFormFrag(false)}
          >
            学習記録一覧
          </Button>
        </div>
      }
    </>
  )
}

export default ExamTimerTab;
