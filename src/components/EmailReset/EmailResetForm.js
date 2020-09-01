import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "FirebaseConfig";
import { Button, CircularProgress, Dialog } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import paths from 'paths';

const EmailResetForm = (props) => {

  let domain = document.domain;
  const actionCodeSettings = (domain === 'localhost')? 
  {
    url: `http://localhost:3000/myaccount`
  }:{
    url: `https://${domain}/myaccount`
  }
  // currentUser is provided
  const [email, setEmail] = useState("");

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // styledでcssかいたらhandleChangeのたびに再レンダーされるのでinputには向いてない。解決方法あるか。
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const clickSendResetEmail = () => {
    auth.onAuthStateChanged(user => {
      user.updateEmail(email)
      .then(() => {
        history.push({
          pathname: `${paths.myaccount}`,
          state: {
            text: 'メールアドレスを更新しました',
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
    })
  }

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && 
        <Dialog
          open={loading}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <CircularProgress />
        </Dialog>
      }
        <ValidatorForm
          useRef="form"
          onSubmit={clickSendResetEmail}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label='メールアドレス'
            id="component-simple"
            name='email'
            color='primary'
            fullWidth
            margin="normal"
            value={email} 
            onChange={handleChange} 
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          <Spacer />
          <Button 
            type="submit"
            color='primary'
            variant="contained"
          >
            送信
          </Button>
        </ValidatorForm>
    </>
  )
}

export default EmailResetForm;