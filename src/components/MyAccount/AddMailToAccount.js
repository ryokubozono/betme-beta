import React, { useState, useContext, useEffect } from "react";
import firebase, { auth } from "FirebaseConfig";
import AppLayout from 'components/commons/layout/AppLayout';
import { Button, Box } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "hooks/Auth";

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

const AddMailToAccount = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };
  const handleMail = () => {
    let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    firebase.auth().currentUser.linkWithCredential(credential).then(function(usercred) {
      let user = usercred.user;
      console.log("Account linking success", user);
      history.push({
        pathname: `${paths.myaccount}`,
        state: {
          text: 'アカウントにメールアドレスを追加しました。',
          type: 'success'
        }
      })
    }, function(error) {
      history.go(0)
      history.push({
        state: {
          text: `Account linking error, ${error}`,
          type: 'error'
        }
      })
      console.log("Account linking error", error);
    });
  }

  useEffect(() => {
    if (currentUser) {
      currentUser.providerData.forEach(row => {
        switch (row.providerId) {
          case 'password':
            history.push(`${paths.myaccount}`)
            break;
          default:
            console.log('key not found')
        }
      })
    }
  }, [currentUser, history])

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>

        <p>Add Mail to Account</p>

        <ValidatorForm
          useRef="form"
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label='Email'
            id="email"
            name='email'
            color='primary'
            fullWidth
            margin="normal"
            value={email} 
            onChange={handleChange} 
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          <TextValidator
            label='Password'
            id="password"
            name='password'
            type="password"
            color='primary'
            fullWidth
            margin="normal"
            value={password} 
            onChange={handleChange} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </ValidatorForm>
        <div className={classes.alignCenter}>
          <MailButton
            onClick={handleMail}
            variant="contained"
          >
            メールアドレスを追加
          </MailButton>
        </div>

        </Box>

      </AppLayout>
    
    </>
  )
}

export default AddMailToAccount;
