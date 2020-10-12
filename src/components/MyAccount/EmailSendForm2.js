import React, {useContext, useEffect, useState } from "react";
import { Button, Box } from '@material-ui/core';
import firebase, { auth, db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';

const EmailSendForm2 = (props) => {
  
  let domain = document.domain;
  const actionCodeSettings = (domain === 'localhost')? 
  {
    url: `http://localhost:3000/myaccount`
  }:{
    url: `https://${domain}/myaccount`
  }
  const [email, setEmail] = useState('')
  const [emailVarified, setEmailVarified] = useState(true);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email)
        if (user.emailVerified) {
          setEmailVarified(true)
        } else {
          setEmailVarified(false)
        }
      } 
    })
  }, [])

  const sendValidEmail = () => {
    if (window.confirm('認証メールを送信しますか？')) {
      props.setLoading(true)
      auth.onAuthStateChanged(function(user) {
        if (user) {
          user.sendEmailVerification(actionCodeSettings)
          .then(()=>{
            props.setLoading(false)
            history.push({
              pathName: `${paths.root}`,
              search: `examId=${props.exam.docId}`,
              state: {
                text: `${user.email}宛に確認メールを送信しました`,
                type: 'success',
              }
            })
          })
          .catch((error)=>{
            props.setLoading(false)
            history.push({
              state: {
                pathName: `${paths.root}`,
                search: `examId=${props.exam.docId}`,
                text: `${user.email}宛に確認メールを送信できませんでした。, ${error}`,
                type: 'error'
              }
            })
          });
        }
      })
    }
  }


  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <p>メール認証: <b>{ emailVarified ? ('完了'):('未完了') }</b></p>
        {!emailVarified &&
          <Button
            color='primary'
            variant='outlined'
            onClick={sendValidEmail}
          >
            認証メールを送信する
          </Button>
        }
      </Box>
    </>
  )
}

export default EmailSendForm2;
