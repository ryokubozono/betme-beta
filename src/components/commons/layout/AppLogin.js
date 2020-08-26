import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nickname: {
    padding: theme.spacing(2),
  },
}));


const AppLogin = (props) => {
  const classes = useStyles();

  return (
    <div
      className={classes.nickname}
    >
      ユーザー：{props.nickName}
    </div>
  )
}

export default AppLogin;