import { useMemo, useState } from 'react';

export type Value<V> = {
  (): V;
  (newValue: V | ((current: V) => V)): void;
  toggle(): void;
};

export function useValue<V>(initialValue: (() => V) | V): Value<V> {
  const [state, setState] = useState(initialValue);

  return useMemo(() => {
    function value(): void | V {
      switch (arguments.length) {
        case 0:
          return state;
        case 1:
          return setState(arguments[0]);
        default:
          throw new Error('Expected 0 or 1 arguments');
      }
    }

    value.toggle = () => {
      if (typeof state === 'boolean') {
        setState(s => !s as unknown as V);
      }
    };

    return value as Value<V>;
  }, [state]);
}
