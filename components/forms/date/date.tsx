import { FC, useState } from "react";
import { Calendar } from "./calendar/calendar";
import { IInputWrapper, withInputWrapper } from "../inputWrapper/inputWrapper";

import styles from "./date.module.scss";

const DateInput_View: FC<IInputWrapper> = ({ forwardedRef }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleConfirm = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.toString().padStart(2, "0");
    const dd = `${date.getDate()}`.toString().padStart(2, "0");
    const input = forwardedRef.current;
    input!.value = `${dd}/${mm}/${yyyy}`;
    setShowCalendar(false);
    setDate(new Date(`${yyyy}-${mm}-${dd}`));
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  const handleFocus = () => {
    setShowCalendar(true);
  };

  const handleBlur = () => {
    setShowCalendar(true);
  };

  return (
    <>
      <input
        ref={forwardedRef}
        readOnly
        data-testid="date-input"
        type="text"
        className={styles.input}
        placeholder="mm/dd/yyyy"
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>
      {showCalendar && (
        <Calendar
          date={date}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export const DateInput = withInputWrapper(DateInput_View);
