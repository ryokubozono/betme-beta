import React, { useEffect } from "react";
import TakkenAbout from "./Takken/TakkenAbout";

const CertAbout = (props) => {

  return (
    <>
      {props.cert.url === 'takken' &&
        <TakkenAbout />
      }
    </>
  )
}

export default CertAbout;