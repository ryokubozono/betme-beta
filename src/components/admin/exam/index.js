import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const ExamIndex = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>exam index</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamIndex;
