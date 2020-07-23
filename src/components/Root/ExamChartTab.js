import React, { useContext, useEffect, useState } from "react";
import StudyTimeBarChart from 'components/commons/charts/StudyTimeBarChart';
import StudyTimeMonthBarChart from 'components/commons/charts/StudyTimeMonthBarChart';
import { EventsContext } from 'hooks/Events';

const ExamChartTab = (props) => {
  const { events } = useContext(EventsContext);

  return (
    <>
      {/* <h4>{props.examTarget && props.examTarget.examName}</h4> */}
      <StudyTimeBarChart events={events} />
      <StudyTimeMonthBarChart events={events} />
    </>
  )
}

export default ExamChartTab;
