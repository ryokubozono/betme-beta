import React, { useContext, useEffect, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GetYearMonthDate from "components/commons/atoms/GetYearMonthDate";
import firebase, { db } from "FirebaseConfig";
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import HighlightOff from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import { Button, Modal } from "@material-ui/core";
import Spacer from "components/commons/atoms/Spacer";
import AboutBetMe from 'components/Root/AboutBetMe';
import paths from "paths";
import { useHistory } from 'react-router-dom';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderLeftWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dateBold: {
    color: theme.palette.secondary.main,
    fontSize: 24,
  },
  dateAlign: {
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    height: 400,
    overflow: 'scroll',
  },
  stepper: {
    margin: 'auto',
  },
  stepLabelText: {
    // fontSize: '10px',
  },
  closeButton: {
    textAlign: 'right',
  }
}));

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    marginLeft: 10,
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },

});


function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ExamInfoTab = (props) => {
  const classes = useStyles();
  const today = firebase.firestore.Timestamp.fromDate(new Date(Date.now()));
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [todayNumber, setTodayNumber] = useState();
  const history = useHistory();
  const [frag, setFrag] = useState(false);

  useEffect(() => {
    if (today && props.examTarget.examDate) {
      let dateRef = props.examTarget.examDate.seconds - today.seconds
      if (dateRef < 1) {
        setDate(0)
      } else {
        setDate(Math.floor(dateRef / 86400))
      }
    }
  }, [props.examTarget.examDate])

  useEffect(() => {
    let dataRef = []
    let dataBetMeRef = []
    if (props.examTarget.applyDate) {
      dataRef.push({
        date: props.examTarget.applyDate,
        label: '試験申込締切',
      })
    }
    if (props.examTarget.examDate) {
      dataRef.push({
        date: props.examTarget.examDate,
        label: '試験日'
      })
    }
    if (props.examTarget.betmeApplyDate) {
      dataRef.push({
        date: props.examTarget.betmeApplyDate,
        label: 'BetMe申込締切'
      })
    }
    if (props.examTarget.betmeResultDate) {
      dataRef.push({
        date: props.examTarget.betmeResultDate,
        label: 'BetMe報告締切'
      })
    }
    if (props.examTarget.resultDate) {
      dataRef.push({
        date: props.examTarget.resultDate,
        label: '合格発表日'
      })
    }
    if (today) {
      dataRef.push({
        date: today,
        label: '本日'
      })
    }
    dataRef.sort(function(a,b){
      if(a.date.seconds < b.date.seconds) return -1;
      if(a.date.seconds > b.date.seconds) return 1;
      return 0;
    });
    dataBetMeRef.sort(function(a,b){
      if(a.date.seconds < b.date.seconds) return -1;
      if(a.date.seconds > b.date.seconds) return 1;
      return 0;
    });
    dataRef.forEach((data, index) => {
      if (data.label === '本日') {
        setTodayNumber(index)
      }
    })
    setData(dataRef)
  }, [props.examTarget.applyDate, props.examTarget.betmeApplyDate, props.examTarget.betmeResultDate, props.examTarget.examDate, props.examTarget.examTarget, props.examTarget.resultDate])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePaypal = () => {
    history.push(`/paypal/${props.examTarget.docId}`);
  }

  useEffect(() => {
    if (props.examTarget && props.examTarget.betAmount && props.examTarget.betAmount !== '0') {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [props.examTarget])

  return (
    <div className={classes.root}>
      {/* <h4>{props.examTarget.examName}</h4> */}
      <Stepper
        activeStep={todayNumber} 
        // alternativeLabel
        nonLinear
        connector={<QontoConnector />}
        orientation="vertical"
        className={classes.stepper}
      >
        { data && data.map(data => (
          <Step>
            <StepLabel
              StepIconComponent={QontoStepIcon} 
            >
              <b className={classes.stepLabelText}>
                {data.date && <GetYearMonthDate timestamp={data.date} />}
              </b>
              &nbsp;
              &nbsp;
              <b className={classes.stepLabelText}>
                {data.label}
              </b>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.dateAlign}>
        試験まであと&nbsp;&nbsp;
        <b className={classes.dateBold}>
          {date}
        </b> 
        &nbsp;&nbsp;日
      </div>
      <Spacer />
      <div className={classes.dateAlign}>
        <Button
        　color='secondary'
          variant="contained"
          size='small'
          onClick={handlePaypal}
          disabled={!frag}
        >
          BetMeに申し込む
        </Button>
        &nbsp;
        &nbsp;

        <Button
          color='secondary'
          variant="outlined"  
          size='small'
          onClick={handleOpen}
        >
          BetMeって？
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <div
                className={classes.closeButton}              
              >
                <HighlightOff 
                  onClick={handleClose}
                />
              </div>
              <AboutBetMe />
            </div>
          </Modal>
      </div>
    </div>
  );
}

export default ExamInfoTab;
