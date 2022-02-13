import React, { FC } from 'react';
import { StyleProp, ImageStyle } from 'react-native';

import { CacheImage } from './cache-image';

type ImageProps = {
  uri: string;
  headers?: Record<string, string>;
  style?: StyleProp<ImageStyle>;
};

export const Image: FC<ImageProps> = ({ uri, headers, style }) => {
  return <CacheImage uri={uri} headers={headers} style={style} />;
};
