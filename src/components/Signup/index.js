import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import SignupForm from 'components/Signup/SignupForm';
import { Box, Link, Button } from '@material-ui/core';
import Spacer from 'components/commons/atoms/Spacer';
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const Signup = (props) => {
  const history = useHistory();

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <h1>SIGN UP</h1>
          <SignupForm />
          <Spacer />
          <Link 
            onClick={() => history.push(`${paths.passwordreset}`)} 
          >
            Reset Password
          </Link>
          <Spacer />
          <Button
            color='primary'
            variant="outlined"
            onClick={() => history.push(`${paths.signin}`)} 
          >
            Sign In
          </Button>
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default Signup;