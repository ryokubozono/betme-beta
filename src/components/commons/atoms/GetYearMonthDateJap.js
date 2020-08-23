import React from 'react';
// firestoreのtimestamp型を年月日表示するためのコンポーネント
const GetYearMonthDateJap = (props) => {
  return (
    <>
    {props.timestamp.toDate().getFullYear()+'年'}
    {props.timestamp.toDate().getMonth()+1+'月'}
    {props.timestamp.toDate().getDate()+'日'}
    </>
  )
}

export default GetYearMonthDateJap;
