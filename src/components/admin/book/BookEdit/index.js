import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import BookForm from 'components/admin/book/BookNew/BookForm';
import { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import { BookFindFilter } from 'components/commons/filters/BookFindFilter';
import { useLocation } from 'react-router-dom';
import { BooksContext } from "hooks/Books";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Spacer from 'components/commons/atoms/Spacer';
import paths from 'paths';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const BookEdit = (props) => {
  const classes = useStyles();
  const { books } = useContext(BooksContext); 
  const [book, setBook] = useState('');
  const [isDisable, setIsDisable] = useState();
  const location = useLocation();
  const [title, setTitle] = useState('');
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

  useEffect(() => {
    if (location.pathname) {
      let bookRef = BookFindFilter(books, location.pathname.substr(-20))
      if (bookRef) {
        setBook(bookRef)
        setTitle(bookRef.title)
        setIsDisable(bookRef.isDisable)
      }
    }
  }, [books, location.pathname])

  const handleSubmit = () => {
    console.log('click book submit')
    db.collection('book').doc(book.docId).set({
      title: title,
      isDisable: isDisable,
    }, {merge: true})
    .then(() => {
      history.push({
        state: {
          text: '教材を更新しました',
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
          <p>教材を編集</p>
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

export default BookEdit;
