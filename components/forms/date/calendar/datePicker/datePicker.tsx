import { Dispatch, FC, MouseEventHandler, SetStateAction, useRef } from "react";
import { getDays, WEEK_NAMES } from "../date";

import styles from "./datePicker.module.scss";

const TOTAL_DAYS = 42;

interface IProps {
  year: number;
  month: number;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const DatePicker: FC<IProps> = ({ year, month, date, setDate }) => {
  // save prev date
  const prevDateRef = useRef<Date>(date);
  const prevDate = prevDateRef.current;
  prevDateRef.current = date;

  const selYear = date.getFullYear();
  const selMonth = date.getMonth() + 1;
  const currMonthDays = getDays(year, month);
  const prevMonthDays = getDays(year, month - 1);

  const currMonthDate = new Date(`${year}/${month}/1`);
  const firstWeekDay = currMonthDate.getDay();

  const getSelectedDateClass = (day: number) => {
    if (day === date.getDate() && month === selMonth && year === selYear) {
      return styles.day__selected;
    }

    if (
      day === prevDate.getDate() &&
      month === prevDate.getMonth() + 1 &&
      year === prevDate.getFullYear()
    ) {
      return styles.day__picked;
    }

    return styles.day__curr;
  };

  const handlePickDate: MouseEventHandler<HTMLButtonElement> = (e) => {
    const pickDays = e.currentTarget.value;
    setDate(new Date(`${year}/${month}/${pickDays}`));
  };

  return (
    <div className={styles.datePicker}>
      <>
        {WEEK_NAMES.map((w) => (
          <span key={w} className={styles.day__header}>
            {w}
          </span>
        ))}
      </>
      {/* previous month */}
      <>
        {[...Array(firstWeekDay).keys()].map((day) => (
          <span key={day} className={styles.day}>
            {prevMonthDays - firstWeekDay + day + 1}
          </span>
        ))}
      </>

      {/* current month */}
      <>
        {[...Array(currMonthDays).keys()].map((day) => (
          <button
            date-testid={`${month}-${day + 1}`}
            key={day}
            value={day + 1}
            onClick={handlePickDate}
            className={getSelectedDateClass(day + 1)}
          >
            {day + 1}
          </button>
        ))}
      </>

      {/* next month */}
      <>
        {[...Array(TOTAL_DAYS - (firstWeekDay + currMonthDays)).keys()].map(
          (day) => (
            <span key={day} className={styles.day}>
              {day + 1}
            </span>
          )
        )}
      </>
    </div>
  );
};
