import { useState } from 'react';

interface Constructable<T> {
  new (...args: any): T;
}

export const useVm = <T>(VmConstructor: Constructable<T>, ...args: any[]): T => {
  const [vmRef] = useState<T>(() => new VmConstructor(...args));

  return vmRef;
};
