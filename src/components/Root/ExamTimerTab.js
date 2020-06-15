import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {GetDefaultDate} from 'components/commons/atoms/GetDefaultDate';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { Button, Modal } from "@material-ui/core";
import HighlightOff from '@material-ui/icons/HighlightOff';
import AddMyBook from "components/Root/AddMyBook";
import NewMyBook from "components/Root/NewMyBook";
import Spacer from "components/commons/atoms/Spacer";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 0,
    marginLeft: 8,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  autoComplete: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    maxWidth: 500,
    width: '80vw',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  closeButton: {
    textAlign: 'right',
  },
}));

const hours = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
]

const mins = [
  { value: 0 },
  { value: 15 },
  { value: 30 },
  { value: 45 },
]

const today = GetDefaultDate(new Date())

const ExamTimerTab = (props) => {
  const classes = useStyles();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [studyDate, setStudyDate] = useState(today);
  const [booksList, setBooksList] = useState([]);
  const [book, setBook] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [studyPage, setStudyPage] = useState('');
  const [studyNote, setStudyNote] = useState('');

  const handleChange = (event) => {
    console.log(event.target)
    switch (event.target.name) {
      case 'hour':
        setHour(event.target.value);
        break;
      case 'min':
        setMin(event.target.value);
        break;
      case 'studyDate':
        setStudyDate(event.target.value);
        break;
      case 'studyPage':
        setStudyPage(event.target.value);
        break;
      case 'studyNote':
        setStudyNote(event.target.value);
        break;
      default:
        console.log('no key match')
    }
  };
  
  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenNew(false);
    setOpenAdd(false);
  };

  return (
    <>
      <h4>{props.examTarget && props.examTarget.examName}</h4>

      <FormControl 
        className={classes.container} 
        noValidate
      >
        <TextField
          id="studyDate"
          name='studyDate'
          label="学習日"
          type="date"
          className={classes.textField}
          value={studyDate}
          // defaultValue={today}
          onChange={handleChange} 
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <AutoComplete
        name='book'
        id="book"
        options={booksList}
        getOptionLabel={(option) => option.title}
        className={classes.autoComplete}
        style={{ width: 220 }}
        onChange={(event, newValue) => {
          setBook(newValue);
        }}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label="教材" 
          />
        }
      />
      <div className={classes.buttonAlign}>
        <Button
          onClick={handleOpenAdd}    
          color='secondary'
          variant="outlined"
          size='small'
        >
          リストから登録
        </Button>
        &nbsp;
        <Button
          onClick={handleOpenNew}
          color='secondary'
          variant="outlined"
          size='small'
        >
          新規登録
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAdd}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.closeButton} >
            <HighlightOff 
              onClick={handleClose}
            />
          </div>
          <AddMyBook />
        </div>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openNew}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.closeButton} >
            <HighlightOff 
              onClick={handleClose}
            />
          </div>
          <NewMyBook />
        </div>
      </Modal>
      <p className={classes.inputLabel}>
        学習時間
      </p>
      <FormControl 
        className={classes.formControl}
      >
        <InputLabel id="hour">時間</InputLabel>
        <Select
          labelId="hour"
          id="hour"
          name='hour'
          value={hour}
          onChange={handleChange}
        >
          {hours.map(hour => (
            <MenuItem value={hour.value}>{hour.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl 
        className={classes.formControl}
      >
        <InputLabel id="min">分</InputLabel>
        <Select
          labelId="min"
          id="min"
          name='min'
          value={min}
          onChange={handleChange}
        >
          {mins.map(min => (
            <MenuItem value={min.value}>{min.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl 
        className={classes.formControl}
      >
        <TextField
          id='studyPage' 
          name='studyPage'
          label="学習量" 
          style={{ width: 200 }}
          onChange={handleChange} 
          value={studyPage}
          className={classes.textFeild}
        />
      </FormControl>
      <br />
      <FormControl 
        className={classes.formControl}
      >
        <TextField
          id='studyNote' 
          name='studyNote'
          label="学習内容"
          multiline
          rows={3}
          style={{ width: 200 }}
          onChange={handleChange} 
          value={studyNote}
          className={classes.textFeild}
        />
      </FormControl>
      <Spacer />
      <div className={classes.buttonAlign}>
        <Button
          color='primary'
          variant="contained"
        >
          学習を記録
        </Button>
      </div>

    </>
  )
}

export default ExamTimerTab;
