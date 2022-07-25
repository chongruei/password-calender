import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { Validator } from "./validator/validator";
import {
  IInputInterface,
  withInputWrapper,
} from "../inputWrapper/inputWrapper";

import styles from "./password.module.scss";

const Password_View: FC<IInputInterface> = ({ forwardedRef, isFocused }) => {
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
    <>
      <input
        ref={forwardedRef}
        data-testid="password-input"
        type="text"
        className={styles.input}
        placeholder="Password"
        onChange={handleChangePassword}
      ></input>
      {isFocused && <Validator password={pw} />}
    </>
  );
};

export const Password = withInputWrapper(Password_View, "Password", "password");
