import React, {useState} from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import SignupForm from 'components/Signup/SignupForm';
import { Box, Link, Button, Dialog, CircularProgress } from '@material-ui/core';
import Spacer from 'components/commons/atoms/Spacer';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import firebase, { auth, db } from "FirebaseConfig";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ProfileForm from 'components/Signup/ProfileForm';
import ConfirmForm from 'components/Signup/ConfirmForm';
import { regPurposes } from 'components/commons/consts/regPurposes';
import { GetTimestamp } from 'components/commons/atoms/GetTimestamp';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    padding: theme.spacing(0),
  },
}));

function getSteps() {
  return ['ステップ1', 'ステップ2', '確認'];
}

const Signup = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState('');
  const [nickName, setNickName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayRef, setBirthdayRef] = useState('');
  const [job, setJob] = useState('');
  const [school, setSchool] = useState('');
  const [biz, setBiz] = useState('');
  const [gender, setGender] = useState('');
  const [pref, setPref] = useState('');
  const [educ, setEduc] = useState('');
  const [highSchool, setHighSchool] = useState('');
  const [college, setCollege] = useState('');
  const [toGetMoney, setToGetMoney] = useState(false);
  const [toUseTimer, setToUseTimer] = useState(false);
  const [regPurposeRef, setRegPurposeRef] = useState([]);
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    setLoading(false);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(event.target.value);
        break;
      case 'nickName':
        setNickName(event.target.value);
        break;
      case 'birthdayRef':
        setBirthdayRef(event.target.value)
        break;
      case 'job':
        setJob(event.target.value)
        break;
      case 'school':
        setSchool(event.target.value);
        break;
      case 'biz':
        setBiz(event.target.value);
        break;
      case 'gender':
        setGender(event.target.value);
        break;
      case 'pref':
        setPref(event.target.value);
        break;
      case 'educ':
        setEduc(event.target.value);
        break;
      case 'highSchool':
        setHighSchool(event.target.value);
        break;
      case 'college':
        setCollege(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const handleRegPurpose = (event) => {
    switch (event.target.name) {
      case 'toGetMoney':
        if (!toGetMoney) {
          regPurposeRef.push('toGetMoney');
        } else {
          removeFromArray('toGetMoney')
        }
        setToGetMoney(!toGetMoney);
        break;
      case 'toUseTimer':
        if (!toUseTimer) {
          regPurposeRef.push('toUseTimer');
        } else {
          removeFromArray('toUseTimer')
        }
        setToUseTimer(!toUseTimer);
        break;
      default:
        console.log('no key match')
    }
  }

  const removeFromArray = (item) => {
    const index = regPurposeRef.indexOf(String(item))
    if (index  !== -1) {
      regPurposeRef.splice(index, 1)
    } 
  }

  const clickLogupAsUser = () => {
    setLoading(true)
    auth.createUserWithEmailAndPassword(
      email,
      password,
    )
    .then(() => {

      let birthdayTmp = GetTimestamp(birthdayRef);

      auth.onAuthStateChanged(function(user) {
        if (user) {
          db.collection('user').doc(user.uid).set({
            uid: user.uid,
            docId: user.uid,
            nickName: nickName,
            birthday: firebase.firestore.Timestamp.fromDate(birthdayTmp),
            job: job,
            school: school,
            biz: biz,
            gender: gender,
            pref: pref,
            educ: educ,
            highSchool: highSchool,
            college: college,
            regPurpose: regPurposeRef,
          })
        }
      })

      history.push({
        pathname: `${paths.root}`,
        state: {
          text: '新規登録しました',
          type: 'success'        
        }  
      })
    })
    .catch((error) => {
      setLoading(false);
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
    {loading && 
      <Dialog
        open={loading}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CircularProgress />
      </Dialog>
    }
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <Typography
            component='h1'
          >
            <p><b>新規登録</b></p>
            
          </Typography>

          <div>
            <Stepper 
              activeStep={activeStep}
              className={classes.stepper}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
            {activeStep === 0 &&
            <>
              <SignupForm 
                handleChange={handleChange}
                // clickLogupAsUser={clickLogupAsUser}
                handleBack={handleBack}
                handleNext={handleNext}
                handleClose={handleClose}
                loading={loading}
                setLoading={setLoading}
                email={email}
                password={password}
                passwordConfirm={passwordConfirm}
                agreeWithTerms={agreeWithTerms}
                setAgreeWithTerms={setAgreeWithTerms}
              />
            </>
            }
            {activeStep === 1 &&
            <>
              <ProfileForm 
                handleChange={handleChange}
                handleBack={handleBack}
                handleNext={handleNext}
                handleClose={handleClose}
                nickName={nickName}
                birthdayRef={birthdayRef}
                job={job}
                school={school}
                biz={biz}
                gender={gender}
                pref={pref}
                educ={educ}
                highSchool={highSchool}
                college={college}
                toGetMoney={toGetMoney}
                toUseTimer={toUseTimer}
                regPurposeRef={regPurposeRef}
                handleRegPurpose={handleRegPurpose}
              />
            </>
            }
            { activeStep === 2 &&
              <ConfirmForm 
                clickLogupAsUser={clickLogupAsUser}
                handleBack={handleBack}
                email={email}
                password={password}
                nickName={nickName}
                birthdayRef={birthdayRef}
                job={job}
                school={school}
                biz={biz}
                gender={gender}
                pref={pref}
                educ={educ}
                highSchool={highSchool}
                college={college}
                regPurposeRef={regPurposeRef}
              />
            }
            </div>
          </div>
          <Spacer />
          <Link
            onClick={() => history.push(`${paths.signin}`)} 
          >
            ログイン
          </Link>
          <Spacer />
        </Box>
      </AppLayout>
    </>
  )
}

export default Signup;