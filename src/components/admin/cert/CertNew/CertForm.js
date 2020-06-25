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
import { divisions } from 'components/commons/consts/divisions';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
  const location = useLocation();
  const [categoryInput, setCategoryInput] = useState([]);
  const history = useHistory();

  useEffect(() => {
    history.push(0)
  }, [])

  useEffect(() => {
    if (props.category) {
      let catRef = categories;
      catRef = catRef.filter(cat => {
        if (props.category.indexOf(cat.title) !== -1) {
          return cat;
        } else {
          return false; 
        }
      })
      setCategoryInput(catRef)
    }
  }, [props.category, location])

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
        <TextValidator
          label='資格の説明'
          id="desc"
          name='desc'
          color='primary'
          style={{ width: 250 }}
          multiline
          rows={3}
          margin="normal"
          value={props.desc}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
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
        <InputLabel id='divisionLabel'>資格区分</InputLabel>
        <Select
          labelId='divisionLabel'
          native
          name='division'
          id='division'
          value={props.division}
          onChange={props.handleChange}
        >
          {divisions.map(div => (
            <option value={div}>{div}</option>
          ))}
        </Select>
        <br />
        <TextValidator
          label='主催者'
          id="sponsor"
          name='sponsor'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.sponsor}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='受験資格'
          id="qual"
          name='qual'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.qual}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='試験頻度'
          id="freq"
          name='freq'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.freq}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='目安勉強時間'
          id="studyTime"
          name='studyTime'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.studyTime}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='試験時間'
          id="examTime"
          name='examTime'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.examTime}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='出題形式'
          id="format"
          name='format'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.format}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='申込方法'
          id="applyMethod"
          name='applyMethod'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.applyMethod}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='受験料'
          id="fee"
          name='fee'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.fee}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='試験会場'
          id="testCenter"
          name='testCenter'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.testCenter}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='難易度'
          id="difficulty"
          name='difficulty'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.difficulty}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='合格率'
          id="passRate"
          name='passRate'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.passRate}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='合格点'
          id="passMark"
          name='passMark'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.passMark}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='問合せ先'
          id="refOrg"
          name='refOrg'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.refOrg}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='WEB'
          id="refWeb"
          name='refWeb'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.refWeb}
          onChange={props.handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
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
