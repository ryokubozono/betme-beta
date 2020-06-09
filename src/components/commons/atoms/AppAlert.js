import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // 
  },
}));

const AppAlert = (props) => {
  const classes = useStyles();
  const location = useLocation('');
  const history = useHistory('');
  const [text, setText] = useState('');
  const [type, setType] = useState('')

  const handleClose = () => {
    history.push({
      state: {text: '', type: ''}
    })
  }

  useEffect(() => {
    if (location.state) {
      history.push({
        state: {
          text: location.state.text, 
          type: location.state.type
        }
      })
    }
  }, [])

  useEffect(() => {
    if (location.state) {
      setText(location.state.text)
      setType(location.state.type)
    }
  }, [location.state])


  return (
    <div className={classes.root}>
      <Snackbar 
        onClose={handleClose}
        open={type === 'success'}
        autoHideDuration={6000}
      >
        <Alert 
          severity="success"
          onClose={handleClose}
        >
          <p>{text}</p>
        </Alert>
      </Snackbar>
      <Snackbar 
        onClose={handleClose}
        open={type === 'error'}
        autoHideDuration={6000}
      >
        <Alert 
          severity="error"
          onClose={handleClose}
        >
          <p>{text}</p>
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AppAlert;