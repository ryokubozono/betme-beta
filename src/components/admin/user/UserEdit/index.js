import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';

const UserEdit = (props) => {
  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>user edit</p>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default UserEdit;
