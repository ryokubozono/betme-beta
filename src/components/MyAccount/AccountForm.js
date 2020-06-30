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

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
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
        <br />
        <InputLabel id='jobLabel'>職業</InputLabel>
        <Select
          labelId='jobLabel'
          native
          name='job'
          id='job'
          value={job}
          onChange={handleChange}
        >
          {jobs.map(job => (
            <option value={job}>{job}</option>
          ))}
        </Select>
        <br /><br />
        <InputLabel id='genderLable'>性別</InputLabel>
        <Select
          labelId='genderLable'
          native
          name='gender'
          id='gender'
          value={gender}
          onChange={handleChange}
        >
          {genders.map(gender => (
            <option value={gender}>{gender}</option>
          ))}
        </Select>
        <br />
        <FormControl 
          className={classes.container} 
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
        <br />
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
        <br />
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
        <br />

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
