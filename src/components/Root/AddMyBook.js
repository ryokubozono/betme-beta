import React, {useContext, useEffect, useState} from "react";
import { BooksContext } from 'hooks/Books';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { AuthContext } from "hooks/Auth";
import { useHistory } from 'react-router-dom';
import firebase, { db } from "FirebaseConfig";
import { UserContext } from 'hooks/User';
import {MyBookListFilter} from 'components/commons/filters/MyBookListFilter';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  autoComplete: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const AddMyBook = (props) => {
  const { books } = useContext(BooksContext);
  const [booksList, setBooksList] = useState([]);
  const [myBooksList, setMyBooksList] = useState([]);
  const classes = useStyles();
  const [book, setBook] = useState('');
  const [removeBook, setRemoveBook] = useState('');
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (books) {
      let booksRef = books;
      booksRef = booksRef.filter(row => {
        if (row.userId) {
          return false;
        } else {
          if (user.myBook && user.myBook.length) {
            if ((user.myBook).indexOf(row.docId) === -1) {
              return row;
            }
          } else {
            return row;
          }
        }
      })
      booksRef = booksRef.filter(row => {
        if (row.isDisable) {
          return false;
        } else {
          return row;
        }
      })
      setBooksList(booksRef)
    }
  }, [books, currentUser, user]);


  useEffect(() => {
    if (books) {
      let booksRef = MyBookListFilter(books, currentUser.uid, user.myBook);
      setMyBooksList(booksRef)
    }
  }, [books, currentUser, user]);

  const clickAddMyBook = () => {
    if (!book) {
      history.push({
        search: location.search,
        state: {
          text: '追加する教材を選択して下さい',
          type: 'error',
        }
      })
    } else {
      db.collection('user').doc(currentUser.uid).set({
        uid: currentUser.uid,
        docId: currentUser.uid,
        myBook: firebase.firestore.FieldValue.arrayUnion(book.docId)
      }, {merge: true})
      .then(() => {
        props.handleClose()
        history.push({
          search: location.search,
          state: {
            text: 'My教材に追加しました',
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

  const clickRemoveMyBook = () => {
    if (!removeBook) {
      history.push({
        search: location.search,
        state: {
          text: '削除する教材を選択して下さい',
          type: 'error',
        }
      })
    } else {
      console.log(removeBook)
      db.collection('user').doc(currentUser.uid).update({
        myBook: firebase.firestore.FieldValue.arrayRemove(removeBook.docId)
      })
      .then(() => {
        props.handleClose()
        history.push({
          search: location.search,
          state: {
            text: 'My教材から削除しました',
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
      <p>My教材登録</p>
      <AutoComplete
        name='book'
        id="book"
        options={booksList}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.group}
        className={classes.autoComplete}
        style={{ width: 200 }}
        onChange={(event, newValue) => {
          setBook(newValue);
        }}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label="リストから教材を選択" 
          />
        }
      />
      <div className={classes.buttonAlign}>
        <Button
          color='secondary'
          variant="contained"
          onClick={clickAddMyBook}
        >
          My教材登録
        </Button>
      </div>

      <p>My教材削除</p>
      <AutoComplete
        name='removeBook'
        id="removeBook"
        options={myBooksList.sort((a, b) => -b.group.localeCompare(a.group))}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.group}
        className={classes.autoComplete}
        style={{ width: 220 }}
        onChange={(event, newValue) => {
          setRemoveBook(newValue);
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
          color='secondary'
          variant="outlined"
          onClick={clickRemoveMyBook}
        >
          My教材削除
        </Button>
      </div>

    </>
  )
}

export default AddMyBook;
