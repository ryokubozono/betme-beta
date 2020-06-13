import React from 'react';
// firestoreのtimestamp型を年月日表示するためのコンポーネント
const GetYearMonthDate = (props) => {
  return (
    <>
    {props.timestamp.toDate().getFullYear()+'/'}
    {props.timestamp.toDate().getMonth()+1+'/'}
    {props.timestamp.toDate().getDate()}
    </>
  )
}

export default GetYearMonthDate;
