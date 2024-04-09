import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme_dark';
import themeLight from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider} from './src/hooks/auth';
import { useColorScheme } from 'react-native';


export default function MyApp() {
const color = useColorScheme();
    return (

        <ThemeProvider theme={color === 'dark' ? theme : themeLight}>
        <AuthProvider>
        <Routes/>

        </AuthProvider>
        </ThemeProvider>



    );
}

