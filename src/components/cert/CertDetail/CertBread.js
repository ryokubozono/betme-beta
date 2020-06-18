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
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';

const CertBread = (props) => {
  const { certs } = useContext(CertsContext); 
  const history = useHistory();
  const [cert, setCert] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      let certRef = CertFindFilter(certs, location.pathname.substr(-20))
      if (certRef) {
        setCert(certRef)
      }
    } else {
      console.log('no iud')
    }
  }, [certs, location.pathname])

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
          pathName: `/cert/detail/${cert.name}`,
        })}
      >
        {cert.name}
      </Link>
    </Breadcrumbs>
  )
}

export default CertBread;