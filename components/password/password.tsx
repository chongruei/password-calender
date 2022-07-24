import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { useFocus } from "@hooks/useFocus";
import { Validator } from "./validator/validator";

import styles from "./password.module.scss";
import classnames from "classnames";

export const Password: FC = () => {
  const { ref, isFocused } = useFocus();
  const [pw, setPw] = useState<string>("");

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newPw = e.currentTarget.value;
    setPw((prevPw) => {
      if (prevPw.length > newPw.length) {
        return prevPw.substring(0, newPw.length);
      }

      return prevPw + newPw[newPw.length - 1];
    });

    e.currentTarget.value = newPw.replace(/[\s\S]/g, "*");
  };

  return (
    <fieldset
      data-testid="password"
      className={classnames(styles.password, {
        [styles.password_focused]: isFocused,
      })}
    >
      <legend className={styles.legend}>Password</legend>
      <input
        data-testid="password-input"
        ref={ref}
        type="text"
        className={styles.input}
        placeholder="Password"
        onChange={handleChangePassword}
      ></input>
      {isFocused && <Validator password={pw} />}
    </fieldset>
  );
};
