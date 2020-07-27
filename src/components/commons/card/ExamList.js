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
import { CertsContext } from "hooks/Certs";
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import Typography from '@material-ui/core/Typography';
import BetMeLogo from 'assets/betme_logo_03.png';
import { AuthContext } from "hooks/Auth";
import { UsersContext } from "hooks/Users";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: 8,
  },
  inline: {
    display: 'inline',
  },
}));

const ExamList = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { exams } = useContext(ExamsContext);
  const [exam, setExam] = useState('');
  const [cert, setCert] = useState('');
  const [frag, setFrag] = useState(false);
  const classes = useStyles();
  const history = useHistory('');
  const { certs } = useContext(CertsContext); 
  const [isBetmeExam, setIsBetmeExam] = useState(false);
  const { users } = useContext(UsersContext);

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

  useEffect(() => {
    if (currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid);
      if (userRef && userRef.betmeExam && userRef.betmeExam.indexOf(props.examId) !== -1 ) {
        setIsBetmeExam(true);
      } else {
        setIsBetmeExam(false);
      }
    }
  }, [users, currentUser, props.examId])

  return (
    <ListItem className={classes.root}>
      <ListItemText
        primary={isBetmeExam && <img src={BetMeLogo} height='15' /> }
        secondary={
        <>
        <Typography
          component="span"
          variant="body1"
          className={classes.inline}
          color="textPrimary"
        >
          {cert.name}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          ({exam.examName})
        </Typography>
        </>
        }
      />
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
