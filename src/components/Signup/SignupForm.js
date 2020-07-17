import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const SignupForm = (props) => {

  const history = useHistory();

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== props.password) {
        return false;
      }
      return true;
    });
  }, [props.password])

  return (
    <>
    {props.loading && 
      <Dialog
        open={props.loading}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CircularProgress />
      </Dialog>
    }
      <ValidatorForm
          useRef="form"
          onSubmit={props.handleNext}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label='Email'
            id="component-simple"
            name='email'
            color='primary'
            fullWidth
            margin="normal"
            value={props.email} 
            onChange={props.handleChange} 
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
            value={props.password} 
            onChange={props.handleChange} 
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
            value={props.passwordConfirm} 
            onChange={props.handleChange} 
            validators={['required', 'isPasswordMatch']}
            errorMessages={['this field is required', 'password mismatch']}
          />
          <Spacer />

          <div>
            <Button 
              disabled 
              onClick={props.handleBack} 
              color='primary'
              variant="outlined"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </ValidatorForm>

    </>
  )
}

export default SignupForm;