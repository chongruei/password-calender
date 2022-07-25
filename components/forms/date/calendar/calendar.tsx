import { FC, MouseEventHandler, useState } from "react";
import { MONTH_NAMES } from "./date";
import { DatePicker } from "./datePicker/datePicker";
import { BEGIN_YEAR, YearPicker } from "./yearPicker/yearPicker";
import { TimeSilder, SilderMode } from "./timeSilder/timeSilder";

import styles from "./calendar.module.scss";

interface IProps {
  date?: Date;
  onCancel: () => void;
  onConfirm: (newDate: Date) => void;
}

export const Calendar: FC<IProps> = ({
  date = new Date(),
  onCancel,
  onConfirm,
}) => {
  const [dateVal, setDate] = useState<Date>(date);
  const [silderMode, setSilderMode] = useState<SilderMode>(SilderMode.Month);
  const [pickDate, setPickDate] = useState<Date>(dateVal);

  const handleUpdateYear = (year: number) => {
    if (year < BEGIN_YEAR + 1) return;
    const newDateVal = new Date(dateVal);
    const newPickDateVal = new Date(pickDate);
    newDateVal.setFullYear(year);
    newPickDateVal.setFullYear(year);
    setDate(newDateVal);
    setPickDate(newPickDateVal);
  };

  const handleChangeMode: MouseEventHandler = () => {
    setSilderMode((prevMode) => {
      if (prevMode === SilderMode.Month) {
        return SilderMode.Year;
      }

      return SilderMode.Month;
    });
  };

  const handleSubTime: MouseEventHandler<SVGElement> = () => {
    if (silderMode === SilderMode.Month) {
      const d = new Date(pickDate);
      d.setMonth(pickDate.getMonth() - 1);
      setPickDate(d);
    } else {
      const newYear = pickDate.getFullYear() - 1;
      handleUpdateYear(newYear);
    }
  };

  const handleAddTime: MouseEventHandler<SVGElement> = () => {
    if (silderMode === SilderMode.Month) {
      const d = new Date(pickDate);
      d.setMonth(pickDate.getMonth() + 1);
      setPickDate(d);
    } else {
      const newYear = pickDate.getFullYear() + 1;
      handleUpdateYear(newYear);
    }
  };

  const month = pickDate.getMonth();
  const year = pickDate.getFullYear();
  const monthName = MONTH_NAMES[month];

  return (
    <div data-testid="calendar" className={styles.calendar}>
      <span className={styles.calendar__header}>Text</span>
      <span className={styles.calendar__title}>
        {`${monthName.substring(0, 3)}, ${year}`}
      </span>
      <TimeSilder onAddTime={handleAddTime} onSubTime={handleSubTime}>
        <div className={styles.calendar__silder} onClick={handleChangeMode}>
          {silderMode === SilderMode.Month ? `${monthName} ${year}` : `${year}`}
        </div>
      </TimeSilder>
      {silderMode === SilderMode.Month ? (
        <DatePicker
          year={year}
          month={month + 1}
          date={dateVal}
          setDate={setDate}
        />
      ) : (
        <YearPicker
          year={year}
          selYear={dateVal.getFullYear()}
          onUpdateDateYear={handleUpdateYear}
        />
      )}
      {/* footer */}
      <div className={styles.calendar__footer}>
        <div />
        <button
          date-testid="cancel"
          className={styles.calendar__footer__cancel}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          data-testid="calendar-confirm"
          className={styles.calendar__footer__ok}
          onClick={() => onConfirm(dateVal)}
        >
          OK
        </button>
      </div>
    </div>
  );
};
