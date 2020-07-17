import React, {useContext, useEffect, useState } from "react";
import firebase, { auth } from "FirebaseConfig";
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
          <BasicForm />
        </Box>
        
        <Box bgcolor='white' p={2} m={0}>
          <p>プロフィール</p>
          <AccountForm />
        </Box>

      </AppLayout>
    </>
  )
}

export default MyAccount;
