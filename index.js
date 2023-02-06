import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import App from './App';
import {name as appName} from './app.json';
import {theme} from './src/global/theme';

export default function Main() {
  return (
    <PaperProvider
      settings={{icon: props => <Ionicons {...props} />}}
      theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
