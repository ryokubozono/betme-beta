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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
        <Tab icon={<Info />} aria-label="info" />
        <Tab icon={<Timer />} aria-label="timer" />
        <Tab icon={<Equalizer />} aria-label="equalizer" />
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
    </Paper>
    </>
  )
}

export default ExamTabs;

