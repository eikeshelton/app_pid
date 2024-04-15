import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {Routes} from './src/routes';
import {AppProvider} from './src/hooks';

export default function MyApp() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
