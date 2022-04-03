import { useState } from 'react';
import { container } from 'tsyringe';

export const useVm = <T extends new (...args: any) => any>(
  VmConstructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> => {
  const [vmRef] = useState<InstanceType<T>>(() => {
    const vm = new VmConstructor(...(args as any));
    container.register(VmConstructor, { useValue: vm });

    return vm;
  });

  return vmRef;
};
