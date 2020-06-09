import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  spacer: {
    clear: 'both',
    height: `2rem`,
    width: 'auto',
  },
}))

const Spacer = () => {
  const classes = useStyles();
  return <div className={classes.spacer} />;
};

export default Spacer;