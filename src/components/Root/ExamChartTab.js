import React, { useContext, useEffect, useState } from "react";

const ExamChartTab = (props) => {
  return (
    <>
      <p>ExamChartTab</p>
      <p>{props.examTarget && props.examTarget.name}</p>
    </>
  )
}

export default ExamChartTab;
