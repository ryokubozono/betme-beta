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
import ExamExperienceTab from 'components/Root/ExamExperienceTab';
import { Button, Modal } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import HighlightOff from '@material-ui/icons/HighlightOff';
import AboutBetMe from 'components/Root/AboutBetMe';
import Spacer from "components/commons/atoms/Spacer";

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
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ExamTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isBetmeExam, setIsBetmeExam] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { users } = useContext(UsersContext);
  const history = useHistory();
  const [frag, setFrag] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <>
      <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab 
          label="情報" 
          icon={<Info />} 
        />
        <Tab 
          icon={<Timer />} 
          label="学習記録" 
        />
        <Tab 
          icon={<Equalizer />} 
          label="進捗確認" 
        />
        {isBetmeExam &&
          <Tab 
            icon={<ImportContactsIcon />} 
            label="合格体験記"
          />
        }
      </Tabs>
      <TabPanel value={value} index={0}>
        <ExamInfoTab 
          examTarget={props.examTarget} 
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExamTimerTab 
          examTarget={props.examTarget}         
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ExamChartTab 
          examTarget={props.examTarget}                 
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ExamExperienceTab
          examTarget={props.examTarget}                 
        />
      </TabPanel>
      <div className={classes.dateAlign}>
        <Button
        　color='primary'
          variant="contained"
          size='small'
          onClick={handlePaypal}
          disabled={!frag}
        >
          { frag && 'BetMeに申し込む' }
          { !frag && 'BetMe申込済み' }
        </Button>
        &nbsp;
        &nbsp;

        <Button
          color='primary'
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
      <Spacer />
    </Paper>
    </>
  )
}

export default ExamTabs;

