import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import PasswordResetForm from 'components/PasswordReset/PasswordResetForm';

const PasswordReset = (props) => {
  return (
    <>
      <AppLayout>
        <p>Password Reset</p>
        <PasswordResetForm />
      </AppLayout>
    </>
  )
}

export default PasswordReset;