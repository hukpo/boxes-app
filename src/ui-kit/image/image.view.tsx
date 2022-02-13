import React, { FC } from 'react';
import { StyleProp, ImageStyle, Image as RNImage } from 'react-native';

// import { CacheImage } from './cache-image';

type ImageProps = {
  uri: string;
  // headers?: Record<string, string>;
  style?: StyleProp<ImageStyle>;
};

export const Image: FC<ImageProps> = ({ uri, style }) => {
  return <RNImage source={{ uri }} style={style} />;
  // return <CacheImage uri={uri} headers={headers} style={style} />;
};
