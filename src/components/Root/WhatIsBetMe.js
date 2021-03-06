import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemIcon, ListItem, ListItemText, Typography, ListItemAvatar, Container } from "@material-ui/core";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Timer from '@material-ui/icons/Timer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Button, Modal } from "@material-ui/core";
import HighlightOff from '@material-ui/icons/HighlightOff';
import Book from 'assets/book.jpg';
import BetMeLogo5 from 'assets/betme_logo_05.png';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '260px',
    margin: 'auto',
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  body: {
    textAlign: 'left',
  },
  note: {
    fontSize: '0.8em',
    textAlign: 'left',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#f00',
    },
  },
  align: {
    textAlign: 'center',
  },
  redLink: {
    color: '#f00',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#f00',
    }
  },
  bgcolor: {
    backgroundColor: '#fff',
    height: '50px',
    width: '50px',
  },
  outLined: {
    margin: 'auto',
    border: '1px solid #000',
    padding: theme.spacing(0),
    maxWidth: '250px',
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateAlign: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    height: 400,
    overflow: 'scroll',
  },
  closeButton: {
    textAlign: 'right',
  },
  option: {
    color: '#f00',
    fontSize: '0.5em',
  }
}))

const WhatIsBetMe = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const handleAboutBetme = () => {
    props.setWhatIsBetMeChallenge(true)
  }

  return (
    <div 
      className={classes.align}
    >
      <Container maxWidth="sm">
        <Typography
          component='h2'
        >
          <p className={classes.title}>
            BetMe?????????
          </p>
        </Typography>
        <p className={classes.body}>
          ????????????????????????????????????????????????????????????????????????????????????
        </p>
        <p className={classes.note}>
          ?????????????????????MY??????????????????????????????????????????????????????????????????????????????????????????
        </p>
        <p className={classes.note}>
          ?????????MY?????????????????????????????????????????????
          <b 
            className={classes.redLink}
            onClick={handleAboutBetme}
          >
          BetMe???????????????
          </b>
          ??????????????????????????????
        </p>
      </Container>
      <List className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar
                className={classes.bgcolor}
              >
                <img
                  src={Book}
                  height='30'
                  className={classes.white}
                />
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography
                variant='body2'
              >
                ??????????????????????????????
              </Typography>
            }
            secondary={
              <Typography
                className={classes.link}
                variant='body1'
                onClick={() => history.push(`${paths.signin}`)}
              >
                MY????????????
              </Typography>
            } 
          />
        </ListItem>
      </List>
      
      <ArrowDownwardIcon
      />

      <List
        className={classes.outLined}
      >
        <ListItem>
          <Timer />
          &nbsp;&nbsp;
          <ListItemText
            primary={
              <Typography
                variant='body2'
              >
                ??????????????????????????????
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <WhatshotIcon />
          &nbsp;&nbsp;
          <ListItemText
            primary={
              <Typography
                variant='body2'
              >
                ???????????????????????????
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <img
            src={BetMeLogo5}
            height='30'
          />
          &nbsp;&nbsp;
          <ListItemText
            primary={
              <Typography
                variant='body2'
              >
                BetMe???????????????
                <b
                  className={classes.option}
                >
                  *???????????????
                </b>
              </Typography>
            }
          />
        </ListItem>
      </List>

      </div>

    // </>
  )
}

export default WhatIsBetMe;
