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

const BookCard = (props) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState('')
  const [adminFrag, setAdminFrag] = useState(false);
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();
  const handleSelectBook = () => {
    history.push(`/admin/book/edit/${props.book.docId}`)
  }

  useEffect(() => {
    if (props.book.userId) {
      setAdminFrag(true)
      let userRef = UserFindFilter(users, props.book.userId)
      if (userRef) {
        setUser(userRef)
      }
    }
  }, [props.book.userId, users])

  useEffect(() => {
    if (props.book.isDisable) {
      setDisableFrag(true)
    } else {
      setDisableFrag(false)
    }
  }, [props.book.isDisable])
  return (
    <>
      <ListItem
        onClick={handleSelectBook}
        button
      >

        <ListItemText
          primary={props.book.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                Made By : 
              </Typography>
              {adminFrag ? (
                <>
                {user && user.docId}              
                </>
              ):(
                <>
                  Admin
                </>
              )}
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

export default BookCard;
