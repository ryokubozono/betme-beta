import React, { useContext, useEffect, useState } from "react";
import AppLayout from 'components/commons/layout/AppLayout';
import { PayPalButton } from "react-paypal-button-v2";
import { AuthContext } from "hooks/Auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth, db } from "FirebaseConfig";
import Spacer from 'components/commons/atoms/Spacer';
import { ExamsContext } from 'hooks/Exams';
import { useLocation } from 'react-router-dom';
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { Box, Dialog, CircularProgress } from '@material-ui/core';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import AccountForm from "components/MyAccount/AccountForm";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import { UsersContext } from "hooks/Users";
import BasicForm from "components/MyAccount/BasicForm";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import EmailSendForm2 from "components/MyAccount/EmailSendForm2";

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const useStyles = makeStyles((theme) => ({
  listLink: {
    maxWidth: '250px',
    margin: 'auto',
  },
  textRed: {
    color: '#f00',
  },
}));


const Paypal = (props) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [frag, setFrag] = useState(false);
  const [filledFrag, setFilledFrag] = useState(false);
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const classes = useStyles();
  const [emailVarified, setEmailVarified] = useState(true);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          setEmailVarified(true)
        } else {
          setEmailVarified(false)
        }
      } 
    })
  }, [])

  useEffect(() => {
    if (currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid)
      if (userRef) {
        setUser(userRef)
        setFirstName(userRef.firstName);
        setLastName(userRef.lastName);
        setAddress(userRef.address);
        setTel(userRef.tel);
        if (props.exam && userRef.betmeExam && userRef.betmeExam.indexOf(props.exam.docId) === -1) {
          setFrag(false)
        } else {
          setFrag(true)
        }
      }
    }
  }, [currentUser, props.exam, users]);

  useEffect(() => {
    if (user) {
      if (!user.firstName || !user.lastName || !user.tel ) {
        setFilledFrag(false);
      } else {
        setFilledFrag(true);
      }
    }
  }, [user, currentUser])

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'tel':
        setTel(event.target.value);
        break;
      default:
        console.log('key not found');
    };
  };

  const submitBasic = () => {
    if (user) {
      db.collection('user').doc(user.docId).set({
        firstName: firstName,
        lastName: lastName,
        tel: tel,
      }, {merge: true})
      .then(() => {
        // history.push({
        //   state: {
        //     text: '基本情報を保存しました。',
        //     type: 'success',
        //   }
        // })
      })
      .catch((error) => {
        history.push({
          state: {
            text: error.message,
            type: 'error'        
          }
        });
      })
    }
  }

  useEffect(() => {
    if (props.exam && props.exam.betAmount && props.exam.betAmount !== '0') {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [props.exam, user])

  const handlePaypal = () => {
    console.log('handle paypal')
    props.setLoading(true)
    if (user && props.exam) {
      db.collection('user').doc(user.docId).set({
        betmeExam: firebase.firestore.FieldValue.arrayUnion(props.exam.docId)
      }, {merge: true})
      .then(() => {

        ReactGA.event({
          category: 'betme',
          action: 'submit',
          nonInteraction: false
        })
        // ReactGA.ga('send', {
        //   hitType: 'event',
        //   eventCategory: 'betme',
        //   eventAction: 'submit',
        // })

        props.setLoading(false);
        props.setWhatIsBetMeChallenge(false)
        history.push({
          pathname: `${paths.root}`,
          state: {
            text: '支払いを完了しました',
            type: 'success'
          }
        })
      })
      .catch((error) => {
        props.setLoading(false);
        console.log(error)
        history.push({
          state: {
            text: `${error}`,
            type: 'error',
          }
        })
      })
    }
  }

  useEffect(() => {
    ReactGA.initialize('UA-175878570-1')
    // console.log(ReactGA)
  }, [])

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && 
        <Dialog
          open={loading}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <CircularProgress />
        </Dialog>
      }
        { currentUser && !frag &&
          <>
            <p>
              この試験は準備中です。
            </p>
          </>
        }

        { currentUser && frag && !emailVarified &&
          <>
            <p
              className={classes.textRed}
            >
              お申し込み頂くにはメールアドレスの認証を完了させてください。
            </p>
            <EmailSendForm2 
              setLoading={setLoading}
              exam={props.exam}
            />
          </>
        }

        { currentUser && frag && !filledFrag && emailVarified &&
          <>
            <p
              className={classes.textRed}
            >
              お申し込みのために受験者さま本人の情報を入力してください。<br />
              ※申込み後の変更はできません。
            </p>
            <BasicForm
              firstName={firstName}
              lastName={lastName}
              address={address}
              tel={tel}
              handleChange={handleChange}
              submitBasic={submitBasic}
              formType='myAccount'
            />
          </>
        }

        {currentUser && frag && filledFrag && emailVarified &&
        <>
          <p>下記ボタンからチャレンジ料金をお支払いただけます。</p>
          <PayPalButton
            amount={props.exam.betAmount}
            currency='JPY' // default is 'USD'
            country='JP'
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            buyerCountry='JP'
            onSuccess={handlePaypal}
              // alert("Transaction ompleted by " + details.payer.name.given_name);
              // OPTIONAL: Call your server to save the transaction
              // return fetch("/paypal-transaction-complete", {
              //   method: "post",
              //   body: JSON.stringify({
              //     orderID: data.orderID
              //   })
              // });

            // sandbox => comment out options, production => enable options
            // currency default is USD
            options={{
              clientId: "AQmjU-3JUfO8J9eV2pJ30hotJCJywhbUNgPiP7mnuFs8ErIYGpVADBuL90Kec0VrWCEBfi2EsB8QJARp",
              currency: 'JPY',
              locale: 'ja_JP',
            }}
          />

        </>
        }

    </>
  )
}

export default Paypal;
