import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, FormControl, FormGroup, FormControlLabel, Checkbox, makeStyles, Box } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import TermsOfBetmeContent from "components/Statics/TermsOfBetmeContent";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  scrollWindow: {
    height: '200px',
    overflowY: 'scroll',
    border: 'solid 1px #ddd',
  },
}))

const SignupForm = (props) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== props.password) {
        return false;
      }
      return true;
    });
  }, [props.password])

  useEffect(() => {
    ValidatorForm.addValidationRule('minLength', (value) => {
      if (value.length < 6) {
        return false;
      } else {
        return true
      }
    })
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
            required
            label='メールアドレス'
            id="email"
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
            required
            label='パスワード'
            id="password"
            name='password'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            value={props.password} 
            onChange={props.handleChange} 
            validators={['required', 'minLength']}
            errorMessages={['this field is required', 'パスワードは6文字以上です']}
          />
          <TextValidator
            required
            label='パスワード(確認)'
            id="passwordConfirm"
            name='passwordConfirm'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            value={props.passwordConfirm} 
            onChange={props.handleChange} 
            validators={['required', 'isPasswordMatch']}
            errorMessages={['this field is required', 'パスワードが一致しません']}
          />
          <Spacer />
          <FormControl
            required 
            component="fieldset" 
            className={classes.formControl}
          >
            <FormGroup>
            
              <FormControlLabel
                control={
                  <Checkbox
                    name='agreeWithTerms'
                    checked={props.agreeWithTerms}
                    onChange={() => props.setAgreeWithTerms(!props.agreeWithTerms)}
                  />
                }
                label='BetMe利用規約に同意する'
              />
            </FormGroup>
          </FormControl>

          <div
            className={classes.scrollWindow}
          >
            <Box bgcolor='white' p={2} m={0}>
              <TermsOfBetmeContent />
            </Box>
          </div>
          <br />

          <div>
            <Button 
              disabled 
              onClick={props.handleBack} 
              color='primary'
              variant="outlined"
            >
              戻る
            </Button>
            &nbsp;
            &nbsp;
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!props.agreeWithTerms}
            >
              次へ
            </Button>
          </div>
        </ValidatorForm>

    </>
  )
}

export default SignupForm;