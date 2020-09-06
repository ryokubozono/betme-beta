import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { UsersContext } from "hooks/Users";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const StoryCard = (props) => {

  const history = useHistory();

  const handleSelectStory = () => {
    if (props.story.docId) {
      history.push(`/admin/story/edit/${props.story.docId}`)
    }
  }

  return (
    <>
      <ListItem
        onClick={handleSelectStory}
        button
      >

        <ListItemText
          primary={props.story.uid}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.story.age}/{props.story.gender}
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider
        component="li" 
      />
    </>
  )
}

export default StoryCard;
