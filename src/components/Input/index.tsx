import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {styles} from './styles';

interface InputProps extends TextInputProps {
  searchIcon?: boolean;
}

const Input: React.FC<InputProps> = ({searchIcon, ...props}) => {
  return (
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      autoFocus={false}
      mode="outlined"
      keyboardType="email-address"
      right={searchIcon && <TextInput.Icon icon={'search-outline'} disabled />}
      {...props}
    />
  );
};

export default Input;
