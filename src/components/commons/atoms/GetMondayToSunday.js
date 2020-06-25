export const GetMondayToSunday = () => {
  let today = new Date();
  let this_year = today.getFullYear();
  let this_month = today.getMonth();
  let date = today.getDate();
  let day_num = today.getDay();
  let this_monday = date - day_num + 1;

  let thisWeek = [];
  for (let i=0; i<7; i++) {
    thisWeek.push(
      new Date(this_year, this_month, this_monday+i)
    )
  }

  return thisWeek
}