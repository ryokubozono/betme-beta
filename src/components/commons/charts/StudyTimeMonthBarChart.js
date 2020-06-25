import React, { useEffect, useState, useContext } from "react";
import {
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { AuthContext } from "hooks/Auth";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { GetDefaultDate } from 'components/commons/atoms/GetDefaultDate';
import { GetMonthStartToEnd } from "../atoms/GetMonthStartToEnd";

const StudyTimeMonthBarChart = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();
  const [weekSum, setWeekSum] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (props.events) {
      // all events
      let eventRef = props.events;
      // filtered by currentUser & examId
      eventRef = eventRef.filter(row => {
        if (
          row.userId === currentUser.uid && 
          queryString.parse(location.search).examId === row.examId
          ) {
          return row;
        }
      })
      
      let sumRef = 0;
      eventRef.forEach(event=> {
        sumRef += event.studyTime;
      })
      setSum(sumRef);

      let thisWeek = GetMonthStartToEnd();
      let dataRef = [];
      let weekSumRef = 0;
      thisWeek.forEach(date => {
        let dateRef = GetDefaultDate(date);
        let eventTmp = eventRef
        // filtered by the date
        eventTmp = eventTmp.filter(row => {
          let rowRef = GetDefaultDate(row.studyDate.toDate());
          if (String(dateRef) === String(rowRef)) {
            return row;
          } else {
            return false;
          }
        })
        let timeSum = 0;
        eventTmp.forEach(event => {
          timeSum += event.studyTime;
          weekSumRef += event.studyTime;
        })
        dataRef.push({
          date: (date.getMonth()+1)+'/'+(date.getDate()),
          studyTime: timeSum,
        })
      })
      setData(dataRef);
      setWeekSum(weekSumRef);
    }
  }, [currentUser, location.search, props.events])

  return (
    <>
      <BarChart 
        width={230} 
        height={250} 
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="studyTime" fill="#8884d8" />
      </BarChart>
      <p>今月の合計勉強時間：{weekSum}分</p>
      <p>累計の勉強時間：{sum}分</p>
    </>
  )
}

export default StudyTimeMonthBarChart;
