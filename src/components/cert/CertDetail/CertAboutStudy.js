import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import TakkenStudy from "./Takken/TakkenStudy";

const CertAboutStudy = (props) => {

  return (
    <>
      {/* {props.cert.url === 'takken' && */}
        <TakkenStudy cert={props.cert} />
      {/* } */}
    </>
  )
}

export default CertAboutStudy;