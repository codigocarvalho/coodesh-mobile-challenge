import React from 'react';
import {FAB} from 'react-native-paper';
import {styles} from './styles';

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({icon, onPress}) => (
  <FAB style={styles.fab} icon={icon} onPress={onPress} />
);

export default ActionButton;
