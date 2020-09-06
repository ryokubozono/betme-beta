import React, {useContext, useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import AppLayout from "components/commons/layout/AppLayout";
import { Dialog, CircularProgress, Box, Typography } from "@material-ui/core";
import {auth, db} from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';


const firebase = require("firebase");
require("firebase/functions");

const ContactPage = (props) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const handleClose = () => {
    setLoading(false);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'subject':
        setSubject(event.target.value);
        break;
      case 'content':
        setContent(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  }

  useEffect(() => {
    ReactGA.initialize('UA-175878570-1')
    // console.log(ReactGA)
  }, [])

  const submitContact = () => {
    setLoading(true)
    let today = new Date(Date.now())
    let data = {}
    data.email = email
    data.subject = subject
    data.content = content
    data.sentAt = firebase.firestore.Timestamp.fromDate(today)
    let sendMail = firebase.functions().httpsCallable('sendMail')
    sendMail(data)
    .then(() =>{
      ReactGA.event({
        category: 'contact',
        action: 'submit',
        nonInteraction: false
      })
      // ReactGA.ga('send', {
      //   hitType: 'event',
      //   eventCategory: 'contact',
      //   eventAction: 'submit',
      // })
      // console.log(ReactGA)
      // .catch((error) => {
      //   setLoading(false)
      //   history.push({
      //     state: {
      //       text: error.message,
      //       type: 'error'        
      //     }
      //   });
      // })
      setLoading(false)
      history.push({
        state: {
          text: 'お問い合わせを送信しました',
          type: 'success',
        }
      })
    })
    .catch((error) => {
      setLoading(false)
      history.push({
        state: {
          text: error.message,
          type: 'error'        
        }
      });
    })
  }

  return(
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
        <Typography
          component='h1'
        >
          <p>
            <b>
              お問い合わせ
            </b>
          </p>
        </Typography>
        <section>
          <Box bgcolor='white' p={2} m={0}>
            <ContactForm
              handleChange={handleChange}
              submitContact={submitContact}
              email={email}
              subject={subject}
              content={content}
            />
          </Box>
        </section>
      </AppLayout>
    </>
  )
}

export default ContactPage;