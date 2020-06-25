import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import Spacer from 'components/commons/atoms/Spacer';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { CertsContext } from "hooks/Certs";
import { useLocation } from 'react-router-dom';
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import EditTextForm from './EditTextForm';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const CertEditText = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [cert, setCert] = useState('')
  const { certs } = useContext(CertsContext); 
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      let certRef = CertFindFilter(certs, location.pathname.substr(-20));
      if (certRef) {
        setCert(certRef)
      }
    }
  }, [certs, location])

  return (
    <>
      <AppLayout>
        <AdminGate>
          <EditTextForm 
            cert={cert}
          />
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`/admin/cert/edit/${cert.docId}`)}
            >
              概要の編集
            </Button>
          </div>
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.certindex}`)}
            >
              資格一覧に戻る
            </Button>
          </div>
        </AdminGate>    
      </AppLayout>
    </>
  )
}

export default CertEditText;
