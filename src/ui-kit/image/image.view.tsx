import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ImageProps as RNImageProps, Image as RNImage } from 'react-native';

import { useVm } from '@/hooks';
import { CacheImage } from './cache-image';
import { ImageSource, ImageVm } from './image.vm';

export type ImageProps = Omit<RNImageProps, 'source'> & {
  source: ImageSource;
};

export const Image = observer<ImageProps>(({ source, ...props }) => {
  const vm = useVm(ImageVm);

  useEffect(() => {
    vm.setSource(source);
  }, [source, vm]);

  if (!vm.uri) {
    return null;
  }

  if (vm.uri.startsWith('https://')) {
    return <CacheImage uri={vm.uri} style={props.style} />;
  }

  return <RNImage source={{ uri: vm.uri }} {...props} />;
});
