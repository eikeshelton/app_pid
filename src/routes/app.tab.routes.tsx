import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Research from '../screens/Research';
import MacroTracker from '../screens/MacroTracker';
import TrainingPartner from '../screens/TrainingPartner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import Workout from '../screens/Workout';

export const {Navigator, Screen} = createBottomTabNavigator();

export default function AppTabNav() {
  const theme = useTheme();

  const profileIcone = (focused: boolean, size: number, color: string) => (
    <Ionicons
      name={focused ? 'person' : 'person-outline'}
      size={size}
      color={color}
    />
  );
  const researchIcone = (focused: boolean, size: number, color: string) => (
    <Ionicons
      name={focused ? 'search' : 'search-outline'}
      size={size}
      color={color}
    />
  );
  const macroTrackerIcone = (focused: boolean, size: number, color: string) => (
    <Ionicons
      name={focused ? 'nutrition' : 'nutrition-outline'}
      size={size}
      color={color}
    />
  );

  const trainingPartnerIcone = (
    focused: boolean,
    size: number,
    color: string,
  ) => (
    <Ionicons
      name={focused ? 'people' : 'people-outline'}
      size={size}
      color={color}
    />
  );
  const trainingmontageIcone = (
    focused: boolean,
    size: number,
    color: string,
  ) => (
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
          paddingTop: 6,
          borderTopWidth: 1.5,
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
          tabBarLabel: 'Perfil',

          tabBarIcon: ({size, color, focused}) =>
            profileIcone(focused, size, color),
        }}
      />
      <Screen
        name="Research"
        component={Research}
        options={{
          tabBarLabel: 'Pesquisar',
          tabBarIcon: ({size, color, focused}) =>
            researchIcone(focused, size, color),
        }}
      />
      <Screen
        name="TrainingPartner"
        component={TrainingPartner}
        options={{
          tabBarLabel: 'Parceiro',

          tabBarIcon: ({size, color, focused}) =>
            trainingPartnerIcone(focused, size, color),
        }}
      />
      <Screen
        name="FeedScreen"
        component={MacroTracker}
        options={{
          tabBarLabel: 'Dieta',

          tabBarIcon: ({size, color, focused}) =>
            macroTrackerIcone(focused, size, color),
        }}
      />
      <Screen
        name="Workout"
        component={Workout}
        options={{
          tabBarLabel: 'Treino',

          tabBarIcon: ({size, color, focused}) =>
            trainingmontageIcone(focused, size, color),
        }}
      />
    </Navigator>
  );
}
