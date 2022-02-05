import { useState } from 'react';

type UseValueResult<T> = { value: T };

export const useValue = <T>(initialValue: T): UseValueResult<T> => {
  const [value, setValue] = useState(initialValue);

  const result = {} as UseValueResult<T>;

  Object.defineProperty(result, 'value', {
    get: () => {
      return value;
    },
    set: (newValue: T) => {
      setValue(newValue);
    },
  });

  return result;
};
