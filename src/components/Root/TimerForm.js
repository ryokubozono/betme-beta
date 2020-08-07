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

const today = GetDefaultDate(new Date())

const TimerForm = (props) => {


  return (
    <>
      <FormControl 
        className={props.classes.container} 
        noValidate
      >
        <TextField
          id="studyDate"
          name='studyDate'
          label="学習日"
          type="date"
          className={props.classes.textField}
          value={props.studyDate}
          // defaultValue={today}
          onChange={props.handleChange} 
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <AutoComplete
        value={props.book}
        name='book'
        id="book"
        options={props.booksList.sort((a, b) => -b.group.localeCompare(a.group))}
        getOptionLabel={(option) => option.title}
        groupBy={(option) => option.group}
        className={props.classes.autoComplete}
        style={{ width: 220 }}
        onChange={(event, newValue) => {
          props.setBook(newValue);
        }}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label="教材" 
          />
        }
      />

      {/* <FormControl 
        className={props.classes.formControl}
      >
        <InputLabel id="hour">教材</InputLabel>
        <Select
          labelId="book"
          id="book"
          name='book'
          value={props.bookId}
          onChange={props.handleChange}
        >
          {props.myBookList.map(book => (
            <MenuItem value={book.docId}>{book.title}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
      
      <div className={props.classes.buttonAlign}>
        <Button
          onClick={props.handleOpenAdd}    
          color='primary'
          variant="outlined"
          size='small'
        >
          リストを編集
        </Button>
        &nbsp;
        <Button
          onClick={props.handleOpenNew}
          color='primary'
          variant="outlined"
          size='small'
        >
          新規登録
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={props.classes.modal}
        open={props.openAdd}
        onClose={props.handleClose}
      >
        <div className={props.classes.paper}>
          <div className={props.classes.closeButton} >
            <HighlightOff 
              onClick={props.handleClose}
            />
          </div>
          <AddMyBook 
            handleClose={props.handleClose}          
          />
        </div>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={props.classes.modal}
        open={props.openNew}
        onClose={props.handleClose}
      >
        <div className={props.classes.paper}>
          <div className={props.classes.closeButton} >
            <HighlightOff 
              onClick={props.handleClose}
            />
          </div>
          <NewMyBook 
            handleClose={props.handleClose}
          />
        </div>
      </Modal>
      <p className={props.classes.inputLabel}>
        学習時間
      </p>
      <FormControl 
        className={props.classes.formControl}
      >
        <InputLabel id="hour">時間</InputLabel>
        <Select
          labelId="hour"
          id="hour"
          name='hour'
          value={props.hour}
          onChange={props.handleChange}
        >
          {props.hours.map(hour => (
            <MenuItem value={hour.value}>{hour.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl 
        className={props.classes.formControl}
      >
        <InputLabel id="min">分</InputLabel>
        <Select
          labelId="min"
          id="min"
          name='min'
          value={props.min}
          onChange={props.handleChange}
        >
          {props.mins.map(min => (
            <MenuItem value={min}>{min}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl 
        className={props.classes.formControl}
      >
        <TextField
          id='studyPage' 
          name='studyPage'
          label="学習量" 
          type='number'
          style={{ width: 60 }}
          onChange={props.handleChange} 
          value={props.studyPage}
          className={props.classes.textFeild}
          helperText='ページ'
        />
      </FormControl>
      <br />
      <FormControl 
        className={props.classes.formControl}
      >
        <TextField
          id='studyNote' 
          name='studyNote'
          label="学習内容"
          multiline
          rows={3}
          style={{ width: 200 }}
          onChange={props.handleChange} 
          value={props.studyNote}
          className={props.classes.textFeild}
        />
      </FormControl>
      <Spacer />
      <div className={props.classes.buttonAlign}>
        <Button
          color='primary'
          variant="contained"
          onClick={props.clickAddEvent}
        >
          学習を記録
        </Button>
      </div>
    </>
  )
}

export default TimerForm;