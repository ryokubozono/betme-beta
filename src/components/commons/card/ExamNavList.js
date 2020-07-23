import React, { useContext, useEffect, useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ExamsContext } from "hooks/Exams";
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { CertsContext } from "hooks/Certs";
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import Typography from '@material-ui/core/Typography';

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
  const [cert, setCert] = useState('');
  const { certs } = useContext(CertsContext); 

  useEffect(() => {
    if (exams) {
      let examRef = ExamFindFilter(exams, props.examId)
      if (examRef) {
        setExam(examRef)
      }
      let certRef = CertFindFilter(certs, examRef.certId);
      if (certRef) {
        setCert(certRef);
      }  
    }
  }, [exams, props.examId])

  return (

      <ListItem
        button 
        key={props.examId}
        className={classes.nested}
        onClick={() => history.push({
          pathname: `${paths.root}`,
          search: `examId=${exam.docId}`,
        })}
      >
        {/* <ListItemText primary={exam.examName} /> */}
        <ListItemText
        primary='label'
        secondary={
        <>
        <Typography
          component="span"
          variant="body1"
          // className={classes.inline}
          color="textPrimary"
        >
          {cert.name}
        </Typography>
        <br />
        <Typography
          component="span"
          variant="body2"
          // className={classes.inline}
          color="textPrimary"
        >
          ({exam.examName})
        </Typography>
        </>
        }
      />
      </ListItem>

  )
}

export default ExamNavList;
