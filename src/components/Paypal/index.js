import React, { useContext, useEffect, useState } from "react";
import AppLayout from 'components/commons/layout/AppLayout';
import { PayPalButton } from "react-paypal-button-v2";
import { AuthContext } from "hooks/Auth";
import { Box } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth, db } from "FirebaseConfig";
import Spacer from 'components/commons/atoms/Spacer';
import { ExamsContext } from 'hooks/Exams';
import { useLocation } from 'react-router-dom';
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { Button, Dialog, CircularProgress } from '@material-ui/core';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import AccountForm from "components/MyAccount/AccountForm";
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import { UsersContext } from "hooks/Users";
import BasicForm from "components/MyAccount/BasicForm";

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const Paypal = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [exam, setExam] = useState('');
  const { exams } = useContext(ExamsContext);
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
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (location.pathname) {
      let examRef = ExamFindFilter(exams, location.pathname.substr(-20));
      if (examRef) {
        setExam(examRef);
      }
    }
  }, [exams, location.pathname])

  useEffect(() => {
    if (currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid)
      if (userRef) {
        setUser(userRef)
        setFirstName(userRef.firstName);
        setLastName(userRef.lastName);
        setAddress(userRef.address);
        setTel(userRef.tel);
        if (exam && userRef.betmeExam && userRef.betmeExam.indexOf(exam.docId) === -1) {
          setFrag(false)
        } else {
          setFrag(true)
        }
      }
    }
  }, [currentUser, exam, users]);

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
        history.push({
          state: {
            text: '基本情報を保存しました。',
            type: 'success',
          }
        })
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
    if (exam && exam.betAmount && exam.betAmount !== '0') {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [exam, user])

  const handlePaypal = () => {
    console.log('handle paypal')
    setLoading(true)
    if (user && exam) {
      db.collection('user').doc(user.docId).set({
        betmeExam: firebase.firestore.FieldValue.arrayUnion(exam.docId)
      }, {merge: true})
      .then(() => {
        setLoading(false);
        history.push({
          pathname: '/',
          state: {
            text: '支払いを完了しました',
            type: 'success'
          }
        })
      })
      .catch((error) => {
        setLoading(false);
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

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <>
      <AppLayout>
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
          <Button
            variant='contained'
            onClick={() => history.push(`${paths.root}`)}
          >
            My Pageに戻る
          </Button>
        }

        { currentUser && frag && !filledFrag &&
          <>
            <p>まずは、アカウント情報を入力してください</p>
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

        {currentUser && frag && filledFrag &&
        <>
          <p>この試験のBET金額は{exam.betAmount}円です。</p>
          <p>下記ボタンからお支払いください。</p>
          <PayPalButton
            amount={exam.betAmount}
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

      </AppLayout>
    </>
  )
}

export default Paypal;
