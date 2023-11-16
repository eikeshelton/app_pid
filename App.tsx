import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';


export default function MyApp() {

    return (
        <ThemeProvider theme={theme}>
        <Routes/>
        </ThemeProvider>


    );
}

