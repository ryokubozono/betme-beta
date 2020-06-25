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

const ExamEdit = (props) => {
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
      default:
        console.log('no key match')
    }
  }

  useEffect(() => {
    if (location.pathname) {
      let examRef = ExamFindFilter(exams, location.pathname.substr(-20));
      if (examRef) {
        setExam(examRef);
        setName(examRef.name);
        setExamName(examRef.examName);
        setCertId(examRef.certId);
        setIsDisable(examRef.isDisable);
        setExamDate(examRef.examDate);
        setApplyDate(examRef.applyDate);
        setResultDate(examRef.resultDate);
        setBetmeApplyDate(examRef.betmeApplyDate);
        setBetmeResultDate(examRef.betmeResultDate);
      }
    }
  }, [exams, location.pathname])

  const handleSubmit = () => {

    let examDateRef = GetTimestamp(examDateTmp);
    let applyDateRef = GetTimestamp(applyDateTmp);
    let resultDateRef = GetTimestamp(resultDateTmp);
    let betmeApplyDateRef = GetTimestamp(betmeApplyDateTmp);
    let betmeResultDateRef = GetTimestamp(betmeResultDateTmp);
    console.log(betmeResultDateRef)

    db.collection('exam').doc(exam.docId).set({
      name: name,
      examName: examName,
      certId: certId,
      isDisable: isDisable,
      examDate: firebase.firestore.Timestamp.fromDate(examDateRef),
      applyDate: firebase.firestore.Timestamp.fromDate(applyDateRef),
      resultDate: firebase.firestore.Timestamp.fromDate(resultDateRef),
      betmeApplyDate: firebase.firestore.Timestamp.fromDate(betmeApplyDateRef),
      betmeResultDate: firebase.firestore.Timestamp.fromDate(betmeResultDateRef),

    }, {merge: true})
    .then(() => {
      history.push({
        pathname: `/admin/exam/edit/${exam.docId}`,
        state: {
          text: '試験を更新しました',
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
          />
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.examindex}`)}
            >
              試験一覧に戻る
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default ExamEdit;
