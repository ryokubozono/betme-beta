import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";

const CertAboutStudy = (props) => {

  const [frag, setFrag] = useState('')

  useEffect(() => {
    if (props.cert.aboutStudy && props.cert.aboutStudy.length) {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [props.cert])
  return (
    <>
      {frag && 
        <>
          {props.cert.aboutStudy.map(item => (
            <>
              <Typography variant="subtitle1" display="block" gutterBottom color='primary'>
                {item.title}
              </Typography>
              <Box p={1} m={0}>
                {item.body}
              </Box>
            </>
          ))}
        </>
      }
    </>
  )
}

export default CertAboutStudy;