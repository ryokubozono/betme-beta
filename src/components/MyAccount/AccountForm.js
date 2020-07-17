import React, { useState, useContext, useEffect } from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { jobs } from 'components/commons/consts/jobs';
import { genders } from 'components/commons/consts/genders';
import FormControl from '@material-ui/core/FormControl';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { categories } from 'components/commons/consts/categories';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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

const AccountForm = (props) => {

  const classes = useStyles();
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('');
  const [birthdayRef, setBirthdayRef] = useState('');
  const [highSchool, setHighSchool] = useState('');
  const [college, setCollege] = useState('');
  const [categoryRef, setCategoryRef] = useState([])
  const [category, setCategory] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [gilad, setGilad] = useState(false);
  const [jason, setJason] = useState(false);
  const [antoine, setAntoine] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'job':
        setJob(event.target.value)
        break;
      case 'gender':
        setGender(event.target.value)
        break;
      case 'birthdayRef':
        setBirthdayRef(event.target.value)
        break;
      case 'highSchool':
        setHighSchool(event.target.value)
        break;
      case 'college':
        setCollege(event.target.value)
        break;
      case 'dispalyName':
        setDisplayName(event.target.value)
        break;
      case 'gilad':
        setGilad(!gilad)
        break;
      case 'jason':
        setJason(!jason)
        break;
      case 'antoine':
        setAntoine(!antoine)
        break;
      default:
        console.log('no key match')
    }
  }

  const handleSubmit = () => {
    console.log('handle submit')
  }

  useEffect(() => {
    if (categoryRef && categoryRef) {
      let catRef = [];
      categoryRef.forEach(cat => {
        catRef.push(
          cat.title,
        )
      })
      setCategory(catRef)
    }
  }, [categoryRef])

  useEffect(() => {
    if (category) {
      let catRef = categories;
      catRef = catRef.filter(cat => {
        if (category.indexOf(cat.title) !== -1) {
          return cat;
        } else {
          return false; 
        }
      })
      setCategoryInput(catRef)
    }
  }, [category])

  useEffect(() => {
    history.push(0)
  }, [])

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='氏名'
            id="displayName"
            name='displayName'
            color='primary'
            style={{ width: 250 }}
            margin="normal"
            value={displayName}
            onChange={handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <InputLabel id='jobLabel'>職業</InputLabel>
          <Select
            labelId='jobLabel'
            // native
            name='job'
            id='job'
            value={job}
            onChange={handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {jobs.map(jobOption => (
              <MenuItem value={jobOption}>{jobOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <InputLabel id='genderLable'>性別</InputLabel>
          <Select
            labelId='genderLable'
            name='gender'
            id='gender'
            value={gender}
            onChange={handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {genders.map(gender => (
              <MenuItem value={gender}>{gender}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
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
            value={birthdayRef}
            onChange={handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='高校'
            id="highSchool"
            name='highSchool'
            color='primary'
            style={{ width: 250 }}
            margin="normal"
            value={highSchool}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='大学'
            id="college"
            name='college'
            color='primary'
            style={{ width: 250 }}
            margin="normal"
            value={college}
            onChange={handleChange} 
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <AutoComplete
            value={categoryInput}
            name='category'
            id="category"
            multiple
            options={categories.sort((a, b) => -b.group.localeCompare(a.group))}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.title}
            style={{ width: 250 }}
            onChange={(event, newValue) => {
              setCategoryRef(newValue);
            }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="興味・関心"
              />
            }
          />
        </FormControl>        
        <br />
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
        <p>他：流入元がわかるもの（何で知ったか？）、資格で何がしたいか？、賞金を何に使いたいか？</p>

        <div className={classes.buttonAlign}>
          <Button 
            type="submit"
            color='secondary'
            variant="contained"
          >
            確定
          </Button>
        </div>
      </ValidatorForm> 
    </>
  )
}

export default AccountForm;
