import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const CertNew = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>cert new</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default CertNew;
