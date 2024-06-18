import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {Routes} from './src/routes';
import {AppProvider} from './src/hooks';
import {useColorScheme} from 'react-native';
import theme_dark from './src/global/styles/theme_dark';

export default function MyApp() {
  const colorScheme = useColorScheme();
  const appTheme: any = colorScheme === 'dark' ? theme_dark : theme;

  return (
    <ThemeProvider theme={appTheme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
