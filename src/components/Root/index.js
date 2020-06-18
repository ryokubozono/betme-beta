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

const Root = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [examTarget, setExamTarget] = useState('')
  const location = useLocation();
  const { exams } = useContext(ExamsContext);
  const { user } = useContext(UserContext);
  const [frag, setFrag] = useState(false);

  useEffect(() => {
    if (exams) {
      if (exams && queryString.parse(location.search).examId) {
        let examRef = ExamFindFilter(exams, queryString.parse(location.search).examId)
        if (examRef) {
          setExamTarget(examRef);
        }
      } else {
        setExamTarget('');
      }
    }

  }, [exams, location.search])

  useEffect(() => {
    if (user.myExam && user.myExam.length) {
      setFrag(true)
    }
  }, [user.myExam])

  return (
    <>
      <AppLayout>
        {!currentUser &&
          <TopSlider />
        }
        {currentUser &&
          <>
            <TopBread />
            <MyItem
              examTarget={examTarget} 
              setExamTarget={setExamTarget} 
              frag={frag}
            />
            {frag && examTarget &&
              <ExamTabs 
                examTarget={examTarget} 
              />
            }

          </>
        }
        <SearchItem />
      </AppLayout>
    </>
  )
}

export default Root;