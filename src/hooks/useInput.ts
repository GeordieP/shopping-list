import { useState } from "react";

export default function useInput(defaultValue = "", placeholder = "") {
  const [value, setValue] = useState(defaultValue);

  function onInput(e: any) {
    setValue(e.target.value);
  }

  function clear() {
    setValue("");
  }

  return {
    value,
    placeholder,
    onInput,
    clear
  };
}
