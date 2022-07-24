import { Tick } from "@components/icons/tick";
import { FC, Fragment } from "react";

import styles from "./validator.module.scss";

type TValidtor = {
  name: string;
  reg: RegExp;
};

const PasswordValidtorRecord: Record<string, TValidtor> = {
  UpperCase: {
    name: "Have at least one uppercase letter",
    reg: /(?=.*[A-Z])/gm,
  },
  LowerCase: {
    name: "Have at least one lowercase letter",
    reg: /(?=.*[a-z])/gm,
  },

  Number: {
    name: "Have at least one number",
    reg: /(?=.*[0-9])/gm,
  },
  Special: {
    name: "Have at least one special character (!@#$...etc)",
    reg: /(?=.*[!@#\$%\^&=\*])/gm,
  },
  LongerThen8Characters: {
    name: "Longer than 8 characters",
    reg: /(?=.{9,})/gm,
  },
};

interface IProps {
  password: string;
}

export const Validator: FC<IProps> = ({ password }) => {
  return (
    <div data-testid="validator" className={styles.validator}>
      {Object.keys(PasswordValidtorRecord).map((key) => (
        <Fragment key={key}>
          <Tick
            data-testid={`validator-${key}`}
            isCorrect={password.match(PasswordValidtorRecord[key].reg) !== null}
          />
          <span className="h-5 flex items-center">
            {PasswordValidtorRecord[key].name}
          </span>
        </Fragment>
      ))}
    </div>
  );
};
