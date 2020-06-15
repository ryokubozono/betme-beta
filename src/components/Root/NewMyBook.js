import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const NewMyBook = (props) => {
  const classes = useStyles();
  const [newBook, setNewBook] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'newBook':
        setNewBook(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  return (
    <>
      <p>新規登録</p>

      <TextField
        id="newBook" 
        name='newBook'
        label="新しい教材" 
        style={{ width: 200 }}
        onChange={handleChange} 
        value={newBook}
        className={classes.textFeild}
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

export default NewMyBook;
