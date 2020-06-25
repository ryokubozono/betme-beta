import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import AdminGate from 'components/commons/layout/AdminGate';
import { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import Spacer from 'components/commons/atoms/Spacer';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import paths from 'paths';
import CertForm from 'components/admin/cert/CertNew/CertForm';
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import { useLocation } from 'react-router-dom';
import { CertsContext } from "hooks/Certs";

const useStyles = makeStyles((theme) => ({
  buttonAlign: {
    textAlign: 'center',
  },
}))

const CertEdit = (props) => {

  const classes = useStyles();
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [desc, setDesc] = useState('');
  const [cert, setCert] = useState('');
  const [division, setDivision] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [qual, setQual] = useState('');
  const [freq, setFreq] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [examTime, setExamTime] = useState('');
  const [format, setFormat] = useState('');
  const [applyMethod, setApplyMethod] = useState('');
  const [fee, setFee] = useState('');
  const [testCenter, setTestCenter] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [passRate, setPassRate] = useState('');
  const [passMark, setPassMark] = useState('');
  const [refOrg, setRefOrg] = useState('');
  const [refWeb, setRefWeb] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [categoryRef, setCategoryRef] = useState([])
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { certs } = useContext(CertsContext); 

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break;
      case 'note':
        setNote(event.target.value)
        break;
      case 'desc':
        setDesc(event.target.value)
        break;
      case 'isDisable':
        setIsDisable(!isDisable)
        break;
      case 'division':
        setDivision(event.target.value)
        break;
      case 'sponsor':
        setSponsor(event.target.value)
        break;
      case 'qual':
        setQual(event.target.value)
        break;
      case 'freq':
        setFreq(event.target.value)
        break;
      case 'studyTime':
        setStudyTime(event.target.value)
        break;
      case 'examTime':
        setExamTime(event.target.value)
        break;
      case 'format':
        setFormat(event.target.value)
        break;
      case 'applyMethod':
        setApplyMethod(event.target.value)
        break;
      case 'fee':
        setFee(event.target.value)
        break;
      case 'testCenter':
        setTestCenter(event.target.value)
        break;
      case 'difficulty':
        setDifficulty(event.target.value)
        break;
      case 'passRate':
        setPassRate(event.target.value)
        break;
      case 'passMark':
        setPassMark(event.target.value)
        break;
      case 'refOrg':
        setRefOrg(event.target.value)
        break;
      case 'refWeb':
        setRefWeb(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }

  useEffect(() => {
    if (location.pathname) {
      let certRef = CertFindFilter(certs, location.pathname.substr(-20));
      if (certRef) {
        setCert(certRef)
        setName(certRef.name)
        setNote(certRef.note)
        setDesc(certRef.desc)
        setDivision(certRef.division)
        setSponsor(certRef.sponsor)
        setQual(certRef.qual)
        setFreq(certRef.freq)
        setStudyTime(certRef.studyTime)
        setExamTime(certRef.examTime)
        setFormat(certRef.format)
        setApplyMethod(certRef.applyMethod)
        setFee(certRef.fee)
        setTestCenter(certRef.testCenter)
        setDifficulty(certRef.difficulty)
        setPassRate(certRef.passRate)
        setPassMark(certRef.passMark)
        setRefOrg(certRef.refOrg)
        setRefWeb(certRef.refWeb)
        setIsDisable(certRef.isDisable)
        setCategory(certRef.category)
      }
    }
  }, [certs, location])

  useEffect(() => {
    if (categoryRef) {
      let catRef = [];
      categoryRef.forEach(cat => {
        catRef.push(
          cat.title,
        )
      })
      setCategory(catRef)
    }
  }, [categoryRef])

  const handleSubmit = () => {
    db.collection('cert').doc(cert.docId).set({
      name: name,
      note: note,
      desc: desc,
      division: division,
      sponsor: sponsor,
      qual: qual,
      freq: freq,
      studyTime: studyTime,
      examTime: examTime,
      format: format,
      applyMethod: applyMethod,
      fee: fee,
      testCenter: testCenter,
      difficulty: difficulty,
      passRate: passRate,
      passMark: passMark,
      refOrg: refOrg,
      refWeb: refWeb,
      category: category,
      isDisable: isDisable,
    }, {merge: true})
    .then(() => {
      history.push({
        pathname: `/admin/cert/edit/${cert.docId}`,
        state: {
          text: '資格を更新しました',
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
          <p>資格を説明</p>
          <CertForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            name={name}
            note={note}
            desc={desc}
            division={division}
            sponsor={sponsor}
            qual={qual}
            freq={freq}
            studyTime={studyTime}
            examTime={examTime}
            format={format}
            applyMethod={applyMethod}
            fee={fee}
            testCenter={testCenter}
            difficulty={difficulty}
            passRate={passRate}
            passMark={passMark}
            refOrg={refOrg}
            refWeb={refWeb}
            isDisable={isDisable}
            category={category}
            setCategoryRef={setCategoryRef}
          />
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`/admin/cert/edittext/${cert.docId}`)}
            >
              文章の編集
            </Button>
          </div>
          <Spacer />
          <div className={classes.buttonAlign}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => history.push(`${paths.certindex}`)}
            >
              資格一覧に戻る
            </Button>
          </div>
        </AdminGate>
      </AppLayout>      
    </>
  )
}

export default CertEdit;
