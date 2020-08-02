import React, { useState } from "react";
import { Button, CircularProgress, Dialog } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const SigninForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
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
      default:
        console.log('key not found');
    }
  };

  const clickLoginAsUser = () => {
    setLoading(true); 
    auth.signInWithEmailAndPassword(
      email,
      password
    )
    .then(() => {
      history.push({
        pathname: `${paths.root}`,
        state: {
          text: 'ログアウトしました',
          type: 'success'        
        }
      })
      setLoading(false);
    })
    .catch((error)=>{
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
          onSubmit={clickLoginAsUser}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label='Email'
            id="email"
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
          <Spacer />
          <Button 
            type="submit"
            color='primary'
            variant="contained"
          >
            ログイン
          </Button>
        </ValidatorForm>

    </>
  )
}

export default SigninForm;