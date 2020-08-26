import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import TermsOfChallegeContent from './TermsOfChallegeContent';
import { Box } from "@material-ui/core";

const TermsOfChallege = (props) => {
  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <TermsOfChallegeContent />
        </Box>
      </AppLayout>
    </>
  )
}

export default TermsOfChallege;