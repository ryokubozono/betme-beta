export const GetMonthStartToEnd = (index) => {
  let today = new Date();
  let this_year = today.getFullYear();
  let this_month = today.getMonth() + index;
  let last_day = new Date(this_year, this_month + 1, 0).getDate();

  let thisMonth = [];
  for (let i=0; i<last_day; i++) {
    thisMonth.push(
      new Date(this_year, this_month, 1 + i)
    )
  }

  return thisMonth
}