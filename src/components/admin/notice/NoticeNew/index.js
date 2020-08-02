import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import firebase, { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import paths from 'paths';
import Spacer from 'components/commons/atoms/Spacer';
import { GetDefaultDate } from 'components/commons/atoms/GetDefaultDate';
import { GetTimestamp } from 'components/commons/atoms/GetTimestamp';
import { NoticesContext } from 'hooks/Notices';
import NoticeForm from './NoticeForm';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))


const NoticeNew = (props) => {

  const classes = useStyles();
  const [notice, setNotice] = useState('');
  const location = useLocation();
  const history = useHistory();

  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [body, setBody] = useState('');
  const [beforeOpen, setBeforeOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'userId':
        setUserId(event.target.value)
        break;
      case 'type':
        setType(event.target.value)
        break;
      case 'body':
        setBody(event.target.value)
        break;
      case 'createdAt':
        setCreatedAt(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  const handleSubmit = () => {
    console.log('click handle submit')
    setLoading(true)

    let docId = db.collection('notice').doc().id
    db.collection('notice').doc(docId).set({
      docId: docId,
      uid: docId,
      userId: userId,
      type: type,
      body: body,
      beforeOpen: true,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      setLoading(false)
      history.push({
        pathname: `/admin/notice/edit/${docId}`,
        state: {
          text: '通知を更新しました',
          type: 'success'
        }
      })
    })
    .catch((error) => {
      setLoading(false)
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
          <NoticeForm
            loading={loading}
            setLoading={setLoading}
            userId={userId}
            type={type}
            body={body}
            beforeOpen={beforeOpen}
            createdAt={createdAt}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.noticeindex}`)}
            >
              通知一覧に戻る
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default NoticeNew;
