import React from "react";
import Spacer from "components/commons/atoms/Spacer";
import TakkenSummary from "./Takken/TakkenSummary";

const CertSummary = (props) => {
  return (
    <>
      {/* {props.cert.url === 'takken' && */}
        <TakkenSummary cert={props.cert} />
      {/* } */}
    </>
  )
}

export default CertSummary;