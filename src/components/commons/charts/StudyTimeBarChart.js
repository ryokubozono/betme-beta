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

const StudyTimeBarChart = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (props.events) {
      let eventRef = props.events;
      console.log(eventRef)
      eventRef = eventRef.filter(row => {
        if (
          row.userId === currentUser.uid && 
          queryString.parse(location.search).examId === row.examId
          ) {
          return row;
        }
      })
      let dataRef = [];
      eventRef.forEach(event => {
        let monthDate = event.studyDate.toDate().getMonth() + '-' + event.studyDate.toDate().getDate()
        dataRef.push({
          studyTime: event.studyTime,
          date: monthDate,
        })
      })
      console.log(dataRef)
      setData(dataRef)
    }
  }, [currentUser, location.search, props.events])

  return (
    <>
      <BarChart 
        width={200} 
        height={250} 
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="studyTime" fill="#8884d8" />
      </BarChart>
    </>
  )
}

export default StudyTimeBarChart;
