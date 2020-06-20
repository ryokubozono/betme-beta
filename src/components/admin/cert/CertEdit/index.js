import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import Spacer from 'components/commons/atoms/Spacer';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import paths from 'paths';
import CertForm from 'components/admin/cert/CertNew/CertForm';
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import { useLocation } from 'react-router-dom';
import { CertsContext } from "hooks/Certs";

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const CertEdit = (props) => {

  const classes = useStyles();
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [cert, setCert] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [categoryRef, setCategoryRef] = useState([])
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { certs } = useContext(CertsContext); 

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break;
      case 'note':
        setNote(event.target.value)
        break;
      case 'isDisable':
        setIsDisable(!isDisable)
        break;
      default:
        console.log('no key match')
    }
    console.log('click book change')
  }

  useEffect(() => {
    if (location.pathname) {
      let certRef = CertFindFilter(certs, location.pathname.substr(-20));
      if (certRef) {
        setCert(certRef)
        setName(certRef.name)
        setNote(certRef.note)
        setIsDisable(certRef.isDisable)
        setCategory(certRef.category)
      }
    }
  }, [certs, location.pathname])

  useEffect(() => {
    if (categoryRef) {
      let catRef = [];
      categoryRef.forEach(cat => {
        catRef.push(
          cat.title,
        )
      })
      setCategory(catRef)
    }
  }, [categoryRef])

  const handleSubmit = () => {
    console.log('click book submit')
    db.collection('cert').doc(cert.docId).set({
      name: name,
      note: note,
      category: category,
      isDisable: isDisable,
    }, {merge: true})
    .then(() => {
      history.push({
        pathname: `/admin/cert/edit/${cert.docId}`,
        state: {
          text: '新しい資格を登録しました',
          type: 'success'
        }
      })
    })
    .catch((error) => {
      history.push({
        state: {
          text: error.message,
          type: 'error'        
        }
      });
    })
  }


  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>資格を説明</p>
          <CertForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            name={name}
            note={note}
            isDisable={isDisable}
            setCategoryRef={setCategoryRef}
          />
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

export default CertEdit;
