import React, { useContext, useState, useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { UsersContext } from "hooks/Users";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const UserCardAdmin = (props) => {
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();

  const handleSelectUser = () => {
    history.push(`/admin/user/edit/${props.user.docId}`)
  }

  useEffect(() => {
    if (props.user.isDisable) {
      setDisableFrag(true)
    } else {
      setDisableFrag(false)
    }
  }, [props.user.isDisable])

  return (
    <>
      <ListItem
        onClick={handleSelectUser}
        button
      >

        <ListItemText
          primary={props.user.docId}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.user.docId}
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

export default UserCardAdmin;
