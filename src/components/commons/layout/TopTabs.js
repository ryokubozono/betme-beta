import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  atag: {
    color: '#fff',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
  },
}));

const TopTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
      >
        <a
          className={classes.atag}
          href='https://wp.betme.biz'
        >
          <Tab label="ホーム" />
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/riyou/'
        >
          <Tab label="利用方法" />
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/ryoukin/'
        >
          <Tab label="料金" />
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/posts/'
        >
          <Tab label="投稿" />
        </a>
        <a
          className={classes.atag}
          href='/'
        >
          <Tab label="BetMe" />
        </a>
      </Tabs>
    </Paper>
  );
}

export default TopTabs;