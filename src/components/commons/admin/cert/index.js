import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const CertIndex = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>cert index</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default CertIndex;
