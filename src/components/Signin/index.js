import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import SigninForm from 'components/Signin/SigninForm';
import { Link, Button, Box } from '@material-ui/core';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import Spacer from 'components/commons/atoms/Spacer';

const Signin = (props) => {
  const history = useHistory();

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <h1>SIGN IN</h1>
          <SigninForm />
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
            onClick={() => history.push(`${paths.signup}`)} 
          >
            Sign Up
          </Button>
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default Signin;