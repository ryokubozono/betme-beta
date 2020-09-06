import React, {useContext, useEffect, useState } from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlarea: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}))

const ContactForm = (props) => {

  const classes = useStyles();


  return(
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.submitContact}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          className={classes.formControl} 
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
          className={classes.formControl} 
          required
          label='件名'
          id='subject'
          name='subject'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.subject} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          className={classes.formControlarea} 
          required
          label='内容'
          id='content'
          name='content'
          type="textarea"
          color='primary'
          fullWidth
          multiline
          rows={10}
          margin="normal"
          value={props.content} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          送信
        </Button>
      </ValidatorForm>

    </>
  )
}

export default ContactForm;