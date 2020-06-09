import React from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import SignupForm from 'components/Signup/SignupForm';

const Signup = (props) => {
  return (
    <>
      <AppLayout>
        <p>sign up</p>
        <SignupForm />
      </AppLayout>
    </>
  )
}

export default Signup;