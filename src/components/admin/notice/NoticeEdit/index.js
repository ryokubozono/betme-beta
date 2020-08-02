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
import { NoticesContext, NoticesProvider } from 'hooks/Notices';
import NoticeForm from 'components/admin/notice/NoticeNew/NoticeForm';
import { NoticeFindFilter } from 'components/commons/filters/NoticeFindFilter';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))


const NoticeEdit = (props) => {

  const classes = useStyles();
  const [notice, setNotice] = useState('');
  const { notices } = useContext(NoticesContext);
  const location = useLocation();
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [body, setBody] = useState('');
  const [beforeOpen, setBeforeOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname) {
      let noticeRef = NoticeFindFilter(notices, location.pathname.substr(-20));
      if (noticeRef) {
        setNotice(noticeRef)
        setUserId(noticeRef.userId)
        setType(noticeRef.type)
        setBody(noticeRef.body)
        setBeforeOpen(noticeRef.beforeOpen)
        setCreatedAt(noticeRef.createdAt)
      }
    }
  }, [location.pathname, notices])

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
    db.collection('notice').doc(notice.docId).set({
      userId: userId,
      type: type,
      body: body,
      beforeOpen: true,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    }, {merge: true})
    .then(() => {
      setLoading(false)
      history.push({
        pathname: `/admin/notice/edit/${notice.docId}`,
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

export default NoticeEdit;
