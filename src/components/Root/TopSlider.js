import React from "react";
import study_image from 'assets/study_1.jpg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import BetMeLogo from 'assets/betme_logo_04.png';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    textAlign: 'center',
  },
  sliderImage: {
    filter: 'blur(2px)',
    objectFit: 'cover',
    height: '15em',
    opacity: '0.6',
  },
  header1: {
    position: 'absolute',
    top: '1em',
    textAlign: 'center',
    fontSize: '1.6em',
    width: '12em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  header2: {
    position: 'absolute',
    top: '5em',
    fontSize: '1.0em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  header3: {
    position: 'absolute',
    top: '3em',
    fontSize: '2.0em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sliderButton: {
    position: 'absolute',
    top: '11em',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}))

const TopSlider = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div>
        <img src={study_image} width='100%' className={classes.sliderImage}/>
      </div>
      <div className={classes.header1}>
        資格勉強のモチベーター        
      </div>
      <div className={classes.header2}>
        ベットミー
      </div>
      <div className={classes.header3}>
        <img
          src={BetMeLogo}
          height='40'
        />
      </div>
      <div className={classes.sliderButton} >
        <Button
          color='primary'
          variant="contained"
          onClick={() => history.push(`${paths.signin}`)}
        >
          My Page 登録
        </Button>
      </div>
    </div>

  )
}

export default TopSlider;
