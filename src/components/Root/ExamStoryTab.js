import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

const ExamStoryTab = (props) => {

  const [storyTab, setStoryTab] = useState(0);

  const handleChange = (event, newValue) => {
    setStoryTab(newValue);
  };


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
        <p>tab 0</p>
      </div>
      <div
        hidden={storyTab !== 1}
      >
        <p>tab 1</p>
      </div>
    </>
  )
}  

export default ExamStoryTab;