import React, { useState, useEffect } from 'react';
import { List, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  linkText: {
    color: '#444',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  categoryStoryCard: {
    marginLeft: theme.spacing(1),
  },
}))

const CategoryTitle = (props) => {
  return (
    <>
      {props.category === 'start' &&
        <>
          <b>勉強を開始した時期</b>
        </>
      }
      {props.category === 'hours' &&
        <>
          <b>勉強した時間</b>
        </>
      }
      {props.category === 'aveHoursDays' &&
        <>
          <b>平日の平均勉強時間</b>
        </>
      }
      {props.category === 'aveHoursHols' &&
        <>
          <b>休日の平均勉強時間</b>
        </>
      }
      {props.category === 'books' &&
        <>
          <b>利用した教材</b>
        </>
      }
      {props.category === 'schools' &&
        <>
          <b>利用した予備校・予備校教材</b>
        </>
      }
      {props.category === 'mot' &&
        <>
          <b>受験した動機</b>
        </>
      }
      {props.category === 'studyMeyhod' &&
        <>
          <b>学習方法</b>
        </>
      }
      {props.category === 'regStudy' &&
        <>
          <b>学習の振り返り</b>
        </>
      }
      {props.category === 'goal' &&
        <>
          <b>今後の目標</b>
        </>
      }
      {props.category === 'advice' &&
        <>
          <b>受験する人へのアドバイス</b>
        </>
      }
    </>
  )
}

const CategoryStoryCard = (props) => {

  const classes = useStyles();

  return (
    <>
      {props.category === 'start' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.start}</p>
        </>
      }
      {props.category === 'hours' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.hours}</p>
        </>
      }
      {props.category === 'aveHoursDays' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.aveHoursDays}</p>
        </>
      }
      {props.category === 'aveHoursHols' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.aveHoursHols}</p>
        </>
      }
      {props.category === 'books' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          {props.story.books 
          && props.story.books.length 
          && props.story.books.map(book=>(
            <p>{book}</p>
          ))}
        </>
      }
      {props.category === 'schools' && props.story.schools && props.story.schools.length &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          {props.story.schools 
          && props.story.schools.length 
          && props.story.schools.map(school=>(
            <p>{school}</p>
          ))}
        </>
      }

      {props.category === 'mot' &&　props.story.mot &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.mot}</p>
        </>
      }
      {props.category === 'studyMeyhod' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.studyMethod}</p>
        </>
      }
      {props.category === 'regStudy' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.regStudy}</p>
        </>
      }
      {props.category === 'goal' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.goal}</p>
        </>
      }

      {props.category === 'advice' &&
        <>
          <CategoryAuthor
            story={props.story}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
          <p>{props.story.advice}</p>
        </>
      }
    </>
  )
}

const CategoryAuthor = (props) => {

  const handleSelectStory = (story) => {
    props.setStory(story);
    props.setStoryTab(1)
  }

  const classes = useStyles();

  return (
    <>
      <Typography
        onClick={() => handleSelectStory(props.story)}
        variant='caption'
        className={classes.linkText}
      >
        {props.story.job}({props.story.biz})、{props.story.age}、{props.story.gender}
      </Typography>
    </>
  )
}



const CategoryPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <CategoryTitle 
        category={props.category}
      />
      <List>
        {props.filteredStories 
        && props.filteredStories.length
        && props.filteredStories.map(story=>(
          <div
            className={classes.categoryStoryCard}
          >
            <CategoryStoryCard 
              category={props.category}
              story={story}
              setStory={props.setStory}
              setStoryTab={props.setStoryTab}
             />
          </div>
        ))
        }
      </List>
    </>
  )
}
export default CategoryPage;