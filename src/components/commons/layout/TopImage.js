import React from "react";
import study_image from 'assets/study_1.jpg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BetMeLogo from 'assets/betme_logo_02.png';

const useStyles = makeStyles((theme) => ({
  sliderImage: {
    objectFit: 'cover',
    height: '7em',
    display: 'block',
  },
  logoImg: {
    position: 'absolute',
    top: '1em',
    // fontSize: '1.0em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

const TopImage = (props) => {
  const classes = useStyles();

  return (
    <>
      <img src={study_image} width='100%' className={classes.sliderImage}/>
      <img
        src={BetMeLogo} 
        height='70' 
        className={classes.logoImg}
      />
    </>
  )
}

export default TopImage;