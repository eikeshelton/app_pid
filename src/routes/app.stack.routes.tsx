import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppTabNav from './app.tab.routes'; // Assuming this defines your tab navigator
import EditProfile from '../screens/EditProfile';
import {SettingsScreen} from '../screens/SettingsScreen';
import {EditReg} from '../screens/EditRegistration';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="AppTabNav">
      <Stack.Screen
        name="AppTabNav"
        component={AppTabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditReg"
        component={EditReg}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
