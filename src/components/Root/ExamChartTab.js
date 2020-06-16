import React, { useContext, useEffect, useState } from "react";
import StudyTimeBarChart from 'components/commons/charts/StudyTimeBarChart';
import { EventsContext } from 'hooks/Events';

const ExamChartTab = (props) => {
  const { events } = useContext(EventsContext);

  return (
    <>
      <h4>{props.examTarget && props.examTarget.examName}</h4>
      <StudyTimeBarChart events={events} />
    </>
  )
}

export default ExamChartTab;
