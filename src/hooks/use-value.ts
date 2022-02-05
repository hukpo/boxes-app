import { Dispatch, SetStateAction, useState } from 'react';

export const useValue = <T>(initialValue: T): { value: T; set: Dispatch<SetStateAction<T>> } => {
  const [value, set] = useState(initialValue);

  return { value, set };
};
