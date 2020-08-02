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
  textOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const NoticeCardAdmin = (props) => {
  const classes = useStyles();
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();

  const handleSelect = () => {
    history.push(`/admin/notice/edit/${props.notice.docId}`)
  }

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
        onClick={handleSelect}
        button
      >
        <ListItemText
          className={classes.textOverflow}
          primary={props.notice.body}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.notice.type}
                ・
                {props.notice.userId}
              </Typography>
            </React.Fragment>
          }
        />
        {disableFrag? (
          <ListItemIcon edge="end">
            <VisibilityOffIcon />
          </ListItemIcon>
        ):(
          <ListItemIcon edge="end">
            <VisibilityIcon />
          </ListItemIcon>
        )}

      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default NoticeCardAdmin;
