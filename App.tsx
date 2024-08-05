import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {Routes} from './src/routes';
import {AppProvider} from './src/hooks';
import {useColorScheme} from 'react-native';
import theme_dark from './src/global/styles/theme_dark';
import PushNotification, {Importance} from 'react-native-push-notification';
export default function MyApp() {
  const colorScheme = useColorScheme();
  const appTheme: any = colorScheme === 'dark' ? theme_dark : theme;

  PushNotification.createChannel(
    {
      channelId: 'notificacao',
      channelName: 'Canal de notificação de seguidores', // (required) // (optional) default: undefined.
      playSound: false, // (optional) default: true
      importance: Importance.DEFAULT, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  return (
    <ThemeProvider theme={appTheme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
