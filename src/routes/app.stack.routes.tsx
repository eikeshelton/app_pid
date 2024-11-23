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
import {Followers_Followed} from '../screens/Followers_Followed';
import {Requests} from '../screens/Requests';
import Events from '../screens/Events';
import EventsRegister from '../screens/EventsRegister';
import EventsSearch from '../screens/EventsSearch';
import {EventParticipants} from '../screens/EventParticipants';

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
      <Stack.Screen
        name="Followers_Followed"
        component={Followers_Followed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventsRegister"
        component={EventsRegister}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventsSearch"
        component={EventsSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventParticipants"
        component={EventParticipants}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
