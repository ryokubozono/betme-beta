import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {GetDefaultDate} from 'components/commons/atoms/GetDefaultDate';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { Button, Modal } from "@material-ui/core";
import HighlightOff from '@material-ui/icons/HighlightOff';
import AddMyBook from "components/Root/AddMyBook";
import NewMyBook from "components/Root/NewMyBook";
import Spacer from "components/commons/atoms/Spacer";
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

const ExamTimerTab = (props) => {
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
    studyTimeRef = hour * 60 + min;
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
      {/* <h4>{props.examTarget && props.examTarget.examName}</h4> */}

      <FormControl 
        className={classes.container} 
        noValidate
      >
        <TextField
          id="studyDate"
          name='studyDate'
          label="学習日"
          type="date"
          className={classes.textField}
          value={studyDate}
          // defaultValue={today}
          onChange={handleChange} 
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <AutoComplete
        name='book'
        id="book"
        options={booksList.sort((a, b) => -b.group.localeCompare(a.group))}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.group}
        className={classes.autoComplete}
        style={{ width: 220 }}
        onChange={(event, newValue) => {
          setBook(newValue);
        }}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label="教材" 
          />
        }
      />
      <div className={classes.buttonAlign}>
        <Button
          onClick={handleOpenAdd}    
          color='primary'
          variant="outlined"
          size='small'
        >
          リストを編集
        </Button>
        &nbsp;
        <Button
          onClick={handleOpenNew}
          color='primary'
          variant="outlined"
          size='small'
        >
          新規登録
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAdd}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.closeButton} >
            <HighlightOff 
              onClick={handleClose}
            />
          </div>
          <AddMyBook 
            handleClose={handleClose}          
          />
        </div>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openNew}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.closeButton} >
            <HighlightOff 
              onClick={handleClose}
            />
          </div>
          <NewMyBook 
            handleClose={handleClose}
          />
        </div>
      </Modal>
      <p className={classes.inputLabel}>
        学習時間
      </p>
      <FormControl 
        className={classes.formControl}
      >
        <InputLabel id="hour">時間</InputLabel>
        <Select
          labelId="hour"
          id="hour"
          name='hour'
          value={hour}
          onChange={handleChange}
        >
          {hours.map(hour => (
            <MenuItem value={hour.value}>{hour.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl 
        className={classes.formControl}
      >
        <InputLabel id="min">分</InputLabel>
        <Select
          labelId="min"
          id="min"
          name='min'
          value={min}
          onChange={handleChange}
        >
          {mins.map(min => (
            <MenuItem value={min.value}>{min.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl 
        className={classes.formControl}
      >
        <TextField
          id='studyPage' 
          name='studyPage'
          label="学習量" 
          type='number'
          style={{ width: 60 }}
          onChange={handleChange} 
          value={studyPage}
          className={classes.textFeild}
          helperText='ページ'
        />
      </FormControl>
      <br />
      <FormControl 
        className={classes.formControl}
      >
        <TextField
          id='studyNote' 
          name='studyNote'
          label="学習内容"
          multiline
          rows={3}
          style={{ width: 200 }}
          onChange={handleChange} 
          value={studyNote}
          className={classes.textFeild}
        />
      </FormControl>
      <Spacer />
      <div className={classes.buttonAlign}>
        <Button
          color='primary'
          variant="contained"
          onClick={clickAddEvent}
        >
          学習を記録
        </Button>
      </div>

    </>
  )
}

export default ExamTimerTab;
