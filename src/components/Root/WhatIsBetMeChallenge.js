import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import BetMeLogo from 'assets/betme_logo_05.png';
import PasswordReset from "components/PasswordReset";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Icon, List, ListItem } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Spacer from "components/commons/atoms/Spacer";
import paths from "paths";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthContext } from "hooks/Auth";
import Paypal from "components/Paypal";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    verticalAlign: 'middle',
  },
  subTitle: {
    verticalAlign: 'middle',
  },
  label: {
    backgroundColor: '#E60114',
    color: '#fff',
    // maxWidth: '150px',
    display: 'inline-block',
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
    textAlign: 'center',
    fontSize: '0.8em'
  },
  img: {
    verticalAlign: 'middle',
  },
  box: {
    padding: theme.spacing(1.5),
    backgroundColor: '#fff',
    maxWidth: '400px',
    margin: 'auto',
  }, 
  listButton: {
    border: '1px solid #000',
    maxWidth: '250px',
    margin: 'auto',
  },
  listLink: {
    maxWidth: '250px',
    margin: 'auto',
  },
  note: {
    textAlign: 'right',
    fontSize: '0.5em',
  },
}));

const WhatIsBetMeChallenge = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <br />
      <>
        <img src={BetMeLogo} height='30' className={classes.img} />
      </>
      <b
        className={classes.title}
      >
        BetMeチャレンジとは？
      </b>
      <div
        className={classes.label}
      >
        有料オプション
      </div>

      <p>
        資格試験における、もう1ランク上のモチベーション管理サービスです。
      </p>

      <div
        className={classes.box}
      >
        <Icon
          className={classes.img}
        >
          <MenuBookIcon />
        </Icon>
        &nbsp;&nbsp;
        <b
          className={classes.subTitle}
        >
          過去合格者の体験記を閲覧し放題！
        </b>
        <p>
          チャレンジ料金 * をお支払いただくことで、過去の合格者による体験記を閲覧できるようになります。
        </p>
        {props.cert && props.examTarget && props.examTarget.betAmount &&
          <>
            <p>
              {props.cert.name}({props.examTarget.examName}) のチャレンジ料金は、{props.examTarget.betAmount}円です。
            </p>
          </>
        }
        <p
          className={classes.note}
        >
          * チャレンジ料金は試験により異なります。
        </p>
       
        {currentUser &&
          <Paypal 
            exam={props.examTarget}
            setLoading={props.setLoading}
            handleClose={props.handleClose}
            setWhatIsBetMeChallenge={props.setWhatIsBetMeChallenge}
          />
        }
      </div>
      <Spacer />
      <div
        className={classes.box}
      >
        <Icon
          className={classes.img}
        >
          <MonetizationOnIcon />
        </Icon>
        &nbsp;&nbsp;
        <b
          className={classes.subTitle}
        >
          合格後、体験記を書くと、チャレンジ料金を上回る報酬 ** をお支払！
        </b>
        <p>
          無事、合格された方は、所定のフォームにしたがって合格体験記をご提出ただたくと、チャレンジ料金を上回る報酬 ** をお支払いします！
        </p>
        {props.cert &&　props.examTarget && props.examTarget.returnAmount &&
          <p>
            {props.cert.name}({props.examTarget.examName})の報酬額は、{props.examTarget.returnAmount}円です。
          </p>

        }
        <p
          className={classes.note}
        >
          ** 報酬は試験により異なります。
        </p>

      </div>
      <Spacer />
      


      <ListItem
        button
        className={classes.listLink}
        // onClick={() => history.go(0)}
        onClick={props.handleBack}
      >
        <ArrowBackIcon
          fontSize='small'
        />
        &nbsp;&nbsp;
        ホームに戻る
      </ListItem>
    </div>
  )
}

export default WhatIsBetMeChallenge;
