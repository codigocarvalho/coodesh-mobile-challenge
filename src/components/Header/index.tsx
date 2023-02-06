import React from 'react';
import {Appbar} from 'react-native-paper';
import {styles} from './styles';
import {displayName as appName} from '../../../app.json';

interface HeaderProps {
  rightIcon?: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  rightIcon,
  onBackPress,
  onRightPress,
}) => {
  return (
    <Appbar.Header focusable={false}>
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content
        style={styles.content}
        title={appName}
        focusable={false}
      />
      {rightIcon && onRightPress && (
        <Appbar.Action icon={rightIcon} onPress={onRightPress} />
      )}
    </Appbar.Header>
  );
};

export default Header;
