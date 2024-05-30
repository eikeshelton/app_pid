import React from 'react';

import CustonButton from '../../components/CustomizeButton';
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
  ContainerNameBio,
  SettingContainer,
  ContainerBackbutton,
  ProfileUser,
} from './style';
import {useRoute} from '@react-navigation/native';

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

      <ProfilePost />
    </ScreenBackground>
  );
}
