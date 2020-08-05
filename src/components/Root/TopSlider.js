import React from "react";
import study_image from 'assets/study_1.jpg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, List, ListItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import BetMeLogo from 'assets/betme_logo_04.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    textAlign: 'center',
  },
  filter: {
    backgroundColor: '#E60114',
  },
  sliderImage: {
    objectFit: 'cover',
    height: '15em',
    opacity: '0.37',
    display: 'block',
  },
  header1: {
    position: 'absolute',
    top: '1em',
    textAlign: 'center',
    fontSize: '1.0em',
    width: '12em',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
    fontWeight: 'bold',
  },
  header2: {
    position: 'absolute',
    top: '7em',
    fontSize: '1.0em',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
  },
  header3: {
    position: 'absolute',
    top: '2em',
    fontSize: '2.0em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sliderButton: {
    position: 'absolute',
    top: '10em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  white: {
    filter: 'brightness(1) invert(0)',
  },
  listButton: {
    border: '1px solid #fff',
    color: '#fff',
  },

}))

const TopSlider = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
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
            className={classes.white}
          />

      </div>
      <div className={classes.sliderButton} >
        <List>
          <ListItem
            className={classes.listButton}
            button 
            onClick={() => history.push(`${paths.signin}`)}
          >
          無料登録する
          &nbsp;&nbsp;
          <TrendingFlatIcon 
            fontSize='small'
          />
          </ListItem>
        </List>
      </div>
    </div>

  )
}

export default TopSlider;
