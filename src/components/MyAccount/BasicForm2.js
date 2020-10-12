import React, { useState, useContext, useEffect } from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

const BasicForm2 = (props) => {

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.submitBasic}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label='姓'
          id='lastName'
          name='lastName'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.lastName} 
          disabled
        />
        <TextValidator
          label='名'
          id='firstName'
          name='firstName'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.firstName}  
          disabled
        />
        <TextValidator
          label='電話番号'
          id='tel'
          name='tel'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.tel} 
          disabled
        />
      </ValidatorForm>
    </>
  )
}

export default BasicForm2;
