import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemIcon, ListItem, ListItemText, Typography, ListItemAvatar } from "@material-ui/core";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Timer from '@material-ui/icons/Timer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Button, Modal } from "@material-ui/core";
import AboutBetMe from 'components/Root/AboutBetMe';
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
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
  },
  note: {
    fontSize: '0.8em',
    textAlign: 'center',
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
  const [open, setOpen] = useState(false);

  const handleAboutBetme = () => {
    props.setWhatIsBetMeChallenge(true)
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div 
      className={classes.align}
    >
      <p className={classes.title}>
        BetMeとは？
      </p>
      <p className={classes.body}>
        資格試験におけるあなたのモチベーション管理サービスです。
      </p>
      <p className={classes.note}>
        受けたい試験をMY試験に登録することで、学習時間の記録・保持が可能になります。
      </p>
      <p className={classes.note}>
        また、MY試験に登録した試験については、
        <b 
          className={classes.redLink}
          onClick={handleAboutBetme}
        >
        BetMeチャレンジ
        </b>
        することができます。
      </p>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <div
                className={classes.closeButton}              
              >
                <HighlightOff 
                  onClick={handleClose}
                />
              </div>
              <AboutBetMe />
            </div>
          </Modal>
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
                受験予定の試験を管理
              </Typography>
            }
            secondary={
              <Typography
                className={classes.link}
                variant='body1'
                onClick={() => history.push(`${paths.signin}`)}
              >
                MY試験登録
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
                学習時間の記録・保存
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
                モチベーション管理
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
                BetMeチャレンジ
                <b
                  className={classes.option}
                >
                  *オプション
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
