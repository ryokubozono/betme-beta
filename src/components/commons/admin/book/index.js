import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const BookIndex = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>book index</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default BookIndex;
