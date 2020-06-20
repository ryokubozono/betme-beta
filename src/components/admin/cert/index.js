import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from "components/commons/atoms/Spacer";
import AddIcon from '@material-ui/icons/Add';
import CertCardAdmin from 'components/commons/card/CertCardAdmin';
import { CertsContext } from "hooks/Certs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CertIndex = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { certs } = useContext(CertsContext); 

  return (
    <>
      <AppLayout>
        <AdminGate>
          <Button
            color='primary'
            variant="contained"
            onClick={() => history.push(`${paths.certnew}`)}
            startIcon={<AddIcon />}
          >
            Add Cert
          </Button>
          <Spacer />
          <List className={classes.root}>
            {certs && certs.map(cert => (
              <CertCardAdmin cert={cert} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default CertIndex;
