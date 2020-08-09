import React, { useContext, useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import Spacer from "components/commons/atoms/Spacer";
import CategoryPage from "./CategoyPage";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const CategoryTab = (props) => {
  const classes = useStyles();
  // const [category, setCategory] = useState('');

  const handleSelect = (categoryName) => {
    if (categoryName) {
      props.setCategory(categoryName)
    }
  }
  
  return (
    <>
    <div
      className={classes.root}
    >
      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('start')}
        name='start'
        disabled={props.category === 'start'}
      >
        勉強を開始した時期
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('hours')}
        name='hours'
        disabled={props.category === 'hours'}
      >
        勉強した時間
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('aveHoursDays')}
        name='aveHoursDays'
        disabled={props.category === 'aveHoursDays'}
      >
        平日の平均勉強時間
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('aveHoursHols')}
        name='aveHoursHols'
        disabled={props.category === 'aveHoursHols'}
      >
        休日の平均勉強時間
      </Button>
      
      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('books')}
        name='books'
        disabled={props.category === 'books'}
      >
        利用した教材
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('schools')}
        name='schools'
        disabled={props.category === 'schools'}
      >
        利用した予備校・予備校教材
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('mot')}
        name='mot'
        disabled={props.category === 'mot'}
      >
        受験した動機
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('studyMeyhod')}
        name='studyMeyhod'
        disabled={props.category === 'studyMeyhod'}
      >
        学習方法
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('regStudy')}
        name='regStudy'
        disabled={props.category === 'regStudy'}
      >
        学習方法の振返り
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('goal')}
        name='goal'
        disabled={props.category === 'goal'}
      >
        今後の目標	
      </Button>

      <Button
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => handleSelect('advice')}
        name='advice'
        disabled={props.category === 'advice'}
      >
        受験する人へのアドバイス	
      </Button>

    </div>
    <Spacer />
    <div>
      {props.category &&
        <>
          <CategoryPage
            category={props.category}
            filteredStories={props.filteredStories}
            setStory={props.setStory}
            setStoryTab={props.setStoryTab}
          />
        </>
      }

    </div>
    </>
  )
}

export default CategoryTab;
