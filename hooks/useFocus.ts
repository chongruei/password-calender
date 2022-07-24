import { RefObject, useEffect, useRef, useState } from "react";

type TUseFocus = {
  ref: RefObject<HTMLInputElement>;
  isFocused: boolean;
};

export const useFocus = (): TUseFocus => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const focusHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const input = ref.current;
    input?.addEventListener("focus", focusHandler);
    input?.addEventListener("blur", blurHandler);

    return () => {
      input?.removeEventListener("focus", focusHandler);
      input?.removeEventListener("blur", blurHandler);
    };
  }, []);

  return {
    ref,
    isFocused,
  };
};
