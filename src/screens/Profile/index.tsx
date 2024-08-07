import React, {useEffect, useState} from 'react';
import axios from '../../services/api';
import messaging from '@react-native-firebase/messaging';
import LiteButton from '../../components/LiteButton';
import ProfilePost from '../../components/ProfilePost';
import {
  Container,
  ScreenBackground,
  ContainerFollowed,
  ContainerFollowers,
  ContainerPub,
  ContainerPubFoll,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextNumber,
  TextPubFoll,
  ButtonFollow,
  ContainerNameBio,
  SettingContainer,
  SettingButton,
  SettingIcon,
  CountContainer,
  Header,
  RequestsButton,
  RequestsIcon,
  Number,
} from './style';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useAuth} from '../../hooks/auth';
import {Loading} from '../../components/Loading';
import PushNotification from 'react-native-push-notification';

export default function Profile() {
  const {user, updateUser} = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [focado, setFocado] = useState(false);
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();

      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações:', error);
    }
  };

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        try {
          await axios.post('/atualizar-fcm-token/', {
            fcm_token: fcmToken,
            id_usuario: user.id,
          });
        } catch (error) {
          console.error('Erro ao enviar o token FCM:', error);
        }
      }
    } catch (error) {
      console.error('Erro ao obter o token FCM:', error);
    }
  };

  const fetchProfileData = () => {
    updateUser({
      email: user.email,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (!isFocused) {
      return; // Retorna sem fazer nada se não estiver focado
    }
    fetchProfileData();
    requestUserPermission();
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        setFocado(true);
        PushNotification.localNotification({
          channelId: 'notificacao',
          title: remoteMessage.notification.title || 'Nova Notificação',
          message: remoteMessage.notification.body || '',
          playSound: true,
          importance: 'default',
          largeIcon: '',
          smallIcon: 'ic_notification',
          color: '#934dd2',
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      setFocado(true);
      console.log('Notificação em segundo plano:', remoteMessage);
    });

    return unsubscribe;
  }, [isFocused]);

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };
  const handleRequests = () => {
    setFocado(false);
    navigation.navigate('Requests');
  };
  return loading ? (
    <Loading />
  ) : (
    <ScreenBackground>
      <Container>
        <Header>
          <RequestsButton onPress={handleRequests}>
            <RequestsIcon name="addusergroup" focado={focado} />
            <Number focado={focado}>{1}</Number>
          </RequestsButton>
          <SettingContainer>
            <SettingButton onPress={handleSettings}>
              <SettingIcon name="menu" />
            </SettingButton>
          </SettingContainer>
        </Header>

        <PictureContainer>
          {user.foto_perfil ? (
            <ProfilePicture
              source={{uri: user.foto_perfil}}
              resizeMode="cover" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          ) : (
            <ProfilePicture
              source={fotoPerfil}
              resizeMode="cover" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          )}
          <ProfileName>{user.nome_usuario}</ProfileName>
        </PictureContainer>

        <CountContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidores',
                  id: user.id,
                })
              }>
              <TextNumber>{user.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>

            <ContainerFollowed
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidos',
                  id: user.id,
                })
              }>
              <TextNumber>{user.seguidos}</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerFollowed>
          </ContainerPubFoll>
        </CountContainer>
      </Container>
      <ContainerNameBio>
        <TextBio>{user.bio}</TextBio>
      </ContainerNameBio>
      <ButtonFollow>
        <LiteButton
          texto="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <LiteButton
          texto="Abrir Chat"
          onPress={() => navigation.navigate('ScreenChat')}
        />
      </ButtonFollow>

      <ProfilePost />
    </ScreenBackground>
  );
}
