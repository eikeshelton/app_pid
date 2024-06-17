import React, {useEffect, useState} from 'react';

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
  HeaderContainer,
  ContainerTest,
} from './style';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useAuth} from '../../hooks/auth';
import {Loading} from '../../components/Loading';

export default function Profile() {
  const {user, updateUser} = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchProfileData = () => {
    updateUser({
      email: user.email,
    });
    setLoading(false);
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
        <HeaderContainer>
          <ContainerTest />
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
          <SettingContainer>
            <SettingButton onPress={handleSettings}>
              <SettingIcon name="menu" />
            </SettingButton>
          </SettingContainer>
        </HeaderContainer>
        <CountContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers>
              <TextNumber>{user.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed>
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
