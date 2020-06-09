import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const handleClose = () => {
    setLoading(false);
  };

  const clickLogupAsUser = () => {
    console.log('sign up as user')
    setLoading(true)
    auth.createUserWithEmailAndPassword(
      email,
      password
    )
    .then(() => {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          db.collection('user').doc(user.uid).set({
            uid: user.uid,
            docId: user.uid,
          })
        }
      })
      history.push({
        pathname: `${paths.root}`,
        state: {
          text: 'サインアップしました',
          type: 'success'        
        }  
      })
    })
    .catch((error) => {
      setLoading(false);
      history.push({
        state: {
          text: error.message,
          type: 'error'        
        }
      });
      history.go(0);
    })
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [password])

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
          onSubmit={clickLogupAsUser}
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
          <TextValidator
            label='Password'
            id="password"
            name='password'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            value={password} 
            onChange={handleChange} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <TextValidator
            label='Password Confirm'
            id="passwordConfirm"
            name='passwordConfirm'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            value={passwordConfirm} 
            onChange={handleChange} 
            validators={['required', 'isPasswordMatch']}
            errorMessages={['this field is required', 'password mismatch']}
          />
          <Spacer />
          <Button 
            type="submit"
            color='primary'
            variant="contained"
          >
            SIGN UP
          </Button>
        </ValidatorForm>

    </>
  )
}

export default SignupForm;