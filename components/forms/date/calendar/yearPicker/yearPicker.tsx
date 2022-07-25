import { FC, useRef } from "react";

import styles from "./yearPicker.module.scss";

export const BEGIN_YEAR = 1960;
export const PAGINATION_YEAR = 20;

interface IProps {
  year: number;
  selYear: number;
  onUpdateDateYear: (year: number) => void;
}

export const YearPicker: FC<IProps> = ({ year, selYear, onUpdateDateYear }) => {
  // save prev year
  const prevYearRef = useRef<number>(selYear);
  const prevYear = prevYearRef.current;
  prevYearRef.current = selYear;

  const getSelectedYearClass = (year: number) => {
    if (year === selYear) return styles.year__selected;
    if (year === prevYear) return styles.year__picked;
    return styles.year__curr;
  };

  const page =
    (year - BEGIN_YEAR) % PAGINATION_YEAR !== 0
      ? ~~((year - BEGIN_YEAR) / PAGINATION_YEAR)
      : ~~((year - BEGIN_YEAR) / PAGINATION_YEAR) - 1;

  const firstYear = BEGIN_YEAR + page * PAGINATION_YEAR + 1;

  return (
    <div className={styles.yearPicker}>
      {[...Array(PAGINATION_YEAR).keys()].map((py) => {
        const year = firstYear + py;
        return (
          <span
            key={year}
            className={getSelectedYearClass(year)}
            onClick={() => onUpdateDateYear(year)}
            data-testid={year}
          >
            {year}
          </span>
        );
      })}
    </div>
  );
};
