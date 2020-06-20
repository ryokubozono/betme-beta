import React, { useState } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import BookForm from 'components/admin/book/BookNew/BookForm';
import { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import Spacer from 'components/commons/atoms/Spacer';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import paths from 'paths';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const BookNew = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const history = useHistory();
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'newBook':
        setTitle(event.target.value)
        break;
      case 'isDisable':
        setIsDisable(!isDisable)
        break;
      default:
        console.log('no key match')
    }
    console.log('click book change')
  }

  const handleSubmit = () => {
    console.log('click book submit')
    let docId = db.collection('book').doc().id;
    db.collection('book').doc(docId).set({
      title: title,
      isDisable: isDisable,
      uid: docId,
      docId: docId,
    })
    .then(() => {
      history.push({
        pathname: `/admin/book/edit/${docId}`,
        state: {
          text: '新しい教材を登録しました',
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
          <p>公開する教材を作成</p>
          <BookForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            title={title}
            isDisable={isDisable}
          />
          <Spacer/>
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.bookindex}`)}
            >
              教材一覧に戻る
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default BookNew;
