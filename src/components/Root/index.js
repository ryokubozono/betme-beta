import React, { useContext, useState, useEffect } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import TopSlider from 'components/Root/TopSlider';
import SearchItem from 'components/Root/SearchItem';
import TopBread from 'components/Root/TopBread';
import MyItem from 'components/Root/MyItem';
import { AuthContext } from "hooks/Auth";
import ExamTabs from './ExamTabs';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import { ExamsContext } from "hooks/Exams";
import { UserContext } from 'hooks/User';
import WhatIsBetMe from './WhatIsBetMe';
import Spacer from 'components/commons/atoms/Spacer';
import WhatIsBetMeChallenge from './WhatIsBetMeChallenge';
import { UsersContext } from 'hooks/Users';
import { UserFindFilter } from 'components/commons/filters/UserFindFilter';
import { useHistory } from 'react-router-dom';
import { CertsContext } from "hooks/Certs";
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import { Dialog, CircularProgress } from '@material-ui/core';

const Root = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [examTarget, setExamTarget] = useState('')
  const [event, setEvent] = useState('');
  const location = useLocation();
  const { exams } = useContext(ExamsContext);
  const { users } = useContext(UsersContext);
  const { user } = useContext(UserContext);
  const [frag, setFrag] = useState(false);
  const [ whatIsBetMeChallenge, setWhatIsBetMeChallenge ] = useState(false);
  const [editFrag, setEditFrag] = useState(false);
  const [value, setValue] = useState(0);
  const history = useHistory();
  const [cert, setCert] = useState('');
  const { certs } = useContext(CertsContext); 
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (exams && users && currentUser) {
      let userRef = UserFindFilter(users, currentUser.uid);
      if (exams && userRef
        && queryString.parse(location.search).examId 
        && userRef.myExam
        && userRef.myExam.indexOf(queryString.parse(location.search).examId) !== -1
      ) {
        let examRef = ExamFindFilter(exams, queryString.parse(location.search).examId)
        if (examRef) {
          setExamTarget(examRef);
          let certRef = CertFindFilter(certs, examRef.certId);
          if (certRef) {
            setCert(certRef);
          }
        }

      } else {
        setExamTarget('');
      }
    }
  }, [exams, location.search, user])

  useEffect(() => {
    if (user.myExam && user.myExam.length) {
      setFrag(true)
    }
  }, [user.myExam])

  const handleBack = () => {
    setWhatIsBetMeChallenge(false)
  }

  const handlePaypal = () => {
    history.push(`/paypal/${examTarget.docId}`);
  }

  const handleClose = () => {
    setLoading(false);
  };


  return (
    <>
      <AppLayout
        setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
      >
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

        {!currentUser &&
          <>
            <TopSlider />
            {!whatIsBetMeChallenge &&
              <WhatIsBetMe 
                setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
              />
            }
            {whatIsBetMeChallenge &&
              <WhatIsBetMeChallenge 
                setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
                handleBack={handleBack}
              />
            }
            <Spacer />
          </>
        }

        {currentUser &&
          <>
            <TopBread />
            <MyItem
              examTarget={examTarget} 
              setExamTarget={setExamTarget} 
              setEvent={setEvent}
              frag={frag}
              setEditFrag={setEditFrag}
              setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
            />
            {whatIsBetMeChallenge ? (
              <WhatIsBetMeChallenge 
                setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
                handleBack={handleBack}
                handlePaypal={handlePaypal}
                examTarget={examTarget}
                cert={cert}
                setLoading={setLoading}
                handleClose={handleClose}
              />
            ):(
              <>
                {frag && examTarget &&
                  <ExamTabs 
                    examTarget={examTarget} 
                    cert={cert}
                    setEvent={setEvent}
                    event={event}
                    setEditFrag={setEditFrag}
                    editFrag={editFrag}
                    value={value}
                    setValue={setValue}
                    setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
                  />
                }
              </>
            )}
          </>
        }

        {!examTarget &&
          <>
            <SearchItem />
          </>
        }
      </AppLayout>
    </>
  )
}

export default Root;