import React, {useContext, useEffect, useState} from "react";
import { Box } from "@material-ui/core";
import { UserContext } from 'hooks/User';
import List from '@material-ui/core/List';
import ExamList from "components/commons/card/ExamList";


const MyItem = (props) => {
  const { user } = useContext(UserContext);
  const [frag, setFrag] = useState(false);

  useEffect(() => {
    if (user.myExam && user.myExam.length) {
      setFrag(true)
    }
  }, [user.myExam])

  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <p>受験する資格試験</p>
        <List>
          {frag && user.myExam.map(examId => (
            <ExamList examId={examId} setExamTarget={props.setExamTarget} />
          ))}
          {!frag &&
            <p>受験する資格試験はありません</p>
          }
        </List>
      </Box>
    </>
  )
}

export default MyItem;