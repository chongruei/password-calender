/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { FC, RefObject } from "react";
import classnames from "classnames";
import { useFocus } from "@hooks/useFocus";

import styles from "./inputWrapper.module.scss";

export interface IInputProps {
  legendStr: string;
  testId?: string;
}

export interface IInputWrapper {
  forwardedRef: RefObject<HTMLInputElement>;
  isFocused: boolean;
}

export const withInputWrapper =
  (Comp: FC<IInputWrapper>): FC<IInputProps> =>
  ({ legendStr, testId }) => {
    const { ref, isFocused } = useFocus();
    return (
      <fieldset
        data-testid={testId}
        className={classnames(styles.input, {
          [styles.input__focused]: isFocused,
        })}
      >
        <legend className={styles.legend}>{legendStr}</legend>
        <Comp forwardedRef={ref} isFocused={isFocused} />
      </fieldset>
    );
  };
