export const GetDefaultDate = (date) => {
  let defaultDate = ''
  let month = ''
  let monthRef = date.getMonth() + 1
  if (Number(monthRef) < 10) {
    month = '0' + monthRef;
  } else {
    month = monthRef;
  }
  defaultDate = date.getFullYear() + '-' + (month) + '-' + date.getDate()  
  return defaultDate
}