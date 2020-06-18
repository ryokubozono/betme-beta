import React, { useContext, useEffect, useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ExamsContext } from "hooks/Exams";
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ExamNavList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { exams } = useContext(ExamsContext);
  const [exam, setExam] = useState('')

  useEffect(() => {
    if (exams) {
      let examRef = ExamFindFilter(exams, props.examId)
      if (examRef) {
        setExam(examRef)
      }
    }
  }, [exams, props.examId])

  return (
    <>
      <ListItem 
        button 
        key={exam.docId}
        className={classes.nested}
        onClick={() => history.push({
          pathname: `${paths.root}`,
          search: `examId=${exam.docId}`,
        })}
      >
        <ListItemText primary={exam.examName} />
      </ListItem>
    </>
  )
}

export default ExamNavList;
