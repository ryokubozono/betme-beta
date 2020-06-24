import React, { useState, useEffect } from "react";
import { Typography, Box } from "@material-ui/core";

const CertAfterPass = (props) => {
  const [frag, setFrag] = useState('')

  useEffect(() => {
    if (props.cert.afterPass && props.cert.afterPass.length) {
      setFrag(true)
    } else {
      setFrag(false)
    }
  }, [props.cert])

  return (
    <>
      {frag && 
        <>
          {props.cert.afterPass.map(item => (
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

export default CertAfterPass;