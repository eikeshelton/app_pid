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
  ContainerBackbutton,
  ProfileUser,
  HeaderContainer,
  CountContainer,
  ContainerFollowers,
  ContainerFollowed,
  ButtonFollow,
} from './style';
import {useNavigation, useRoute} from '@react-navigation/native';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import BackButton from '../../components/BackButton';
import LiteButton from '../../components/LiteButton';

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
        <HeaderContainer>
          <PictureContainer>
            {selectedItem.foto_perfil ? (
              <ProfilePicture
                source={{uri: selectedItem.foto_perfil}}
                resizeMode="cover" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
              />
            ) : (
              <ProfilePicture
                source={fotoPerfil}
                resizeMode="cover" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
              />
            )}
            <ProfileName>{selectedItem.nome_usuario}</ProfileName>
          </PictureContainer>
        </HeaderContainer>
        <CountContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers>
              <TextNumber>{selectedItem.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed>
              <TextNumber>{selectedItem.seguidos}</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerFollowed>
          </ContainerPubFoll>
        </CountContainer>
      </Container>
      <ContainerNameBio>
        <TextBio>{selectedItem.bio}</TextBio>
      </ContainerNameBio>
      <ButtonFollow>
        <LiteButton texto="Seguir" onPress={() => {}} />
        <LiteButton
          texto="Mensagem"
          onPress={() => navigation.navigate('Chat', {selectedItem})}
        />
      </ButtonFollow>
      <ProfilePost />
    </ScreenBackground>
  );
}
