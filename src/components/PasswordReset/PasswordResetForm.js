import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "FirebaseConfig";
import { Button, CircularProgress, Dialog } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import paths from 'paths';

const PasswordResetForm = (props) => {

  let domain = document.domain;
  let port   = (domain === 'localhost')?  3000:'';
  let prot   = (domain === 'localhost')?  'http':'https';
  const actionCodeSettings = {
    url: `${prot}://${domain}:${port}/signin`
  };
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

  const clickSendResetPasswordMail = () => {
    setLoading(true)
    console.log('click send reset password mail')
    auth.sendPasswordResetEmail(email, actionCodeSettings).then(function() {
      // Email sent.
      setLoading(false)
      history.push({
        pathname: `${paths.signin}`,
        state: {
          text: `${email}宛にパスワード変更メールを送信しました`,
          type: 'success'
        }
      })
    }).catch(function(error) {
      // An error happened.
      setLoading(false)
      history.go(0)
      history.push({
        state: {
          text: `${email}宛にパスワード変更メールを送信できませんでした[${error}]`,
          type: 'error'
        }
      })
    });
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
          onSubmit={clickSendResetPasswordMail}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label='Email'
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

export default PasswordResetForm;