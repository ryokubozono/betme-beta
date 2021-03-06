import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import ExamForm from 'components/admin/exam/ExamNew/ExamForm';
import { makeStyles } from '@material-ui/core/styles';
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { ExamsContext } from 'hooks/Exams';
import { useLocation } from 'react-router-dom';
import firebase, { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import paths from 'paths';
import Spacer from 'components/commons/atoms/Spacer';
import { GetDefaultDate } from 'components/commons/atoms/GetDefaultDate';
import { GetTimestamp } from 'components/commons/atoms/GetTimestamp';

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))


const ExamNew = (props) => {

  const classes = useStyles();
  const [exam, setExam] = useState('');
  const { exams } = useContext(ExamsContext);
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');
  const [examName, setExamName] = useState('');
  const [certId, setCertId] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [examDate, setExamDate] = useState('')
  const [examDateTmp, setExamDateTmp] = useState('');
  const [applyDate, setApplyDate] = useState('');
  const [applyDateTmp, setApplyDateTmp] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [resultDateTmp, setResultDateTmp] = useState('');
  const [betmeApplyDate, setBetmeApplyDate] = useState('');
  const [betmeApplyDateTmp, setBetmeApplyDateTmp] = useState('');
  const [betmeResultDate, setBetmeResultDate] = useState('');
  const [betmeResultDateTmp, setBetmeResultDateTmp] = useState('');
  const [betAmount, setBetAmount] = useState(0);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break;
      case 'examName':
        setExamName(event.target.value)
        break;
      case 'certId':
        setCertId(event.target.value)
        break;
      case 'isDisable':
        setIsDisable(!isDisable)
        break;
      case 'examDateTmp':
        setExamDateTmp(event.target.value)
        break;
      case 'applyDateTmp':
        setApplyDateTmp(event.target.value)
        break;
      case 'resultDateTmp':
        setResultDateTmp(event.target.value)
        break;
      case 'betmeApplyDateTmp':
        setBetmeApplyDateTmp(event.target.value)
        break;
      case 'betmeResultDateTmp':
        setBetmeResultDateTmp(event.target.value)
        break;
      case 'betAmount':
        setBetAmount(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  const handleSubmit = () => {

    let examDateRef = GetTimestamp(examDateTmp);
    let applyDateRef = GetTimestamp(applyDateTmp);
    let resultDateRef = GetTimestamp(resultDateTmp);
    let betmeApplyDateRef = GetTimestamp(betmeApplyDateTmp);
    let betmeResultDateRef = GetTimestamp(betmeResultDateTmp);
    let docId = db.collection('exam').doc().id
    db.collection('exam').doc(docId).set({
      docId: docId,
      uid: docId,
      name: name,
      examName: examName,
      certId: certId,
      isDisable: isDisable,
      examDate: firebase.firestore.Timestamp.fromDate(examDateRef),
      applyDate: firebase.firestore.Timestamp.fromDate(applyDateRef),
      resultDate: firebase.firestore.Timestamp.fromDate(resultDateRef),
      betmeApplyDate: firebase.firestore.Timestamp.fromDate(betmeApplyDateRef),
      betmeResultDate: firebase.firestore.Timestamp.fromDate(betmeResultDateRef),
    })
    .then(() => {
      history.push({
        pathname: `/admin/exam/edit/${docId}`,
        state: {
          text: '???????????????????????????',
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

  useEffect(() => {
    if (exam) {
      if (exam.examDate) {
        let examDateRef = GetDefaultDate(exam.examDate.toDate())
        setExamDateTmp(examDateRef)    
      }
      if (exam.applyDate) {
        let applyDateRef = GetDefaultDate(exam.applyDate.toDate())
        setApplyDateTmp(applyDateRef)
      }
      if (exam.resultDate) {
        let resultDateRef = GetDefaultDate(exam.resultDate.toDate())
        setResultDateTmp(resultDateRef)
      }
      if (exam.betmeApplyDate) {
        let betmeApplyDateRef = GetDefaultDate(exam.betmeApplyDate.toDate())
        setBetmeApplyDateTmp(betmeApplyDateRef)
      }
      if (exam.betmeResultDate) {
        let betmeResultDateRef = GetDefaultDate(exam.betmeResultDate.toDate())
        setBetmeResultDateTmp(betmeResultDateRef)
      }
    }

  }, [exam, exam.examDate, exam.applyDate, exam.resultDate, exam.betmeResultDate, exam.betmeApplyDate])

  return (
    <>
      <AppLayout>
        <AdminGate>
          <ExamForm 
            exam={exam} 
            name={name}
            examName={examName}
            certId={certId}
            isDisable={isDisable}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            examDateTmp={examDateTmp}
            applyDateTmp={applyDateTmp}
            resultDateTmp={resultDateTmp}
            betmeApplyDateTmp={betmeApplyDateTmp}
            betmeResultDateTmp={betmeResultDateTmp}
            betAmount={betAmount}
          />
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.examindex}`)}
            >
              ?????????????????????
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamNew;
