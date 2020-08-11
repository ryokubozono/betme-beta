import React, {useContext, useEffect, useState} from "react";
import { Box } from "@material-ui/core";
import { UserContext } from 'hooks/User';
import List from '@material-ui/core/List';
import ExamList from "components/commons/card/ExamList";


const MyItem = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <p>My試験</p>
        <List>
          {props.frag && user.myExam.map(examId => (
            <ExamList 
              examId={examId}
              examTarget={props.examTarget}
              setExamTarget={props.setExamTarget} 
              setEvent={props.setEvent}
              setEditFrag={props.setEditFrag}
              setWhatIsBetMeChallenge={props.setWhatIsBetMeChallenge}
            />
          ))}
          {!props.frag &&
            <p>My試験はありません</p>
          }
        </List>
      </Box>
    </>
  )
}

export default MyItem;