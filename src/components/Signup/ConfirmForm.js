import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { jobs } from 'components/commons/consts/jobs';
import { schools } from 'components/commons/consts/schools';
import { bizs } from 'components/commons/consts/bizs'; 
import { genders } from 'components/commons/consts/genders';
import { prefs } from 'components/commons/consts/prefs';
import { educs } from 'components/commons/consts/educs'; 

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const ConfirmForm = (props) => {

  const classes = useStyles();

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.clickLogupAsUser}
        onError={errors => console.log(errors)}
      >
          <TextValidator
            label='Email'
            id="email"
            name='email'
            color='primary'
            fullWidth
            margin="normal"
            defaultValue={props.email} 
            InputProps={{
              readOnly: true,
            }}
          />
          <TextValidator
            label='Password'
            id="password"
            name='password'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            defaultValue={props.password} 
            InputProps={{
              readOnly: true,
            }}
          />
          <TextValidator
            label='nickName'
            id='nickName'
            name='nickName'
            type="text"
            color='primary'
            fullWidth
            margin="normal"
            defaultValue={props.nickName} 
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl 
            className={classes.formControl} 
            noValidate
          >
            <TextField
              id="birthdayRef"
              name='birthdayRef'
              label="生年月日"
              type="date"
              className={classes.textField}
              value={props.birthdayRef}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          <br />
          <TextField
            label='職業'
            name='job'
            id='job'
            className={classes.textField}
            value={props.job}
            InputProps={{
              readOnly: true,
            }}
          />
          {props.job === '学生' &&
            <TextField
              label='種類'
              name='school'
              id='school'
              className={classes.textField}
              value={props.school}
              InputProps={{
                readOnly: true,
              }}
            />
          }
          {props.job === '社会人' &&
            <TextField
              label='業界'
              name='biz'
              id='biz'
              className={classes.textField}
              value={props.biz}
              InputProps={{
                readOnly: true,
              }}
            />
          }
          <br />
          <TextField
            label='性別'
            name='gender'
            id='gender'
            className={classes.textField}
            value={props.gender}
            InputProps={{
              readOnly: true,
            }}
          />  
          <TextField
            label='都道府県'
            name='pref'
            id='pref'
            className={classes.textField}
            value={props.pref}
            InputProps={{
              readOnly: true,
            }}
          />  
          <br />
          {props.job === '社会人' &&
          <TextField
            label='最終学歴'
            name='educ'
            id='educ'
            className={classes.textField}
            value={props.educ}
            InputProps={{
              readOnly: true,
            }}
          />  
          }
          <TextValidator
            label='出身高校'
            id='highSchool'
            name='highSchool'
            type="text"
            color='primary'
            fullWidth
            margin="normal"
            value={props.highSchool} 
            InputProps={{
              readOnly: true,
            }}
          />
          <TextValidator
            label='出身大学・専門学校'
            id='college'
            name='college'
            type="text"
            color='primary'
            fullWidth
            margin="normal"
            value={props.college} 
            InputProps={{
              readOnly: true,
            }}
          />
          <Spacer />

        <div>
          <Button 
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
            Sign Up
          </Button>
        </div>
      </ValidatorForm>  
    </>
  )
}

export default ConfirmForm;
