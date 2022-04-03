import Realm from 'realm';
import { useEffect, useReducer } from 'react';

export const useRealmListUpdate = <T extends Realm.Results<any>>(objects: T | null): void => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    objects?.addListener((_, changes) => {
      if (changes.deletions.length || changes.insertions.length) {
        forceUpdate();
      }
    });

    return () => objects?.removeAllListeners();
  }, [objects]);
};

export const useRealmObjectUpdate = <T extends Realm.Object>(object: T | null): void => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (!object) {
      return;
    }

    object.addListener((_, changes) => {
      if (changes.changedProperties.length) {
        forceUpdate();
      }
    });

    return () => object.removeAllListeners();
  }, [object]);
};
