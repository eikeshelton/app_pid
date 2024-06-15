import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes} from './app.stack.routes';
import {AuthRoutes} from './auth.routes';
import {useAuth} from '../hooks/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export function Routes() {
  const {user} = useAuth();

  const linking = {
    prefixes: ['WeActive://'],
    config: {
      screens: {
        Login: 'Login',
        TermsUse: 'TermsUse',
        TrainingMontage: 'TrainingMontage',
        EditProfile: 'EditProfile',
        TrainingPartnerRegister: 'TrainingPartnerRegister',
      },
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {user.email ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
