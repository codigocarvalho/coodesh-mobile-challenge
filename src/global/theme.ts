import {MD2LightTheme} from 'react-native-paper';

export const theme = {
  ...MD2LightTheme, // or MD3DarkTheme
  roundness: 8,
  colors: {
    ...MD2LightTheme.colors,
    accent: '#ED2647',
    primary: '#ED2647',
    secondary: '#E69C9A',
    tertiary: '#59B7D3',
  },
};
