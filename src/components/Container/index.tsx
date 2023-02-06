import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './styles';
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Container;
