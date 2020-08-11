import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {GetDefaultDate} from 'components/commons/atoms/GetDefaultDate';
import { BooksContext } from 'hooks/Books';
import { AuthContext } from "hooks/Auth";
import { UserContext } from 'hooks/User';
import { MyBookListFilter } from "components/commons/filters/MyBookListFilter";
import { hours } from 'components/commons/consts/hours';
import { mins } from 'components/commons/consts/mins';
import { useHistory } from 'react-router-dom';
import firebase, { db } from "FirebaseConfig";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import TimerForm from "./TimerForm";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 0,
    marginLeft: 8,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  autoComplete: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  closeButton: {
    textAlign: 'right',
  },
}));

const today = GetDefaultDate(new Date())

const TimerNew = (props) => {
  const classes = useStyles();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [studyDate, setStudyDate] = useState(today);
  const [booksList, setBooksList] = useState([]);
  const [book, setBook] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [studyPage, setStudyPage] = useState(0);
  const [studyNote, setStudyNote] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const { books } = useContext(BooksContext);
  const { currentUser } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [editFrag, setEditFrag] = useState(false);

  const handleResetState = () => {
    setStudyDate(today)
    setBook('')
    setStudyPage(0)
    setStudyNote('')
    setHour(0)
    setMin(0)
  }
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'hour':
        setHour(event.target.value);
        break;
      case 'min':
        setMin(event.target.value);
        break;
      case 'studyDate':
        setStudyDate(event.target.value);
        break;
      case 'studyPage':
        setStudyPage(event.target.value);
        break;
      case 'studyNote':
        setStudyNote(event.target.value);
        break;
      default:
        console.log('no key match')
    }
  };

  useEffect(() => {
    if (books) {
      let booksRef = MyBookListFilter(books, currentUser.uid, user.myBook);
      setBooksList(booksRef)
    }
  }, [books, currentUser, user]);
  
  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenNew(false);
    setOpenAdd(false);
  };

  useEffect(() => {
    let studyTimeRef = 0;
    studyTimeRef = Number(hour) * 60 + Number(min);
    setStudyTime(studyTimeRef)
  }, [hour, min])

  const clickAddEvent = () => {
    if (!studyTime) {
      history.push({
        search: location.search,
        state: {
          text: '学習時間を入力して下さい',
          type: 'error'
        }
      })
    } else {
      let docId = db.collection('event').doc().id;
      let fullYear = studyDate.substr(0, 4);
      let month = studyDate.substr(5, 2);
      let date = studyDate.substr(-2);
      let bookId = '';
      if (book) {
        bookId = book.docId
      }
      let studyDateRef = new Date(fullYear, month - 1, date);
      db.collection('event').doc(docId).set({
        uid: docId,
        docId: docId,
        studyDate: firebase.firestore.Timestamp.fromDate(studyDateRef),
        hour: hour,
        min: min,
        studyTime: studyTime,
        studyNote: studyNote,
        studyPage: studyPage,
        bookId: bookId,
        userId: currentUser.uid,
        examId: queryString.parse(location.search).examId,
      })
      .then(() => {
        handleResetState()
        history.push({
          search: location.search,
          state: {
            text: '学習時間を記録しました',
            type: 'success'
          }
        })
      })
      .catch((error) => {
        history.push({
          search: location.search,
          state: {
            text: error.message,
            type: 'error'        
          }
        });
      })
    }
  }

  return (
    <>
      {editFrag &&
        <p>edit form</p>
      }
      <TimerForm 
        studyDate={studyDate}
        handleChange={handleChange}
        booksList={booksList}
        setBook={setBook}
        handleOpenAdd={handleOpenAdd}
        handleOpenNew={handleOpenNew}
        openAdd={openAdd}
        openNew={openNew}
        handleClose={handleClose}
        hour={hour}
        hours={hours}
        studyPage={studyPage}
        studyNote={studyNote}
        clickAddEvent={clickAddEvent}
        classes={classes}
        min={min}
        mins={mins}
      />

    </>
  )
}

export default TimerNew;
