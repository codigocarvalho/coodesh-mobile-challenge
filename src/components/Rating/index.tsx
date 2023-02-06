import React, {memo} from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

interface RatingProps {
  value?: number;
}

const DEFAULT_STARS = 5;

const Rating = ({value}: RatingProps) => {
  const stars = [...Array(DEFAULT_STARS)].map((_star, index) => {
    if (value && index < value) {
      return <Ionicons key={index} name="star" size={20} color="#FFC107" />;
    }

    return <Ionicons key={index} name="star" size={20} color="#E0E0E0" />;
  });

  return <View style={styles.rating}>{stars}</View>;
};

export default memo(Rating);
