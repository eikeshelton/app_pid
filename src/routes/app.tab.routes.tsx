import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Research from '../screens/Research';
import FeedScreen from '../screens/Feed';
import TrainingPartner from '../screens/TrainingPartner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import TrainingMontage from '../screens/TrainingMontage';


export const {Navigator, Screen} = createBottomTabNavigator();

export default function AppTabNav (){
  const theme = useTheme();
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
      <Screen name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'profile',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({size, color, focused}) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={size}
            color={color}
          />
        ),
      }}
      />
      <Screen name="Research" component={Research}
       options={{
        tabBarLabel: 'Research',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({size, color, focused}) => (
          <Ionicons
            name={focused ? 'search' : 'search-outline'}
            size={size}
            color={color}
          />
        ),
      }}/>
      <Screen name="FeedScreen" component={FeedScreen}
       options={{
        tabBarLabel: 'Feed',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({size, color, focused}) => (
          <Ionicons
            name={focused ? 'newspaper' : 'newspaper-outline'}
            size={size}
            color={color}
          />
        ),
      }}
       />
      <Screen name="TrainingPartner" component={TrainingPartner}
      options={{
        tabBarLabel: 'TrainingPartner',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({size, color, focused}) => (
          <Ionicons
            name={focused ? 'people' : 'people-outline'}
            size={size}
            color={color}
          />
        ),
      }} />
      <Screen name="TrainingMontage" component={TrainingMontage}
      options={{
        tabBarLabel: 'TrainingMontage',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({size, color, focused}) => (
          <Ionicons
            name={focused ? 'barbell' : 'barbell-outline'}
            size={size}
            color={color}
          />
        ),
      }} />


      </Navigator>
  );
}
FeedScreen;
