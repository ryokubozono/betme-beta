import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from 'hooks/User';
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { AuthContext } from "hooks/Auth";
import { Button } from '@material-ui/core';
import Spacer from '../atoms/Spacer';

const AdminGate = (props) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [frag, setFrag] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.admin) {
        setFrag(true)
      } else {
        setFrag(false)
      }
    }
  }, [user])

  return (
    <>
      {frag? (
        <>
          {props.children}        
        </>
      ):(
        <>
          {currentUser? (
            <>
              <p>権限エラー</p>
              <Button
                variant="contained"
                onClick={() => history.push(`${paths.root}`)}
              >
                HOME
              </Button>
            </>
          ):(
            <>
              <p>サインインしてください</p>
              <Button
                variant="contained"
                onClick={() => history.push(`${paths.signin}`)}
              >
                Sign In
              </Button>
            </>
          )

          }

        </>
      )}
    </>
  )
}

export default AdminGate;
