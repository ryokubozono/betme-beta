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
  // const [toGetMoney, setToGetMoney] = useState(false);
  // const [toUseTimer, setToUseTimer] = useState(false);
  // const [regPurposeRef, setRegPurposeRef] = useState([]);

  // const removeFromArray = (item) => {
  //   const index = regPurposeRef.indexOf(String(item))
  //   if (index  !== -1) {
  //     regPurposeRef.splice(index, 1)
  //   } 
  // }

  // const handleRegPurpose = (event) => {
  //   switch (event.target.name) {
  //     case 'toGetMoney':
  //       if (!toGetMoney) {
  //         regPurposeRef.push('toGetMoney');
  //       } else {
  //         removeFromArray('toGetMoney')
  //       }
  //       setToGetMoney(!toGetMoney);
  //       break;
  //     case 'toUseTimer':
  //       if (!toUseTimer) {
  //         regPurposeRef.push('toUseTimer');
  //       } else {
  //         removeFromArray('toUseTimer')
  //       }
  //       setToUseTimer(!toUseTimer);
  //       break;
  //     default:
  //       console.log('no key match')
  //   }
  // }
  // console.log(regPurposeRef);

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleNext}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          className={classes.formControl} 
          required
          label='??????????????????'
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
            label="????????????"
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
        <FormControl???className={classes.formControl}>
          <InputLabel id='jobLabel'>??????</InputLabel>
          <Select
            labelId='jobLabel'
            name='job'
            id='job'
            value={props.job}
            onChange={props.handleChange}
          >
            <MenuItem value="">?????????</MenuItem>
            {jobs.map(jobOption => (
              <MenuItem value={jobOption}>{jobOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* {props.job === '??????' &&
          <FormControl???className={classes.formControl}>
            <InputLabel id='schoolLabel'>??????</InputLabel>
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
        } */}
        {/* {props.job === '?????????' &&
          <FormControl???className={classes.formControl}>
            <InputLabel id='bizLabel'>??????</InputLabel>
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
        } */}
        <br />
        <FormControl???className={classes.formControl}>
        <InputLabel id='genderLabel'>??????</InputLabel>
          <Select
            labelId='genderLabel'
            name='gender'
            id='gender'
            value={props.gender}
            onChange={props.handleChange}
          >
            <MenuItem value="">?????????</MenuItem>
            {genders.map(gender => (
              <MenuItem value={gender}>{gender}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl
          required
          className={classes.formControl}
        >
          <InputLabel id='prefLabel'>????????????</InputLabel>
          <Select
            labelId='prefLabel'
            name='pref'
            id='pref'
            value={props.pref}
            onChange={props.handleChange}
          >
            <MenuItem value="">?????????</MenuItem>
            {prefs.map(pref => (
              <MenuItem value={pref}>{pref}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        {/* {props.job === '?????????' &&
          <FormControl???className={classes.formControl}>
            <InputLabel id='educLabel'>????????????</InputLabel>
            <Select
              labelId='educLabel'
              name='educ'
              id='educ'
              value={props.educ}
              onChange={props.handleChange}
            >
              <MenuItem value="">?????????</MenuItem>
              {educs.map(educ => (
                <MenuItem value={educ}>{educ}</MenuItem>
              ))}
            </Select>
          </FormControl>
        } */}
        {/* <TextValidator
          className={classes.formControl} 
          label='????????????'
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
          className={classes.formControl} 
          label='???????????????????????????'
          id='college'
          name='college'
          type="text"
          color='primary'
          fullWidth
          margin="normal"
          value={props.college} 
          onChange={props.handleChange} 
        /> */}
        <br />
        {props.formType !== 'myAccount' &&
        <>
        {/* <FormControl
          required 
          component="fieldset" 
          className={classes.formControl}
        >
          <FormLabel component="legend">BetMe?????????????????????</FormLabel>
          <FormGroup>
          
            <FormControlLabel
              control={
                <Checkbox
                  name='toGetMoney'
                  checked={props.toGetMoney}
                  onChange={props.handleRegPurpose}
                />
              }
              label='???????????????'
            />

            <FormControlLabel
              control={
                <Checkbox
                  name='toUseTimer'
                  checked={props.toUseTimer}
                  onChange={props.handleRegPurpose}
                />
              }
              label='?????????????????????'
            />
            
          </FormGroup>
        </FormControl>
        <Spacer /> */}
        <div>
          <Button 
            onClick={props.handleBack} 
            color='primary'
            variant="outlined"
          >
            ??????
          </Button>
          &nbsp;
          &nbsp;
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            ??????
          </Button>
        </div>
        </>
        }
        {props.formType === 'myAccount' &&
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            ???????????????????????????
          </Button>
        }
      </ValidatorForm>
    </>
  )
}

export default ProfileForm;
