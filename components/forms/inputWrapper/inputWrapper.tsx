/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { FC, RefObject } from "react";
import classnames from "classnames";
import { useFocus } from "@hooks/useFocus";

import styles from "./inputWrapper.module.scss";

export interface IInputInterface {
  forwardedRef: RefObject<HTMLInputElement>;
  isFocused: boolean;
}

export const withInputWrapper =
  (Comp: FC<IInputInterface>, legendStr: string, testId?: string): FC =>
  () => {
    const { ref, isFocused } = useFocus();
    console.info(Comp);
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
