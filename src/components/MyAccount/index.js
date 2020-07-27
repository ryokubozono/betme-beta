import React, {useContext, useEffect, useState } from "react";
import firebase, { auth, db } from "FirebaseConfig";
import AppLayout from 'components/commons/layout/AppLayout';
import { Button, Box } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Twitter from '@material-ui/icons/Twitter';
import { AuthContext } from "hooks/Auth";
import AccountForm from "components/MyAccount/AccountForm";
import BasicForm from 'components/MyAccount/BasicForm';
import ProfileForm from 'components/Signup/ProfileForm';
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import { UsersContext } from "hooks/Users";
import { GetDefaultDate } from "components/commons/atoms/GetDefaultDate";
import { GetTimestamp } from 'components/commons/atoms/GetTimestamp';

const TwitterButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: '#55ACEE',
    '&:hover': {
      backgroundColor: '#55ACEE',
    },
    width: '18em',
    margin: '0.5em',
  },
}))(Button);

const MailButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#DB4437'),
    backgroundColor: '#DB4437',
    '&:hover': {
      backgroundColor: '#DB4437',
    },
    width: '15em',
    margin: '0.5em',
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  alignCenter: {
    textAlign: 'center',
  }
}))

const MyAccount = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [twitter, setTwitter] = useState(false)
  const [mailPassword, setMailPassword] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
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
  const [user, setUser] = useState('');
  const { users } = useContext(UsersContext);

  let provider = new firebase.auth.TwitterAuthProvider();

  const handleTwitter = () => {
    auth.currentUser.linkWithRedirect(provider)
    .then(() => {
      history.go(0)
      history.push({
        state: {
          text: 'Twitterアカウントを追加しました。',
          type: 'success'
        }
      })
    })
    .catch((error) => {
      history.go(0)
      history.push({
        state: {
          text: `Account linking error, ${error}`,
          type: 'error'
        }
      })
    })
  }

  useEffect(() => {
    if (currentUser) {
      currentUser.providerData.forEach(row => {
        switch (row.providerId) {
          case 'twitter.com':
            setTwitter(true);
            break;
          case 'password':
            setMailPassword(true);
            break;
          default:
            console.log('key not found')
        }
      })
    } else {
      history.push(`${paths.signin}`)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid)
      if (userRef) {
        setUser(userRef)
        setNickName(userRef.nickName);
        setBirthdayRef(userRef.birthdayRef);
        setJob(userRef.job);
        setSchool(userRef.school);
        setBiz(userRef.biz);
        setGender(userRef.gender);
        setPref(userRef.pref);
        setEduc(userRef.educ);
        setHighSchool(userRef.highSchool);
        setCollege(userRef.college);
        setRegPurposeRef(userRef.regPurpose)
        setFirstName(userRef.firstName);
        setLastName(userRef.lastName);
        setAddress(userRef.address);
        setTel(userRef.tel);
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (user) {
      if (user.birthday) {
        console.log(user.birthday)
        let birthdayRef = GetDefaultDate(user.birthday.toDate())
        setBirthdayRef(birthdayRef)
      }
    }
  }, [user])

  const handleChange = (event) => {
    switch (event.target.name) {
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
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'address':
        setAddress(event.target.value);
        break;
      case 'tel':
        setTel(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const removeFromArray = (item) => {
    const index = regPurposeRef.indexOf(String(item))
    if (index  !== -1) {
      regPurposeRef.splice(index, 1)
    } 
  }

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

  const handleNext = () => {

    let time = firebase.firestore.Timestamp.fromDate(GetTimestamp(birthdayRef));

      if (currentUser) {
        db.collection('user').doc(currentUser.uid).set({
          nickName: nickName,
          birthday: time,
          job: job,
          school: school,
          biz: biz,
          gender: gender,
          pref: pref,
          educ: educ,
          highSchool: highSchool,
          college: college,
          regPurpose: regPurposeRef,
        }, {merge: true})
        .then(() => {
          history.push({
            state: {
              text: 'プロフィールを保存しました。',
              type: 'success',
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

  }

  const submitBasic = () => {
    if (user) {
      db.collection('user').doc(user.docId).set({
        firstName: firstName,
        lastName: lastName,
        address: address,
        tel: tel,
      }, {merge: true})
      .then(() => {
        history.push({
          state: {
            text: '基本情報を保存しました。',
            type: 'success',
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
  }

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <p>認証</p>
          <div className={classes.alignCenter}>
            
            { !twitter &&
              <TwitterButton
                onClick={handleTwitter}
                variant="contained"
              >
                <Twitter />
                Twitterアカウントを追加
              </TwitterButton>
            }

            { twitter && 
              <p>Twitterアカウント連携済み(アカウント名を表示させる)</p>
            }

            {/* { !mailPassword &&
              <MailButton
                onClick={() => history.push(`${paths.addmailtoaccount}`)}
                variant="contained"
              >
                メールアドレスを追加
              </MailButton>
            }

            { mailPassword &&
              <p>メールアドレス登録済み(メールアドレスを表示させる)</p>
            } */}

          </div>
        </Box>

        <Box bgcolor='white' p={2} m={0}>
          <p>基本情報</p>
          <BasicForm
            firstName={firstName}
            lastName={lastName}
            address={address}
            tel={tel}
            handleChange={handleChange}
            submitBasic={submitBasic}
            formType='myAccount'
          />
        </Box>
        
        <Box bgcolor='white' p={2} m={0}>
          <p>プロフィール</p>
          <ProfileForm 
            handleChange={handleChange}
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
            formType='myAccount'
            handleNext={handleNext}
          />
        </Box>

      </AppLayout>
    </>
  )
}

export default MyAccount;
