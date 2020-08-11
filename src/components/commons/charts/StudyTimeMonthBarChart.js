import React, { useEffect, useState, useContext } from "react";
import {
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from "hooks/Auth";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { GetDefaultDate } from 'components/commons/atoms/GetDefaultDate';
import { GetMonthStartToEnd } from "../atoms/GetMonthStartToEnd";
import { IconButton } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const StudyTimeMonthBarChart = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();
  const [weekSum, setWeekSum] = useState(0);
  const [sum, setSum] = useState(0);
  const [index, setIndex] = useState(0);

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
        sumRef += Number(event.studyTime);
      })
      setSum(sumRef / 60);

      let thisWeek = GetMonthStartToEnd(index);
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
          timeSum += Number(event.studyTime);
          weekSumRef += Number(event.studyTime);
        })
        dataRef.push({
          date: (date.getMonth()+1)+'/'+(date.getDate()),
          学習時間: timeSum / 60,
        })
      })
      setData(dataRef);
      setWeekSum(weekSumRef / 60);
    }
  }, [currentUser, location.search, props.events, index])

  return (
    <>
      <p>月間：{weekSum}時間</p>
      <IconButton
        onClick={() => setIndex(index - 1)}
      >
        <NavigateBeforeIcon 
          color='secondary'
        />
      </IconButton>
      <IconButton
        onClick={() => setIndex(0)}
      >
        <FiberManualRecordIcon 
          color='secondary'
        />
      </IconButton>
      <IconButton
        onClick={() => setIndex(index + 1)}
      >
        <NavigateNextIcon 
          color='secondary'
        />
      </IconButton>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart 
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit='時間' tick={{strokeWidth: 1}} />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="学習時間" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p>累計：{sum}時間</p>
    </>
  )
}

export default StudyTimeMonthBarChart;
