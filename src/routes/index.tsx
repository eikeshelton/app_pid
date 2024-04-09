import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppRoutes} from './app.stack.routes';


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


        <AppRoutes />

    </NavigationContainer>
    );
}
