import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppRoutes} from './app.stack.routes';
import  {AuthRoutes}  from './auth.routes';



export function Routes(){
    const linking = {
        prefixes: ['WeActive://'],
        config: {
          screens: {
            TermsUse:'TermsUse',
            TrainingMontage:'TrainingMontage',
          },
        },
      };
    return (
    <NavigationContainer linking={linking}>


        <AppRoutes
        colocar o authroutes />

    </NavigationContainer>
    );
}
