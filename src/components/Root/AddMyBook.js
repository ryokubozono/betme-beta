import React, {useContext, useEffect, useState} from "react";
import { BooksContext } from 'hooks/Books';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

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
  const classes = useStyles();
  const [book, setBook] = useState('');

  useEffect(() => {
    if (books) {
      setBooksList(books)
    }
  }, [books]);


  return (
    <>
      <p>My教材登録</p>
      <AutoComplete
        name='book'
        id="book"
        options={booksList}
        getOptionLabel={(option) => option.title}
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
        >
          My教材登録
        </Button>
      </div>

    </>
  )
}

export default AddMyBook;
