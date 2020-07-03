import React, { useContext, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, TextField } from "@material-ui/core";
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

const ExamForm = (props) => {
  const classes = useStyles();
  const { certs } = useContext(CertsContext);
  const [certsOption, setCertsOption] = useState([]);

  useEffect(() => {
    let certsOptionRef = [];
    if (certs) { 
      certsOptionRef = certs;
      certsOptionRef = certsOptionRef.filter(row => {
        if (row.isDisable) {
          return false;
        } else {
          return row;
        }
      })
    }
    setCertsOption(certsOptionRef)
  }, [certs])

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <FormControl　className={classes.formControl}>
          <InputLabel id='certIdLabel'>資格</InputLabel>
          <Select
            labelId='certIdLabel'
            // native
            name='certId'
            id='certId'
            value={props.certId}
            onChange={props.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            {certsOption.map(cert => (
              <MenuItem value={cert.docId}>{cert.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='試験の名前(短)'
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
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='試験の名前(長)'
            id="examName"
            name='examName'
            color='primary'
            style={{ width: 250 }}
            margin="normal"
            value={props.examName}
            onChange={props.handleChange} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </FormControl>
        <br />
        <FormControl 
          className={classes.formControl} 
          noValidate
        >
          <TextField
            id="applyDateTmp"
            name='applyDateTmp'
            label="申込締切"
            type="date"
            className={classes.textField}
            value={props.applyDateTmp}
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl 
          className={classes.formControl} 
          noValidate
        >
          <TextField
            id="examDateTmp"
            name='examDateTmp'
            label="試験日"
            type="date"
            className={classes.textField}
            value={props.examDateTmp}
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl 
          className={classes.formControl} 
          noValidate
        >
          <TextField
            id="resultDateTmp"
            name='resultDateTmp'
            label="合格発表"
            type="date"
            className={classes.textField}
            value={props.resultDateTmp}
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl 
          className={classes.formControl} 
          noValidate
        >
          <TextField
            id="betmeApplyDateTmp"
            name='betmeApplyDateTmp'
            label="betme申込締切"
            type="date"
            className={classes.textField}
            value={props.betmeApplyDateTmp}
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl 
          className={classes.formControl} 
          noValidate
        >
          <TextField
            id="betmeResultDateTmp"
            name='betmeResultDateTmp'
            label="betme報告締切"
            type="date"
            className={classes.textField}
            value={props.betmeResultDateTmp}
            onChange={props.handleChange} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <TextValidator
            label='BET金額[円]'
            id="betAmount"
            name='betAmount'
            color='primary'
            type='number'
            style={{ width: 250 }}
            margin="normal"
            value={props.betAmount}
            onChange={props.handleChange} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </FormControl>
        <br />
        <FormControl　className={classes.formControl}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>非表示</Grid>
              <Grid item>
                <AntSwitch checked={props.isDisable} onChange={props.handleChange} name="isDisable" />
              </Grid>
            </Grid>
          </Typography>
        </FormControl>
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

export default ExamForm;
