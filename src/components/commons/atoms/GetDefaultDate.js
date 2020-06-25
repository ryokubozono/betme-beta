export const GetDefaultDate = (date) => {
  let defaultDate = ''
  let month = ''
  let monthRef = date.getMonth() + 1
  let dateRef = date.getDate()
  if (Number(monthRef) < 10) {
    month = '0' + monthRef;
  } else {
    month = monthRef;
  }
  if (Number(dateRef) < 10) {
    dateRef = '0' + dateRef;
  }
  defaultDate = date.getFullYear() + '-' + (month) + '-' +(dateRef)  
  return defaultDate
}