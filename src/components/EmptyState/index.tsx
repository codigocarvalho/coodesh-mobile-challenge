import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../global/theme';
import Icon from '../Icon';
import {styles} from './styles';

interface EmptyStateProps {
  searchText?: string;
  onPress?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({searchText, onPress}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Icon
        color={theme.colors.disabled}
        name={'add-circle-outline'}
        size={72}
      />
    </TouchableOpacity>
    <Text style={styles.text}>
      {searchText
        ? `Product "${searchText}" not found`
        : 'You list look to be empty... Start adding a new product'}
    </Text>
  </View>
);

export default memo(EmptyState);
