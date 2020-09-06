import React, {useContext, useEffect, useState} from "react";
import { Box, Typography } from "@material-ui/core";
import { UserContext } from 'hooks/User';
import List from '@material-ui/core/List';
import ExamList from "components/commons/card/ExamList";


const MyItem = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <Typography
          component='h2'
        >
          <p>My試験</p>
        </Typography>
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
            <p>My試験はありません。「資格試験を探す」からMy試験に登録しましょう。</p>
          }
        </List>
      </Box>
    </>
  )
}

export default MyItem;