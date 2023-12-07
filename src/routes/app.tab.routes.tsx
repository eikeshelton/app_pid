import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Research from '../screens/Research';
import FeedScreen from '../screens/Feed';
import TrainingPartner from '../screens/TrainingPartner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import TrainingMontage from '../screens/TrainingMontage';

export const {Navigator, Screen} = createBottomTabNavigator();

export default function AppTabNav() {
  const theme = useTheme();

  const profileIcone = (focused:boolean, size:number, color:string) => (
    <Ionicons
      name={focused ? 'person' : 'person-outline'}
      size={size}
      color={color}
    />
  );
  const researchIcone = (focused:boolean, size:number, color:string) => (
    <Ionicons
      name={focused ? 'search' : 'search-outline'}
      size={size}
      color={color}
    />
  );
  const feedScreenIcone = (focused:boolean, size:number, color:string) => (
    <Ionicons
      name={focused ? 'newspaper' : 'newspaper-outline'}
      size={size}
      color={color}
    />
  );

  const trainingPartnerIcone = (focused:boolean, size:number, color:string) => (
    <Ionicons
    name={focused ? 'people' : 'people-outline'}
    size={size}
    color={color}
  />
  );
  const trainingmontageIcone = (focused:boolean, size:number, color:string) => (
<Ionicons
              name={focused ? 'barbell' : 'barbell-outline'}
              size={size}
              color={color}
            />
  );
  return (
    <Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border_tab,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelPosition: 'below-icon',
      })}
      initialRouteName={'Initial'}>
      <Screen
        name="Initial"
        component={Profile}
        options={{
          tabBarLabel: 'profile',

          tabBarIcon: ({size, color, focused}) =>
            profileIcone(focused, size, color),
        }}
      />
      <Screen
        name="Research"
        component={Research}
        options={{
          tabBarLabel: 'Research',
          tabBarIcon: ({size, color, focused}) =>
            researchIcone(focused, size, color),
        }}
      />
      <Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',

          tabBarIcon: ({size, color, focused}) =>feedScreenIcone(focused, size, color),
        }}
      />
      <Screen
        name="TrainingPartner"
        component={TrainingPartner}
        options={{
          tabBarLabel: 'TrainingPartner',

          tabBarIcon: ({size, color, focused}) => trainingPartnerIcone(focused, size, color),
        }}
      />
      <Screen
        name="TrainingMontage"
        component={TrainingMontage}
        options={{
          tabBarLabel: 'TrainingMontage',

          tabBarIcon: ({size, color, focused}) =>
          trainingmontageIcone(focused, size, color),
        }}
      />
    </Navigator>
  );
}
FeedScreen;
