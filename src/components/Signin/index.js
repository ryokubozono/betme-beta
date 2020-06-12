import React, { useEffect, useContext } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import { Box } from '@material-ui/core';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import Spacer from 'components/commons/atoms/Spacer';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from "FirebaseConfig";
import { AuthContext } from "hooks/Auth";

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const Signin = (props) => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      history.push(`${paths.root}`)
    }
  })

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default Signin;