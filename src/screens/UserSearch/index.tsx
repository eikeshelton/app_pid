import React from 'react';
import ProfilePost from '../../components/ProfilePost';
import {
  Container,
  ScreenBackground,
  ContainerPub,
  ContainerPubFoll,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextNumber,
  TextPubFoll,
  ContainerNameBio,
  SettingContainer,
  ContainerBackbutton,
  ProfileUser,
  FollowIcon,
  ButtonIcon,
  ChatButton,
  ChatIcon,
  ContainerButton,
} from './style';
import {useNavigation, useRoute} from '@react-navigation/native';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import BackButton from '../../components/BackButton';

interface Params {
  selectedItem: {
    tipo_usuario: string;
    foto_perfil: string;
    nome_usuario: string;
    seguidores: number;
    seguidos: number;
    bio: string;
    login: string;

    // Adicione outras propriedades conforme necessário
  };
}
export default function UserSearch() {
  const route = useRoute();
  const params = route.params as Params; // Converter para o tipo esperado
  const {selectedItem} = params;
  const navigation = useNavigation();
  return (
    <ScreenBackground>
      <ContainerBackbutton>
        <BackButton />
        <ProfileUser>{selectedItem.login}</ProfileUser>
      </ContainerBackbutton>
      <Container>
        <PictureContainer>
          {selectedItem.foto_perfil ? (
            <ProfilePicture
              source={{uri: selectedItem.foto_perfil}}
              resizeMode="cover" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          ) : (
            <ProfilePicture
              source={fotoPerfil}
              resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
          )}
        </PictureContainer>
        <SettingContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerPub>
              <TextNumber>{selectedItem.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerPub>
            <ContainerPub>
              <TextNumber>{selectedItem.seguidos}</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerPub>
          </ContainerPubFoll>
        </SettingContainer>
      </Container>
      <ContainerNameBio>
        <ProfileName>{selectedItem.nome_usuario}</ProfileName>
        <TextBio>{selectedItem.bio}</TextBio>
      </ContainerNameBio>
      <ContainerButton>
        <ButtonIcon>
          <FollowIcon name="user-follow" />
        </ButtonIcon>
        <ChatButton onPress={() => navigation.navigate('Chat', {selectedItem})}>
          <ChatIcon name="chat" />
        </ChatButton>
      </ContainerButton>
      <ProfilePost />
    </ScreenBackground>
  );
}
