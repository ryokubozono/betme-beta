import React, { useState, useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  beforeOpen: {
    backgroundColor: '#fff',
    width: '100%',
  },
  afterOpen: {
    backgroundColor: '#eee',
    width: '100%',
  },
  textOverflow: {
    // maxHeight: '50px',
  },
}))

const NoticeCard = (props) => {
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!props.notice.beforeOpen) {
      setDisableFrag(true)
    } else {
      setDisableFrag(false)
    }
  }, [props.notice.isDisable])

  return (
    <>
      <ListItem
        onClick={props.handleSelect}
        button
        className={props.notice.beforeOpen && classes.beforeOpen }
        className={!props.notice.beforeOpen && classes.afterOpen }
      >
        <ListItemText
          className={classes.textOverflow}
          primary={
            <Typography
              component='span'
              variant='body1'
            >   
              {props.notice.body.length > 50 ? (
                props.notice.body.substr(0, 50) + '...'
              ):(
                props.notice.body
              )
              }
            </Typography>
          }
        />
      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default NoticeCard;
