import React, {useState, useEffect} from 'react';
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
import axios from '../../services/api';
import {useAuth} from '../../hooks/auth';

interface Params {
  selectedItem: {
    id_usuario: number;
    tipo_usuario: string;
    foto_perfil: string;
    nome_usuario: string;
    seguidores: number;
    seguidos: number;
    bio: string;
    login: string;
  };
}

export default function UserSearch() {
  const route = useRoute();
  const {user} = useAuth();
  const navigation = useNavigation();
  const params = route.params as Params; // Converter para o tipo esperado
  const {selectedItem: initialSelectedItem} = params;
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [seguindo, Setseguindo] = useState(false);

  useEffect(() => {
    // Chamada para verificar se o usuário segue o outro ao montar o componente
    async function verificarSeguimento() {
      try {
        const response = await axios.get(
          `/verificar_seguimento/${user.id}/${params.selectedItem.id_usuario}`,
        );
        Setseguindo(response.data);
        // Aqui você pode atualizar o estado ou fazer qualquer outra ação com base na resposta
      } catch (error) {
        console.error('Erro ao verificar seguimento:', error);
      }
    }

    if (user && params.selectedItem) {
      verificarSeguimento();
    }
  }, [route.params, user, selectedItem]);

  async function handleFollow() {
    try {
      let response;
      if (seguindo) {
        // Chame o endpoint de deletar (cancelar seguir)
        response = await axios.delete('/seguidores/', {
          data: {
            id_seguidor: user.id,
            id_seguido: selectedItem?.id_usuario,
          },
        });
        Setseguindo(response.data);
      } else {
        // Chame o endpoint de seguir
        response = await axios.post('/seguidores/', {
          id_seguidor: user.id,
          id_seguido: selectedItem?.id_usuario,
        });
        Setseguindo(response.data);
      }

      // Após seguir/desseguir, chame a função para verificar seguidores e seguidos
      await checkFollowers_Followed();
    } catch (error) {
      console.error('Erro ao seguir/desseguir usuário:', error);
    }
  }

  async function checkFollowers_Followed() {
    try {
      const response = await axios.get(
        `/seguidores_seguidos/${selectedItem.id_usuario}`,
      );

      setSelectedItem(prevSelectedItem => ({
        ...prevSelectedItem,
        seguidores: response.data.seguidores,
        seguidos: response.data.seguidos,
      }));
    } catch (error) {
      console.error('Erro ao verificar seguidores e seguidos:', error);
    }
  }

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
                resizeMode="cover"
              />
            ) : (
              <ProfilePicture source={fotoPerfil} resizeMode="cover" />
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
            <ContainerFollowers
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidores',
                  id: selectedItem.id_usuario,
                })
              }>
              <TextNumber>{selectedItem.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidos',
                  id: selectedItem.id_usuario,
                })
              }>
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
        <LiteButton
          texto={seguindo ? 'Seguindo' : 'Seguir'}
          onPress={() => {
            handleFollow();
          }}
        />
        <LiteButton
          texto="Mensagem"
          onPress={() => navigation.navigate('Chat', {selectedItem})}
        />
      </ButtonFollow>
      <ProfilePost />
    </ScreenBackground>
  );
}
