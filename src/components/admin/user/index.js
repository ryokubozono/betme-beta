import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const UserIndex = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>user index</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default UserIndex;
