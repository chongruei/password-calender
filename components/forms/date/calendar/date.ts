export const MONTH_NAMES: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK_NAMES: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const getDays = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};
