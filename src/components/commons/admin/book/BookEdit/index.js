import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const BookEdit = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>book edit</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default BookEdit;
