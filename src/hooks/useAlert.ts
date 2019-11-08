import { useState } from "react";

export default function useAlert(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function show() {
    setIsOpen(true);
  }

  function hide() {
    setIsOpen(false);
  }

  return {
    isOpen,
    show,
    hide
  };
}
