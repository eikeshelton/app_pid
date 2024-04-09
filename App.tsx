import React from 'react';
<<<<<<< HEAD
import Tela_login from './componentes/tela_login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Tela_cadastro from './componentes/tela_cadastro';
import Termos_uso from './componentes/termos_uso';
import FotoPerfil from './componentes/perfil';

const Stack = createStackNavigator();
export default function App() {
    return (

        <NavigationContainer >

            <Stack.Navigator>

                <Stack.Screen name='tela' component={Tela_login}/>

                <Stack.Screen name='tela_cadastro' component={Tela_cadastro}/>
                
                <Stack.Screen name='termos_uso' component={Termos_uso}/>
                <Stack.Screen name='perfil' component={FotoPerfil}/>

            </Stack.Navigator>

        </NavigationContainer>
=======
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

>>>>>>> 0e7c0d6f1a79905d8d8cbabcdf423be0f6146ab4


    );
}

