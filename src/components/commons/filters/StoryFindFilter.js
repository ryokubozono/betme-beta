export const StoryFindFilter =(stories, storyId) => {
  let story = '';
  story = stories.find(c => c.docId === storyId)
  return(story)
}