import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const ExamEdit = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>exam edit</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamEdit;
