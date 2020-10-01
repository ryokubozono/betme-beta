import React, { useContext, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CertsContext } from "hooks/Certs";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const StoryForm = (props) => {
  const classes = useStyles();
  const { certs } = useContext(CertsContext); 

  return (
    <>
      <ValidatorForm
        useRef="form"
        onSubmit={props.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Select
          label="資格"
          id="certId"
          name='certId'
          value={props.certId}
          onChange={props.handleChange}
        >
          {certs.map(cert => (
            <MenuItem value={cert.docId}>{cert.name}</MenuItem>
          ))}
        </Select>

        <br />

        <TextValidator
          label='年齢'
          id="age"
          name='age'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.age}
          onChange={props.handleChange} 

        />
        <TextValidator
          label='性別'
          id="gender"
          name='gender'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.gender}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='職業'
          id="job"
          name='job'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.job}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='業界'
          id="biz"
          name='biz'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.biz}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='学歴'
          id="edu"
          name='edu'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.edu}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='何回目'
          id="times"
          name='times'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.times}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='前回までの勉強時間'
          id="studyHoursBefore"
          name='studyHoursBefore'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.studyHoursBefore}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='開始時期'
          id="start"
          name='start'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.start}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='今回の勉強時間'
          id="hours"
          name='hours'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.hours}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='平日の平均勉強時間'
          id="aveHoursDays"
          name='aveHoursDays'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.aveHoursDays}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='休日の平均勉強時間'
          id="aveHoursHols"
          name='aveHoursHols'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.aveHoursHols}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='勉強方法'
          id="studyType"
          name='studyType'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.studyType}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='利用した教材'
          id="books"
          name='books'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.books}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='予備校'
          id="schools"
          name='schools'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.schools}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='動機'
          id="mot"
          name='mot'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.mot}
          onChange={props.handleChange} 
        />

        <TextValidator
          label='学習方法'
          id="studyMethod"
          name='studyMethod'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.studyMethod}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='学習方法の振り返り'
          id="regStudy"
          name='regStudy'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.regStudy}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='今後の目標'
          id="goal"
          name='goal'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.goal}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='アドバイス'
          id="advice"
          name='advice'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.advice}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='BetMeチャレンジの感想'
          id="impBetme"
          name='impBetme'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.impBetme}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='BetMeチャレンジに期待すること'
          id="expBetme"
          name='expBetme'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.expBetme}
          onChange={props.handleChange} 
        />
        <TextValidator
          label='年収'
          id="income"
          name='income'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={props.income}
          onChange={props.handleChange} 
        />
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

export default StoryForm;
