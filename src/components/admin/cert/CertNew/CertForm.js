import React, { useContext, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { categories } from 'components/commons/consts/categories';

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const CertForm = (props) => {
  const classes = useStyles();

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label='資格の名前'
          id="name"
          name='name'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.name}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='資格の見出し'
          id="note"
          name='note'
          color='primary'
          style={{ width: 250 }}
          multiline
          rows={3}
          margin="normal"
          value={props.note}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <AutoComplete
          name='category'
          id="category"
          multiple
          options={categories.sort((a, b) => -b.group.localeCompare(a.group))}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.title}
          style={{ width: 250 }}
          onChange={(event, newValue) => {
            props.setCategoryRef(newValue);
          }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label="カテゴリー" 
            />
          }
        />
        <br />
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>非表示</Grid>
            <Grid item>
            <AntSwitch checked={props.isDisable} onChange={props.handleChange} name="isDisable" />
            </Grid>
          </Grid>
        </Typography>
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

export default CertForm;
