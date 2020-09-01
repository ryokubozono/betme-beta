import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import EmailResetForm from 'components/EmailReset/EmailResetForm';
import { Box, Link } from '@material-ui/core';
import Spacer from 'components/commons/atoms/Spacer';
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const EmailReset = (props) => {
  const history = useHistory();

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <h1>メールアドレス変更</h1>
          <EmailResetForm />
          <Spacer />
          <Link 
            onClick={() => history.push(`${paths.myaccount}`)} 
          >
            アカウント設定
          </Link>
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default EmailReset;