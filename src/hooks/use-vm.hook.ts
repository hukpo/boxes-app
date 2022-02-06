import { useState } from 'react';
import { container } from 'tsyringe';

interface Constructable<T> {
  new (...args: any): T;
}

export const useVm = <T>(VmConstructor: Constructable<T>, ...args: any[]): T => {
  const [vmRef] = useState<T>(() => {
    const vm = new VmConstructor(...args);
    container.register(VmConstructor, { useValue: vm });

    return vm;
  });

  return vmRef;
};
