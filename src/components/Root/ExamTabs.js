import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Info from '@material-ui/icons/Info';
import Timer from '@material-ui/icons/Timer';
import Equalizer from '@material-ui/icons/Equalizer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExamInfoTab from 'components/Root/ExamInfoTab';
import ExamTimerTab from 'components/Root/ExamTimerTab';
import ExamChartTab from 'components/Root/ExamChartTab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { AuthContext } from "hooks/Auth";
import { UsersContext } from "hooks/Users";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import { Button, Modal } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Spacer from "components/commons/atoms/Spacer";
import firebase, { db } from "FirebaseConfig";
import paths from "paths";
import ExamStoryTab from "components/Root/ExamStoryTab";
import GetYearMonthDateJap from "components/commons/atoms/GetYearMonthDateJap";
import AnchorLink from 'react-anchor-link-smooth-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateAlign: {
    textAlign: 'center',
    width: '190px',
    margin: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    height: 400,
    overflow: 'scroll',
  },
  closeButton: {
    textAlign: 'right',
  },
  note: {
    textAlign: 'left',
    padding: theme.spacing(2),
  },
  box: {
    maxWidth: '500px',
    paddingLeft: theme.spacing(2),
    margin: 'auto',
  },
  redText: {
    color: '#f00',
    fontSize: '1.2em',
  },
  blackText: {
    fontSize: '1.2em',
  },
  webButton: {
    textTransform: 'none',
  },
  underLineFalse: {
    textDecoration: 'none',
  },
}));

const ExamTabs = (props) => {
  const classes = useStyles();
  const [isBetmeExam, setIsBetmeExam] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { users } = useContext(UsersContext);
  const history = useHistory();
  const [frag, setFrag] = useState(false);
  const [open, setOpen] = useState(false);
  const [beforeResult, setBeforeResult] = useState(false);
  const today = firebase.firestore.Timestamp.fromDate(new Date(Date.now()));

  const handleChange = (event, newValue) => {
    props.setValue(newValue);

  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if (currentUser && props.examTarget) {
      let userRef = UserFindFilter(users, currentUser.uid);
      if (userRef && userRef.betmeExam && userRef.betmeExam.indexOf(props.examTarget.docId) !== -1 ) {
        setIsBetmeExam(true);
      } else {
        setIsBetmeExam(false);
      }
    }
  }, [users, currentUser, props.examTarget])

  useEffect(() => {
    if (props.examTarget && props.examTarget.betAmount && props.examTarget.betAmount !== '0') {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [props.examTarget])

  useEffect(() => {
    if (currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid);
      if (userRef && userRef.betmeExam && userRef.betmeExam.indexOf(props.examTarget.docId) !== -1 ) {
        setFrag(false);
      } else {
        setFrag(true);
      }
    }
  }, [users, currentUser, props.examTarget])

  const removeMyExam = () => {
    if (window.confirm('My?????????????????????????????????')) {
      db.collection('user').doc(currentUser.uid).update({
        myExam: firebase.firestore.FieldValue.arrayRemove(
          props.examTarget.docId
        )
      })
      .then(() => {
        history.push({
          pathname: `${paths.root}`,
          state: {
            text: '??????????????????',
            type: 'success',
          }
        })
      })
      .catch((error) => {
        console.log(error)
        history.push({
          state: {
            text: `${error}`,
            type: 'error',
          }
        })
      })
    }
  }

  const handleWhat = () => {
    props.setWhatIsBetMeChallenge(true)
  }

  useEffect(() => {
    console.log(today.seconds)
    console.log(props.examTarget)
    if (props.examTarget && props.examTarget.resultDate && today) {
      if (today.seconds < props.examTarget.resultDate.seconds) {
        setBeforeResult(true)
      } else {
        setBeforeResult(false)
      }
    }
  }, [props.examTarget, today])

  return (
    <>
      <Box bgcolor='white'>
      {frag && props.cert && props.examTarget && props.examTarget.betAmount &&
        <div
          className={classes.box}
        >
          <br />
          <div className={classes.dateAlign}>
            <AnchorLink href='#whatIsBetMe' offset="50" className={classes.underLineFalse}>
              <Button
                color='primary'
                variant='contained'
                size='small'
                onClick={handleWhat}
                fullWidth
                disableElevation='false'
                className={classes.webButton}
              >
                BetMe???????????????????????????
              </Button>
            </AnchorLink>
          </div>

          {props.cert && props.examTarget && props.examTarget.betAmount &&
            <p>
              ?????????????????????:&nbsp;
              <b
                className={classes.redText}
              >
                {props.examTarget.betAmount.toLocaleString()}???
              </b>
            </p>
          }
          {props.cert &&???props.examTarget && props.examTarget.returnAmount &&
            <p>
              ?????????:&nbsp;
              <b
                className={classes.blackText}
              >
                {props.examTarget.returnAmount.toLocaleString()}???
              </b>
              <br />
              ?????????????????????BetMe????????????????????????????????????????????????????????????????????????
            </p>
          }

          <br />
        </div>
      }
      </Box>
      <br />
      <Box bgcolor='white'>
      <Tabs
        value={props.value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab 
          label="??????" 
          icon={<Info />} 
        />
        <Tab 
          icon={<Timer />} 
          label="????????????" 
        />
        <Tab 
          icon={<Equalizer />} 
          label="????????????" 
        />
        {isBetmeExam &&
          <Tab 
            icon={<ImportContactsIcon />} 
            label="???????????????"
          />
        }
      </Tabs>
      <div
        hidden={props.value !== 0}
      >
        {props.value === 0 && 
          <ExamInfoTab 
            examTarget={props.examTarget} 
          />
        }
      </div>
      <div
        hidden={props.value !== 1}
      >
        {props.value === 1 && 
          <ExamTimerTab 
            examTarget={props.examTarget}  
            event={props.event}
            setEvent={props.setEvent} 
            editFrag={props.editFrag}
            setEditFrag={props.setEditFrag}      
          />
        }
      </div>
      <div
        hidden={props.value !== 2}
      >
        {props.value === 2 && 
          <ExamChartTab 
            examTarget={props.examTarget}                 
          />            
        }
      </div>
      <div
        hidden={props.value !== 3}
      >
        {props.value === 3 && 
          <ExamStoryTab
            examTarget={props.examTarget}
            setValue={props.setValue}              
          />
        }
      </div>
      <br />
      <div className={classes.dateAlign}>
        { props.cert && props.examTarget && props.examTarget.betAmount &&
          <AnchorLink href='#whatIsBetMe' offset="50" className={classes.underLineFalse}>
            <Button
            ???color='primary'
              variant="contained"
              size='small'
              onClick={handleWhat}
              disabled={!frag}
              fullWidth
              className={classes.webButton}
            >
              { frag && 'BetMe???????????????????????????' }
              { !frag && 'BetMe????????????????????????' }
            </Button>
          </AnchorLink>
        }
        <br />
        <br />
        {frag &&
          <Button
          ???color='secondary'
            variant="outlined"
            size='small'
            onClick={removeMyExam}
            disabled={!frag}
            fullWidth
          >
            { frag && 'My??????????????????' }
            { !frag && '?????????????????????' }
          </Button>
        }
        {!frag &&
          <>
            <Button
              color='primary'
              variant="contained"
              disabled={beforeResult}
              size='small'
            >
              ????????????
              {beforeResult &&
                <b>
                  *
                </b>
              }
            </Button>
            <br />
            {beforeResult &&
              <p className={classes.note}>
                * ??????????????????<GetYearMonthDateJap timestamp={props.examTarget.resultDate} />?????????????????????????????????
              </p>
            }
          </>
        }
      </div>
      <Spacer />
      </Box>
    </>
  )
}

export default ExamTabs;

