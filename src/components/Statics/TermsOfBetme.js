import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import TermsOfBetmeContent from './TermsOfBetmeContent';
import { Box } from "@material-ui/core";

const TermsOfBetme = (props) => {
  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <TermsOfBetmeContent />
        </Box>
      </AppLayout>
    </>
  )
}

export default TermsOfBetme;