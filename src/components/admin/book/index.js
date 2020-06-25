import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { BooksContext } from 'hooks/Books';
import BookCard from 'components/commons/card/BookCard';
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import Spacer from "components/commons/atoms/Spacer";
import AddIcon from '@material-ui/icons/Add';
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

const BookIndex = (props) => {
  const classes = useStyles();
  const { books } = useContext(BooksContext);
  const history = useHistory();
  
  return (
    <>
      <AppLayout>
        <AdminGate>
          <Button
            color='primary'
            variant="contained"
            onClick={() => history.push(`${paths.booknew}`)}
            startIcon={<AddIcon />}
          >
            Add Book
          </Button>
          <Spacer />
          <List className={classes.root}>
            {books && books.map(book => (
              <BookCard book={book} />
            ))}
          </List>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default BookIndex;
