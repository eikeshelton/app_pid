import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppTabNav from './app.tab.routes';
import EditProfile from '../screens/EditProfile';
import {SettingsScreen} from '../screens/SettingsScreen';
import {EditReg} from '../screens/EditRegistration';
import ResetPassword from '../screens/ResetPassword';
import TermsUse from '../screens/TermsUse';
import {ScreenChat} from '../screens/ScreenChats';
import UserSearch from '../screens/UserSearch';
import {Chat} from '../screens/Chat';
import TrainingPartnerRegister from '../screens/TrainingPartnerRegister';
import TrainingPartnerSearch from '../screens/TrainingPartnerSearch';

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
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsUse"
        component={TermsUse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScreenChat"
        component={ScreenChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserSearch"
        component={UserSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrainingPartnerRegister"
        component={TrainingPartnerRegister}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrainingPartnerSearch"
        component={TrainingPartnerSearch}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
