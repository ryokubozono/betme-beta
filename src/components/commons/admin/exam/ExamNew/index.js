import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const ExamNew = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>exam new</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamNew;
