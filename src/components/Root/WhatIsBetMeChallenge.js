import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import BetMeLogo from 'assets/betme_logo_05.png';
import PasswordReset from "components/PasswordReset";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Icon, List, ListItem, FormControl, FormGroup, FormControlLabel, Checkbox, Box, FormLabel, Typography } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Spacer from "components/commons/atoms/Spacer";
import paths from "paths";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthContext } from "hooks/Auth";
import Paypal from "components/Paypal";
import TermsOfChallegeContent from "components/Statics/TermsOfChallegeContent";
import AnchorLink from 'react-anchor-link-smooth-scroll';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.2em',
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
    fontSize: '0.8em',
  },
  img: {
    verticalAlign: 'middle',
  },
  box: {
    padding: theme.spacing(1.5),
    backgroundColor: '#fff',
    maxWidth: '500px',
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
    textAlign: 'left',
    fontSize: '0.5em',
  },
  scrollWindow: {
    height: '200px',
    overflowY: 'scroll',
    border: 'solid 1px #ddd',
  },
  text: {
    fontSize: '0.95em',
  },
  redText: {
    color: '#f00',
    fontSize: '1.2em',
  },
  blackText: {
    fontSize: '1.2em',
  },
  webButton: {
    textTransform: 'none',
  },
  underLineFalse: {
    textDecoration: 'none',
  },
}));

const WhatIsBetMeChallenge = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);
  const [frag, setFrag] = useState(false);
  const [agreeWithNote, setAgreeWithNote] = useState(false);

  useEffect(() => {
    if (agreeWithTerms && agreeWithNote) {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [agreeWithTerms, agreeWithNote])

  return (
    <div>
      <br />
      <Typography
        component='h2'
      >
        <>
          <img src={BetMeLogo} height='30' className={classes.img} />
        </>
        <b
          className={classes.title}
        >
          BetMeチャレンジとは？
        </b>
      </Typography>
      <div
        className={classes.label}
      >
        有料オプション
      </div>

      <p>
        資格試験における、もう1ランク上のモチベーション管理サービスです。
      </p>

      <section
        className={classes.box}
        id='what-1'
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
        <p
          className={classes.text}
        >
          チャレンジ料金 * をお支払いただくことで、過去の合格者による体験記を閲覧できるようになります。
        </p>
        {props.cert && props.examTarget && props.examTarget.betAmount &&
          <>
            <p>
              チャレンジ料金:&nbsp;
              <b
                className={classes.redText}
              >
                {props.examTarget.betAmount.toLocaleString()}円
              </b>
            </p>
          </>
        }
        <p
          className={classes.note}
        >
          * チャレンジ料金は試験により異なります。
        </p>
      </section>
      <Spacer />
      <section
        className={classes.box}
        id='what-2'
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
          合格後、合格の証明 ** を提出し、体験記を書くと、チャレンジ料金を上回る報酬 * をお支払！
        </b>
        <p
          className={classes.text}
        >
          無事、合格された方は、合格証明書 * を提出し、所定のフォームにしたがって合格体験記をご提出ただたくと、チャレンジ料金を上回る報酬 ** をお支払いします！
        </p>
        {props.cert &&　props.examTarget && props.examTarget.returnAmount &&
          <p>
            報酬額:&nbsp;
            <b
                className={classes.blackText}
            >
              {props.examTarget.returnAmount.toLocaleString()}円
            </b>
          </p>

        }
        <p
          className={classes.note}
        >
          * 合格証明書、またはそれに類する物を試験ごとに指定します。
          <br />
          ** 報酬は試験により異なります。
        </p>

      </section>
      <Spacer />

      {props.cert &&　props.examTarget && props.examTarget.returnAmount &&
      <section
        className={classes.box}
        id='what-3'
      >
        <p>
          お申し込みのために下記の留意事項を読み、チェックを入れてください。
        </p>
        <FormControl
          required 
          component="fieldset" 
          className={classes.formControl}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='agreeWithTerms'
                  checked={agreeWithTerms}
                  onChange={() => setAgreeWithTerms(!agreeWithTerms)}
                />
              }
              label={
                <Typography
                  variant="body2"
                >
                  BetMeチャレンジ利用規約に同意する
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>
        
        <div
          className={classes.scrollWindow}
        >
          <Box bgcolor='white' p={2} m={0}>
            <TermsOfChallegeContent />
          </Box>
        </div>
        <br />

        <FormControl
          required 
          component="fieldset" 
          className={classes.formControl}
        >
          <>
            尚、今回は初回取り組みのため合格体験記の用意が非常に少なくなっております。
            <br />
            ご了承いただけますでしょうか。
          </>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='agreeWithNote'
                  checked={agreeWithNote}
                  onChange={() => setAgreeWithNote(!agreeWithNote)}
                />
              }
              label={
                <Typography
                  variant="body2"
                >
                  同意する
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>

        {currentUser && frag &&
          <Paypal 
            exam={props.examTarget}
            setLoading={props.setLoading}
            handleClose={props.handleClose}
            setWhatIsBetMeChallenge={props.setWhatIsBetMeChallenge}
          />
        }
        
      </section>
      }
      <AnchorLink href='#root' offset="50" className={classes.underLineFalse}>
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
          戻る
        </ListItem>
      </AnchorLink>

    </div>
  )
}

export default WhatIsBetMeChallenge;
