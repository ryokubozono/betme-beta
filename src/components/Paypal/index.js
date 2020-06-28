import React, { useContext, useEffect, useState } from "react";
import AppLayout from 'components/commons/layout/AppLayout';
import { PayPalButton } from "react-paypal-button-v2";
import { AuthContext } from "hooks/Auth";
import { Box } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from "FirebaseConfig";
import Spacer from 'components/commons/atoms/Spacer';
import { ExamsContext } from 'hooks/Exams';
import { useLocation } from 'react-router-dom';
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { Button } from '@material-ui/core';
import paths from 'paths';
import { useHistory } from 'react-router-dom';

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

  useEffect(() => {
    if (location.pathname) {
      let examRef = ExamFindFilter(exams, location.pathname.substr(-20));
      if (examRef) {
        setExam(examRef);
      }
    }
  }, [exams, location.pathname])

  return (
    <>
      <AppLayout>
        {!currentUser &&
          <Box bgcolor='white' p={2} m={0}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            <Spacer />
          </Box>
        }
        {currentUser && !exam.betAmount &&
          <Button
            variant='contained'
            onClick={() => history.push(`${paths.root}`)}
          >
            My Pageに戻る
          </Button>
        }
        {currentUser && exam.betAmount &&
        <>
          <p>この試験のBET金額は{exam.betAmount}円です。</p>
          <p>下記ボタンからお支払いください。</p>
          <PayPalButton
            amount={exam.betAmount}
            currency='JPY' // default is 'USD'
            country='JP'
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              // OPTIONAL: Call your server to save the transaction
              return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID
                })
              });
            }}
            // sandbox => comment out options, production => enable options
            // currency default is USD
            options={{
              clientId: "AQmjU-3JUfO8J9eV2pJ30hotJCJywhbUNgPiP7mnuFs8ErIYGpVADBuL90Kec0VrWCEBfi2EsB8QJARp",
              currency: 'JPY',
            }}
          />
        </>
        }

      </AppLayout>
    </>
  )
}

export default Paypal;
