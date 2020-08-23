import React, { useState, useContext, useEffect } from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

const BasicForm = (props) => {

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.submitBasic}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          required
          label='姓'
          id='lastName'
          name='lastName'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.lastName} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          required
          label='名'
          id='firstName'
          name='firstName'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.firstName} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          required
          label='電話番号'
          id='tel'
          name='tel'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.tel} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          基本情報を保存
        </Button>
      </ValidatorForm>
    </>
  )
}

export default BasicForm;
