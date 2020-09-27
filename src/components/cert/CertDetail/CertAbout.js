import React, { useEffect } from "react";
import TakkenAbout from "./Takken/TakkenAbout";
import GyoseiAbout from "./Gyosei/GyoseiAbout";

const CertAbout = (props) => {

  return (
    <>
      {props.cert.url === 'takken' &&
        <TakkenAbout />
      }
      {props.cert.url === 'gyosei' &&
        <GyoseiAbout />
      }
    </>
  )
}

export default CertAbout;