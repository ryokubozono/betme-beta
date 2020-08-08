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
import { CertsContext } from "hooks/Certs";
import { CertFindFilter } from "components/commons/filters/CertFindFilter";

const TopBread = (props) => {
  const { exams } = useContext(ExamsContext);
  const history = useHistory();
  const [exam, setExam] = useState('');
  const location = useLocation();
  const [cert, setCert] = useState('');
  const { certs } = useContext(CertsContext); 

  useEffect(() => {
    if (exams) {
      // if (exams && queryString.parse(location.search).examId) {
        let examRef = ExamFindFilter(exams, queryString.parse(location.search).examId)
        if (examRef) {
          setExam(examRef);
          if (certs) {
            let certRef = CertFindFilter(certs, examRef.certId);
            if (certRef) {
              setCert(certRef);
            }            
          } 
        } else {
          setExam('')
          setCert('')
        }
      // }

    }
  }, [certs, exams, location.search])

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
      {cert && exam && 
         <Link
          color="inherit" 
          onClick={() => history.push({
            pathName: `${paths.root}`,
            search: `examId=${exam.docId}`,
          })}
        >
          {cert.name}({exam.examName})
        </Link>
      }
    </Breadcrumbs>
  )
}

export default TopBread;