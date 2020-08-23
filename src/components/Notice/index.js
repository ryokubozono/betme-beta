import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from 'components/commons/atoms/Spacer';
import { List, Button, Modal, ListItem } from '@material-ui/core';
import NoticeCard from 'components/commons/card/NoticeCard';
import { makeStyles } from '@material-ui/core/styles';
import { MyNoticesContext } from 'hooks/MyNotices';
import { db } from 'FirebaseConfig';
import { NoticesContext } from 'hooks/Notices';
import {NoticeFindFilter} from 'components/commons/filters/NoticeFindFilter';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { AuthContext } from "hooks/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'initial',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    height: 400,
    overflow: 'scroll',
  },
  closeButton: {
    textAlign: 'right',
  },

}));

const NoticeList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { myNotices } = useContext(MyNoticesContext);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const { notices } = useContext(NoticesContext);
  const { currentUser } = useContext(AuthContext);

  const handleSelect = (noticeId) => {
    setOpen(true);
    if (notices) {
      let noticeRef = NoticeFindFilter(notices, noticeId);
      if (noticeRef) {
        setNotice(noticeRef);
      }
    }
    db.collection('notice').doc(noticeId).set({
      beforeOpen: false
    }, {merge: true})
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!currentUser) {
      history.push(`${paths.signin}`)
    }
  })

  return (
    <>
      <AppLayout>
        <Spacer />
          {myNotices && myNotices.length ? (
            <List className={classes.root}>
            {myNotices && myNotices.map(notice => (
              <NoticeCard 
                handleSelect={() => handleSelect(notice.docId)}
                notice={notice} 
                />
            ))}
          </List>
        ):(
          <List>
            <ListItem>
              <p>
                通知はありません
              </p>                       
            </ListItem>
          </List>
        )

        }

        {notice && open &&
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <div
                className={classes.closeButton}              
              >
                <HighlightOff 
                  onClick={handleClose}
                />
              </div>
              {notice.body}
            </div>
          </Modal>
        }

      </AppLayout>      
    </>
  )
}

export default NoticeList;
