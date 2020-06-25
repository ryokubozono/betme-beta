export const GetTimestamp = (date) => {
  let timestamp = ''
  let fullYear = date.substr(0, 4);
  let month = date.substr(5, 2);
  let day = date.substr(-2);
  timestamp = new Date(fullYear, month - 1, day);
  return timestamp
}