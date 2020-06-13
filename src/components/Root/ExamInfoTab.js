import React, { useContext, useEffect, useState } from "react";

const ExamInfoTab = (props) => {
  return (
    <>
      <p>ExamInfoTab</p>
      <p>{props.examTarget && props.examTarget.name}</p>
    </>
  )
}

export default ExamInfoTab;
