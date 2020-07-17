import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Spacer from 'components/commons/atoms/Spacer';
import { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { jobs } from 'components/commons/consts/jobs';
import { schools } from 'components/commons/consts/schools';
import { bizs } from 'components/commons/consts/bizs'; 
import { genders } from 'components/commons/consts/genders';
import { prefs } from 'components/commons/consts/prefs';
import { educs } from 'components/commons/consts/educs'; 
import { regPurposes } from 'components/commons/consts/regPurposes';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const ProfileForm = (props) => {
  const classes = useStyles();

  const handleRegPurpose = (option) => {
    console.log(option)
    console.log(props.regPurpose)
    // if (!props.regPurpose.length) {
    let ref = props.regPurpose
    ref.push(option)
    props.setRegPurpose(ref)
      // props.setRegPurpose(props.regPurpose.push(option))
    // } else {
      // if ((props.regPurpose).indexOf(option) === -1) {
      //   props.setRegPurpose(props.regPurpose.push(option))
      // }  
    // }

    console.log(props.regPurpose)
  }

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleNext}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label='nickName'
          id='nickName'
          name='nickName'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.nickName} 
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
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
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <InputLabel id='jobLabel'>職業</InputLabel>
          <Select
            labelId='jobLabel'
            name='job'
            id='job'
            value={props.job}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {jobs.map(jobOption => (
              <MenuItem value={jobOption}>{jobOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {props.job === '学生' &&
          <FormControl　className={classes.formControl}>
            <InputLabel id='schoolLabel'>種類</InputLabel>
            <Select
              labelId='schoolLabel'
              name='school'
              id='school'
              value={props.school}
              onChange={props.handleChange}
              >
              <MenuItem value="">None</MenuItem>
              {schools.map(schoolOption => (
                <MenuItem value={schoolOption}>{schoolOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        {props.job === '社会人' &&
          <FormControl　className={classes.formControl}>
            <InputLabel id='bizLabel'>業界</InputLabel>
            <Select
              labelId='bizLabel'
              name='biz'
              id='biz'
              value={props.biz}
              onChange={props.handleChange}
              >
              <MenuItem value="">None</MenuItem>
              {bizs.map(bizOption => (
                <MenuItem value={bizOption}>{bizOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        <br />
        <FormControl　className={classes.formControl}>
        <InputLabel id='genderLabel'>性別</InputLabel>
          <Select
            labelId='genderLabel'
            name='gender'
            id='gender'
            value={props.gender}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {genders.map(gender => (
              <MenuItem value={gender}>{gender}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl　className={classes.formControl}>
          <InputLabel id='prefLabel'>都道府県</InputLabel>
          <Select
            labelId='prefLabel'
            name='pref'
            id='pref'
            value={props.pref}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {prefs.map(pref => (
              <MenuItem value={pref}>{pref}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        {props.job === '社会人' &&
          <FormControl　className={classes.formControl}>
            <InputLabel id='educLabel'>最終学歴</InputLabel>
            <Select
              labelId='educLabel'
              name='educ'
              id='educ'
              value={props.educ}
              onChange={props.handleChange}
            >
              <MenuItem value="">None</MenuItem>
              {educs.map(educ => (
                <MenuItem value={educ}>{educ}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          onChange={props.handleChange} 
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
          onChange={props.handleChange} 
        />
        <br />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">BetMeを利用する目的</FormLabel>
          <FormGroup>
            {regPurposes.map(option => (
              <FormControlLabel
                control={
                  <Checkbox 
                    // checked={(props.regPurpose).indexOf(option) !== -1}
                    onChange={() => handleRegPurpose(option)}
                    name={option} 
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
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
            Next
          </Button>
        </div>
      </ValidatorForm>
    </>
  )
}

export default ProfileForm;