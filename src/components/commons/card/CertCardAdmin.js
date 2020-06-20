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

const CertCardAdmin = (props) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState('')
  const [adminFrag, setAdminFrag] = useState(false);
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();
  const handleSelectCert = () => {
    history.push(`/admin/cert/edit/${props.cert.docId}`)
  }


  useEffect(() => {
    if (props.cert.isDisable) {
      setDisableFrag(true)
    } else {
      setDisableFrag(false)
    }
  }, [props.cert.isDisable])
  return (
    <>
      <ListItem
        onClick={handleSelectCert}
        button
      >

        <ListItemText
          primary={props.cert.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.cert.note}
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

export default CertCardAdmin;
