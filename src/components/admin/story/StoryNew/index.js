import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import StoryForm from 'components/admin/story/StoryNew/StoryForm';
import { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import { StoryFindFilter } from 'components/commons/filters/StoryFindFilter';
import { useLocation } from 'react-router-dom';
import { StoriesContext } from "hooks/Stories";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Spacer from 'components/commons/atoms/Spacer';
import paths from 'paths';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const StoryNew = (props) => {
  const classes = useStyles();
  const { stories } = useContext(StoriesContext); 
  const [story, setStory] = useState('');
  const [isDisable, setIsDisable] = useState();
  const location = useLocation();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [biz, setBiz] = useState('');
  const [edu, setEdu] = useState('');
  const [times, setTimes] = useState('');
  const [studyHoursBefore, setStudyHoursBefore] = useState('');
  const [start, setStart] = useState('');
  const [hours, setHours] = useState('');
  const [aveHoursDays, setAveHoursDays] = useState('');
  const [aveHoursHols, setAveHoursHols] = useState('');
  const [studyType, setStudyType] = useState('');
  const [books, setBooks] = useState([]);
  const [schools, setSchools] = useState([]);
  const [mot, setMot] = useState('');
  const [studyMethod, setStudyMethod] = useState('');
  const [regStudy, setRegStudy] = useState('');
  const [goal, setGoal] = useState('');
  const [advice, setAdvice] = useState('');
  const [impBetme, setImpBetme] = useState('');
  const [expBetme, setExpBetme] = useState('');
  const [income, setIncome] = useState('');
  const [certId, setCertId] = useState('');

  const history = useHistory();

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'age':
        setAge(event.target.value)
        break;
      case 'gender':
        setGender(event.target.value)
        break;
      case 'job':
        setJob(event.target.value)
        break;
      case 'biz':
        setBiz(event.target.value)
        break
      case 'edu':
        setEdu(event.target.value)
        break;
      case 'times':
        setTimes(event.target.value)
        break;
      case 'studyHoursBefore':
        setStudyHoursBefore(event.target.value)
        break;
      case 'start':
        setStart(event.target.value)
        break;
      case 'hours':
        setHours(event.target.value)
        break;
      case 'aveHoursDays':
        setAveHoursDays(event.target.value)
        break;
      case 'aveHoursHols':
        setAveHoursHols(event.target.value)
        break;
      case 'studyType':
        setStudyType(event.target.value)
        break;
      case 'mot':
        setMot(event.target.value)
        break;
      case 'studyMethod':
        setStudyMethod(event.target.value)
        break;
      case 'regStudy':
        setRegStudy(event.target.value)
        break;
      case 'goal':
        setGoal(event.target.value)
        break;
      case 'advice':
        setAdvice(event.target.value)
        break;
      case 'impBetme':
        setImpBetme(event.target.value)
        break;
      case 'expBetme':
        setExpBetme(event.target.value)
        break;
      case 'income':
        setIncome(event.target.value)
        break;
      case 'books':
        setBooks(event.target.value)
        break;
      case 'schools':
        setSchools(event.target.value)
        break;
      case 'certId':
        setCertId(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  const handleSubmit = () => {
    let docId = db.collection('story').doc().id;
    db.collection('story').doc(docId).set({
      docId: docId,
      uid: docId,
      age: age,
      gender: gender,
      job: job,
      biz: biz,
      edu: edu,
      times: times,
      studyHoursBefore: studyHoursBefore,
      start: start,
      hours: hours,
      aveHoursDays: aveHoursDays,
      aveHoursHols: aveHoursHols,
      studyType: studyType,
      books: books,
      schools: schools,
      mot: mot,
      studyMethod: studyMethod,
      regStudy: regStudy,
      goal: goal,
      advice: advice,
      impBetme: impBetme,
      expBetme: expBetme,
      income: income,
      certId: certId,
    })
    .then(() => {
      history.push({
        pathname: `/admin/story/edit/${docId}`,
        state: {
          text: '??????????????????????????????',
          type: 'success'
        }
      })
    })
    .catch((error) => {
      history.push({
        state: {
          text: error.message,
          type: 'error'        
        }
      });
    })
  }

  return (
    <>
      <AppLayout>
        <AdminGate>
          <p>??????????????????</p>
          <StoryForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            age={age}
            gender={gender}
            job={job}
            biz={biz}
            edu={edu}
            times={times}
            studyHoursBefore={studyHoursBefore}
            start={start}
            hours={hours}
            aveHoursDays={aveHoursDays}
            aveHoursHols={aveHoursHols}
            studyType={studyType}
            books={books}
            schools={schools}
            mot={mot}
            studyMethod={studyMethod}
            regStudy={regStudy}
            goal={goal}
            advice={advice}
            impBetme={impBetme}
            expBetme={expBetme}
            income={income}
            certId={certId}
          />
          <Spacer/>
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.storyindex}`)}
            >
              ????????????????????????
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default StoryNew;
