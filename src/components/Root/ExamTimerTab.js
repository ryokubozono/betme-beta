import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TimerNew from "./TimerNew";
import TimerList from "./TimerList";
import TimerEdit from "./TimerEdit";

const ExamTimerTab = (props) => {

  // const [editFrag, setEditFrag] = useState(false);
  const [frag, setFrag] = useState(false);
  const [formFrag, setFormFrag] = useState(false);
  // const [event, setEvent] = useState('')

  const handleNew = () => {
    props.setEditFrag(false)
    setFrag(true)
  };

  const handleEdit = () => {
    props.setEditFrag(true);
    setFrag(true)
  };

  return (
    <>

      {!frag &&
      <>
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {handleNew}
        >
          新規
        </Button>
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {handleEdit}
        >
          編集
        </Button>
      </>
      }

      {!props.editFrag && frag &&
      <>
        <p>new form</p>
        <TimerNew 
          examTarget={props.examTarget} 
        />
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {() => props.setEditFrag(true)}
        >
          編集
        </Button>
      </>
      }

      {props.editFrag && frag && !formFrag &&
      <>
        <p>edit form</p>
        <TimerList
          examTarget={props.examTarget}
          setFormFrag={setFormFrag}
          setEvent={props.setEvent}
        />
        <Button
          variant = 'outlined'
          color = 'primary'
          onClick = {() => props.setEditFrag(false)}
        >
          新規
        </Button>
      </>
      }
      {props.editFrag && frag && formFrag && props.event &&
        <>
          <p>form frag</p>
          <TimerEdit
            examTarget={props.examTarget}
            event={props.event}
          />
          <Button
            variant = 'outlined'
            color = 'primary'
            onClick = {() => setFormFrag(false)}
          >
            一覧
          </Button>
        </>
      }
    </>
  )
}

export default ExamTimerTab;
