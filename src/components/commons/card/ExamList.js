import React, { useContext, useEffect, useState } from "react";
import { ExamsContext } from "hooks/Exams";
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: 8,
  },
}));

const ExamList = (props) => {
  const { exams } = useContext(ExamsContext);
  const [exam, setExam] = useState('')
  const [frag, setFrag] = useState(false);
  const classes = useStyles();
  const history = useHistory('');

  useEffect(() => {
    if (exams) {
      let examRef = ExamFindFilter(exams, props.examId)
      if (examRef) {
        setExam(examRef)
      }
    }
  }, [exams, props.examId])

  useEffect(() => {
    if (props.examId && props.examTarget) {
      if (String(props.examId) === String(props.examTarget.docId)) {
        setFrag(true)
      } else {
        setFrag(false)
      }
    } else {
      setFrag(false)
    }
  }, [props.examId, props.examTarget])

  const handleExamTarget = (exam) => {
    history.push({
      search: `examId=${exam.docId}`
    })
  }

  return (
    <ListItem className={classes.root}>
      <ListItemIcon>

      </ListItemIcon>
      <ListItemText>
        {exam.examName}
      </ListItemText>
      <ListItemSecondaryAction 
        onClick={() => handleExamTarget(exam)}
      >
        <IconButton edge="end" aria-label="comments">
        { frag ?
          (
            <Edit 
              color='primary'
            />
          ):(
            <Edit 
            />
          )
        }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default ExamList;
