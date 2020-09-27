import React from "react";
import Spacer from "components/commons/atoms/Spacer";
import TakkenSummary from "./Takken/TakkenSummary";
import GyoseiSummary from "./Gyosei/GyoseiSummary";

const CertSummary = (props) => {
  return (
    <>
      {props.cert.url === 'takken' &&
        <TakkenSummary cert={props.cert} />
      }
      {props.cert.url === 'gyosei' &&
        <GyoseiSummary cert={props.cert} />
      }
    </>
  )
}

export default CertSummary;