import React from 'react';

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
  Header,
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
      <Container>
        <Header>
          <BackButton />
        </Header>
        <SettingContainer>
          <PictureContainer>
            {selectedItem.foto_perfil ? (
              <ProfilePicture
                source={{uri: selectedItem.foto_perfil}}
                resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
              />
            ) : (
              <ProfilePicture
                source={fotoPerfil}
                resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
              />
            )}
            <ProfileName>{selectedItem.nome_usuario}</ProfileName>
          </PictureContainer>
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
        </SettingContainer>
      </Container>
      <ContainerNameBio>
        <TextBio>{selectedItem.bio}</TextBio>
      </ContainerNameBio>
      <ContainerButtons>
        <ButtonFollow>
          <CustonButton texto="seguir" />
        </ButtonFollow>
        <ButtonFollow>
          <CustonButton
            texto="Mensagem"
            onPress={() => navigation.navigate('Chat')}
          />
        </ButtonFollow>
      </ContainerButtons>

      <ProfilePost />
    </ScreenBackground>
  );
}
