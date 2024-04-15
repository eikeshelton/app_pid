import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

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
  LinkButton,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextLinkButton,
  TextNumber,
  TextPubFoll,
  ButtonFollow,
  ContainerNameBio,
  SettingContainer,
  SettingButton,
  SettingIcon,
} from './style';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';

export default function Profile() {
  const isFocused = useIsFocused();
  const [profileData, setProfileData] = useState({
    nome_usuario: '',
    tipo_usuario: '',
    bio: '',
    foto_perfil: '',
    seguidores: 0,
    seguidos: 0,
  });

  const urlGrouth = 'https://www.gsuplementos.com.br';

  const navigation = useNavigation();

  const abrirLink = () => {
    Linking.openURL(urlGrouth);
  };

  const fetchProfileData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        console.error('email nao encontrado no AsyncStorage');
        return;
      }

      const response = await api.get(`/usuarios/${email}`);
      const {data} = response;

      setProfileData(data);
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [isFocused]);

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };
  return (
    <>
      <ScreenBackground>
        <Container>
          <PictureContainer>
            {profileData.foto_perfil.length <= 0 ? (
              <ProfilePicture
                source={fotoPerfil}
                resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
              />
            ) : (
              <ProfilePicture
                source={{uri: profileData.foto_perfil}}
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

          <LinkButton onPress={abrirLink}>
            <TextLinkButton>www.gsuplementos.com.br</TextLinkButton>
          </LinkButton>
        </ContainerNameBio>
        <ContainerButtons>
          <ButtonFollow>
            <CustonButton
              texto="Editar perfil"
              onPress={() => navigation.navigate('EditProfile')}
            />
          </ButtonFollow>
        </ContainerButtons>

        <ProfilePost />
      </ScreenBackground>
    </>
  );
}
