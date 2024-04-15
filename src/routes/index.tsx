import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes} from './app.stack.routes';
import {AuthRoutes} from './auth.routes';
import {useAuth} from '../hooks/auth';

export function Routes() {
  const {user} = useAuth();

  const linking = {
    prefixes: ['WeActive://'],
    config: {
      screens: {
        Login: 'Login',
        TermsUse: 'TermsUse',
        TrainingMontage: 'TrainingMontage',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {user.email ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
