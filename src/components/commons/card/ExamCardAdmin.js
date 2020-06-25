import React, { useState, useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const ExamCardAdmin = (props) => {
  const [disableFrag, setDisableFrag] = useState(false);
  const history = useHistory();

  const handleSelectExam = () => {
    history.push(`/admin/exam/edit/${props.exam.docId}`)
  }

  useEffect(() => {
    if (props.exam.isDisable) {
      setDisableFrag(true)
    } else {
      setDisableFrag(false)
    }
  }, [props.exam.isDisable])
  return (
    <>
      <ListItem
        onClick={handleSelectExam}
        button
      >
        <ListItemText
          primary={props.exam.examName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.exam.note}
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

export default ExamCardAdmin;
