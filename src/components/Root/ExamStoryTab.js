import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { StoriesContext } from "hooks/Stories";
import CategoryTab from "./CategoryTab";
import AuthorTab from "./AuthorTab";

const ExamStoryTab = (props) => {

  const [storyTab, setStoryTab] = useState(0);
  const { stories } = useContext(StoriesContext);
  const [filteredStories, setFilteredStories] = useState([]);
  const [category, setCategory] = useState('');
  const [story, setStory] = useState('')

  const handleChange = (event, newValue) => {
    setStoryTab(newValue);
    setStory('');
    setCategory('');
  };

  useEffect(() => {
    if (stories && props.examTarget) {
      let storiesRef = stories;
      storiesRef = storiesRef.filter(row => {
        if (row.certId === props.examTarget.certId) {
          return row;
        }
      })
      setFilteredStories(storiesRef);
    }
  }, [stories, props.examTarget])

  return (
    <>
      <Tabs
        value={storyTab}
        onChange={handleChange}
        vavariant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab
          label="カテゴリから探す" 
        />
        <Tab 
          label="回答者から探す" 
        />
      </Tabs>
      <div
        hidden={storyTab !== 0}
      >
        <CategoryTab 
          category={category}
          setCategory={setCategory}
          filteredStories={filteredStories}
          setStory={setStory}
          setStoryTab={setStoryTab}
        />
      </div>
      <div
        hidden={storyTab !== 1}
      >
        <AuthorTab 
          filteredStories={filteredStories}
          story={story}
          setStory={setStory}
        />
      </div>
    </>
  )
}  

export default ExamStoryTab;