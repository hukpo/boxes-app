import React, { FC } from 'react';
import { BoxObject } from '../../types';

import { BoxImage } from '../box-image';

type BoxImageheaderProps = {
  box: BoxObject;
};

export const BoxImageHeader: FC<BoxImageheaderProps> = ({ box }) => {
  return <BoxImage size={30} title={box.name} color={box.imageBg} type={box.type} uriKey={box.key} />;
};
