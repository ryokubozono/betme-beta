import React, { useContext, useEffect, useState } from "react";
import { StoriesContext } from "hooks/Stories";
import { List } from "@material-ui/core";
import AuthorCard from "components/commons/card/AuthorCard";
import { StoryFindFilter } from "components/commons/filters/StoryFindFilter";
import AuthorPage from "./AuthorPage";


const AuthorTab = (props) => {

  const { stories } = useContext(StoriesContext);

  const handleSelectStory = (storyId) => {
    console.log('click handle select')
    console.log(storyId)
    if (storyId) {
      let storyRef = StoryFindFilter(stories, storyId)
      if (storyRef) {
        props.setStory(storyRef)
      }
    }
  }

  return (
    <>
      {!props.story &&
        <List>
          {props.filteredStories 
            && props.filteredStories.length 
            && props.filteredStories.map(story =>
              <AuthorCard
                // onClick={() => handleSelectStory(story.docId)}
                handleSelectStory={handleSelectStory}
                story={story}
              />
            )
          }
        </List>
      }
      {props.story &&
        <AuthorPage
          story={props.story}
        />
      }
    </>
  )
}

export default AuthorTab;
