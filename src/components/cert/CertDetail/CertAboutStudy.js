import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import TakkenStudy from "./Takken/TakkenStudy";
import GyoseiStudy from "./Gyosei/GyoseiStudy";

const CertAboutStudy = (props) => {

  return (
    <>
      {props.cert.url === 'takken' &&
        <TakkenStudy cert={props.cert} />
      }
      {props.cert.url === 'gyosei' &&
        <GyoseiStudy cert={props.cert} />
      }
    </>
  )
}

export default CertAboutStudy;