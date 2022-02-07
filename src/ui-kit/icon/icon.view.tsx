import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { Box, Setting2, Send, Trash, Global, Blur, Edit, CloseCircle, Paperclip2 } from 'iconsax-react-native';

export type IconProps = {
  name:
    | 'box'
    | 'gear'
    | 'trash'
    | 'global'
    | 'blur'
    | 'arrow-right'
    | 'checkmark'
    | 'paperclip'
    | 'edit'
    | 'close'
    | 'send';
  color: string;

  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Icon: FC<IconProps> = ({ style, onPress, name, color, size, width = 0, height = 0 }) => {
  switch (name) {
    case 'box':
      return <Box style={style} size={size} color={color} />;

    case 'gear':
      return <Setting2 style={style} size={size} color={color} />;

    case 'trash':
      return <Trash style={style} size={size} color={color} />;

    case 'global':
      return <Global style={style} size={size} color={color} />;

    case 'blur':
      return <Blur style={style} size={size} color={color} />;

    case 'edit':
      return <Edit style={style} size={size} color={color} />;

    case 'close':
      return <CloseCircle style={style} size={size} color={color} />;

    case 'send':
      return <Send style={style} size={size} color={color} />;

    case 'arrow-right':
      return (
        <Svg width={width || (height / 24) * 13} height={height || (width / 13) * 24} fill="none" viewBox="0 0 13 24">
          <Path
            d="m1.88 22.56 8.693-8.693a2.648 2.648 0 0 0 0-3.734L1.88 1.44"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'checkmark':
      return (
        <Svg width={size} height={size} viewBox="0 0 1000 1000">
          <Path
            fill={color}
            d="M952.3 66.2c-40.8-31.6-97.8-21.9-127.4 21.4l-423.8 620-233.4-252.7c-34.4-39.1-92.1-41-128.9-4.2-36.7 36.5-38.6 98-4 136.9 0 0 283.6 314.7 324.4 346.3 40.8 31.6 97.8 21.9 127.4-21.4l486-710.7c29.7-43.7 20.5-104.3-20.3-135.6z"
          />
        </Svg>
      );

    case 'paperclip':
      return <Paperclip2 style={style} size={size} color={color} onPress={onPress} />;

    default:
      return null;
  }
};
