import React, { useContext, useEffect, useState } from "react";

const ExamTimerTab = (props) => {
  return (
    <>
      <p>ExamTimerTab</p>
      <p>{props.examTarget && props.examTarget.name}</p>
    </>
  )
}

export default ExamTimerTab;
