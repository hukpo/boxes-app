import React, { FC } from 'react';
import { container } from 'tsyringe';

import { BoxImage } from '../box-image';
import { BoxObject } from '../../types';
import { Navigation } from '@/navigation';
import { BoxesManageScreen } from '../../navigation';

type BoxImageheaderProps = {
  box: BoxObject;
};

export const BoxImageHeader: FC<BoxImageheaderProps> = ({ box }) => {
  const onPress = (): void => {
    container.resolve(Navigation).navigate(BoxesManageScreen.INFO, { boxId: box._id });
  };

  return (
    <BoxImage
      size={30}
      title={box.name}
      color={box.imageBg}
      type={box.type}
      uriKey={box.key}
      onPress={onPress}
    />
  );
};
