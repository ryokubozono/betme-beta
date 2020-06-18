import React, { useEffect, useContext, useState } from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ExamsContext } from "hooks/Exams";
import { ExamFindFilter } from 'components/commons/filters/ExamFindFilter';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const TopBread = (props) => {
  const { exams } = useContext(ExamsContext);
  const history = useHistory();
  const [exam, setExam] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (exams) {
      // if (exams && queryString.parse(location.search).examId) {
        let examRef = ExamFindFilter(exams, queryString.parse(location.search).examId)
        if (examRef) {
          setExam(examRef);
        } else {
          setExam('')
        }
      // }
    }
  }, [exams, location.search])

  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon 
          // fontSize="small" 
        />
      }
    >
      <Link
        color="inherit"
        onClick={() => history.push({
          pathname: `${paths.root}`,
        })}
      >
        <HomeIcon />
      </Link>
      <Link
        color="inherit" 
        onClick={() => history.push({
          pathName: `${paths.root}`,
          search: `examId=${exam.docId}`,
        })}
      >
        {exam.examName}
      </Link>
    </Breadcrumbs>
  )
}

export default TopBread;