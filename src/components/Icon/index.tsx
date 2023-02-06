import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../global/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = theme.colors.primary,
  ...props
}) => {
  return <Ionicons name={name} size={size} color={color} {...props} />;
};

export default Icon;
