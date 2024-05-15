import React, {useEffect, useState} from 'react';

import CustonButton from '../../components/CustomizeButton';
import ProfilePost from '../../components/ProfilePost';
import {
  Container,
  ContainerButtons,
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
  ChatIcon,
  ChatButton,
} from './style';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useAuth} from '../../hooks/auth';
import {Loading} from '../../components/Loading';

export default function Profile() {
  const {user} = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    nome_usuario: '',
    tipo_usuario: '',
    bio: '',
    foto_perfil: '',
    seguidores: 0,
    seguidos: 0,
  });

  const navigation = useNavigation();

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const {email} = user;
      const response = await api.get(`/usuarios/${email}`);
      const {data} = response;
      if (!email) {
        console.error('Email não encontrado no AsyncStorage');
        return;
      }

      setProfileData(data);
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [isFocused]);

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };
  return loading ? (
    <Loading />
  ) : (
    <ScreenBackground>
      <Container>
        <PictureContainer>
          {profileData.foto_perfil ? (
            <ProfilePicture
              source={{uri: profileData.foto_perfil}}
              resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          ) : (
            <ProfilePicture
              source={fotoPerfil}
              resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          )}
        </PictureContainer>
        <SettingContainer>
          <SettingButton onPress={handleSettings}>
            <SettingIcon name="menu" />
          </SettingButton>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers>
              <TextNumber>{profileData.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed>
              <TextNumber>{profileData.seguidos}</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerFollowed>
          </ContainerPubFoll>
        </SettingContainer>
      </Container>
      <ContainerNameBio>
        <ProfileName>{profileData.nome_usuario}</ProfileName>
        <TextBio>{profileData.bio}</TextBio>
      </ContainerNameBio>
      <ContainerButtons>
        <ButtonFollow>
          <CustonButton
            texto="Editar perfil"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </ButtonFollow>
        <ChatButton>
          <ChatIcon name="chat" />
        </ChatButton>
      </ContainerButtons>

      <ProfilePost />
    </ScreenBackground>
  );
}
