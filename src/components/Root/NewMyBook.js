import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import firebase, { db } from "FirebaseConfig";
import { AuthContext } from "hooks/Auth";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'newBook':
        setNewBook(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  const clickNewMyBook = () => {
    let docId = db.collection('book').doc().id;
    db.collection('user').doc(currentUser.uid).set({
      uid: currentUser.uid,
      docId: currentUser.uid,
      myBook: firebase.firestore.FieldValue.arrayUnion(docId)
    }, {merge: true})
    db.collection('book').doc(docId).set({
      title: newBook,
      uid: docId,
      docId: docId,
      userId: currentUser.uid,
    })
    .then(() => {
      props.handleClose();
      history.push({
        search: location.search,
        state: {
          text: '新しい教材を登録しました',
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

  return (
    <>
      <p>新規登録</p>
      <ValidatorForm
        useRef="form"
        onSubmit={clickNewMyBook}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label='新しい教材'
          id="newBook-simple"
          name='newBook'
          color='primary'
          style={{ width: 200 }}
          margin="normal"
          value={newBook} 
          onChange={handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
          helperText="自分だけの教材を追加します"
        />
        <div className={classes.buttonAlign}>
          <Button 
            type="submit"
            color='secondary'
            variant="contained"
          >
            My教材登録
          </Button>
        </div>
      </ValidatorForm>
    </>
  )
}

export default NewMyBook;
