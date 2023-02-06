import React from 'react';
import {Image as RNImage, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import {styles} from './styles';

interface ImageProps {
  uri?: string | null;
  onPress?: () => void;
}

const Image: React.FC<ImageProps> = ({uri, onPress}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    {!uri ? (
      <Icon name="camera-outline" size={64} />
    ) : (
      <RNImage
        style={styles.image}
        source={{
          uri,
        }}
      />
    )}
  </TouchableOpacity>
);

export default Image;
