import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const BookNew = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>book new</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default BookNew;
