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
  },
  afterOpen: {
    backgroundColor: '#eee',
  },
  textOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const NoticeCardAdmin = (props) => {
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  // const handleSelect = () => {
  //   db.collection('notice').doc(props.notice.docId).set({
  //     beforeOpen: false
  //   }, {merge: true})
  // }

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
          primary={props.notice.body}
        />
      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default NoticeCardAdmin;
