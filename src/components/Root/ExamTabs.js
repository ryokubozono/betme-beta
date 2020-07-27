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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    </Paper>
    </>
  )
}

export default ExamTabs;

