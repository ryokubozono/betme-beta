import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import { Box } from "@material-ui/core";

const PrivacyPolicy = (props) => {
  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <PrivacyPolicyContent />
        </Box>
      </AppLayout>
    </>
  )
}

export default PrivacyPolicy;