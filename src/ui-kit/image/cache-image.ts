import { requireNativeComponent, ViewProps } from 'react-native';

export type NativeCacheImageProps = ViewProps & {
  uri: string;
  headers?: Record<string, string>;
};

export const CacheImage = requireNativeComponent<NativeCacheImageProps>('RNTCacheImage');
