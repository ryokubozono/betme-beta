import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const CertEdit = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>cert edit</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default CertEdit;
