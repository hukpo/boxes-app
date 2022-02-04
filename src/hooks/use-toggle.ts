import { useState } from 'react';

export const useToggle = (initialValue = false, disabled = false): { value: boolean; toggle: () => void } => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    toggle: () => !disabled && setValue(v => !v),
  };
};
