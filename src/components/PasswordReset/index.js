import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import PasswordResetForm from 'components/PasswordReset/PasswordResetForm';
import { Box, Link } from '@material-ui/core';
import Spacer from 'components/commons/atoms/Spacer';
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const PasswordReset = (props) => {
  const history = useHistory();

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <h1>Password Reset</h1>
          <PasswordResetForm />
          <Spacer />
          <Link 
            onClick={() => history.push(`${paths.signin}`)} 
          >
            Sign In
          </Link>
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default PasswordReset;