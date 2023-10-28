import React from 'react';
import Tela_login from './componentes/Tela_Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tela_cadastro from './componentes/Tela_Cadastro';
import Termos_uso from './componentes/Termos_Uso';
import FotoPerfil from './componentes/Perfil';
import {ThemeProvider} from 'styled-components';
import theme from './componentes/global/styles/theme';

const Stack = createStackNavigator();
export default function App() {
    return (
        <ThemeProvider theme={theme}>
        <NavigationContainer >

            <Stack.Navigator>

                <Stack.Screen name="tela" component={Tela_login}/>

                <Stack.Screen name="tela_cadastro" component={Tela_cadastro}/>

                <Stack.Screen name="termos_uso" component={Termos_uso}/>
                <Stack.Screen name="perfil" component={FotoPerfil}/>

            </Stack.Navigator>

        </NavigationContainer>
        </ThemeProvider>


    );
}

