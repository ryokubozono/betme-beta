import React, { useContext, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, TextField, CircularProgress, Dialog } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { CertsContext } from "hooks/Certs";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import firebase from "FirebaseConfig";
import MenuItem from '@material-ui/core/MenuItem';
import { NoticesContext } from 'hooks/Notices';
import { UsersContext } from 'hooks/Users';

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const NoticeForm = (props) => {
  const classes = useStyles();
  const { notices } = useContext(NoticesContext);
  const { users } = useContext(UsersContext);
  const types = [
    'all',
    'unit',
    'exam',
  ]

  const handleClose = () => {
    props.setLoading(false);
  };

  return (
    <>
      {props.loading && 
        <Dialog
          open={props.loading}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <CircularProgress />
        </Dialog>
      }
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <FormControl　className={classes.formControl}>
          <InputLabel id='userIdLabel'>通知</InputLabel>
          <Select
            labelId='userIdLabel'
            // native
            name='userId'
            id='userId'
            value={props.userId}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {users.map(user => (
              <MenuItem value={user.docId}>{user.lastName}{user.firstName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <InputLabel id='typeLabel'>type</InputLabel>
          <Select
            labelId='typeLabel'
            // native
            name='type'
            id='type'
            value={props.type}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {types.map(type => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='body'
            id="body"
            name='body'
            color='primary'
            style={{ width: 250 }}
            margin="normal"
            value={props.body}
            onChange={props.handleChange} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </FormControl>
        <br />
        <div className={classes.buttonAlign}>
          <Button 
            type="submit"
            color='primary'
            variant="contained"
          >
            確定
          </Button>
        </div>
      </ValidatorForm>  
    </>
  )
}

export default NoticeForm;
