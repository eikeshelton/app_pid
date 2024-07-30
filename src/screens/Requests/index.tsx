import React, {useEffect, useState} from 'react';
import {
  Container,
  Name,
  PictureContainer,
  ProfilePicture,
  RequestButton,
  RequestButtonText,
  RequestContainer,
  RequestContainerButton,
} from './styles';
import axios from '../../services/api';
import {useAuth} from '../../hooks/auth';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Loading} from '../../components/Loading';
export function Requests() {
  const {user} = useAuth();
  const [requests, Setrequests] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const UserRequests = async () => {
    try {
      const response = await axios.get(
        `/lista_solicitacoes_pendentes/${user.id}`,
      );
      Setrequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAcceptRequest = async (item: any) => {
    try {
      await axios.post('/seguidores/acao/', {
        id_seguidor: item.id_usuario,
        id_seguido: item.id_seguido,
        acao: 'aceito',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleRejectRequest = async (item: any) => {
    try {
      await axios.post('/seguidores/acao/', {
        id_seguidor: item.id_usuario,
        id_seguido: item.id_seguido,
        acao: 'rejeitar',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleItemPress = (item: any) => {
    navigation.navigate('UserSearch', {selectedItem: item});
  };
  const renderItem = ({item}: any) => (
    <RequestContainer>
      <PictureContainer onPress={() => handleItemPress(item)}>
        {item.foto_perfil ? (
          <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
        ) : (
          <ProfilePicture source={fotoPerfil} resizeMode="contain" />
        )}
        <Name>{item.login}</Name>
        <Name>{item.tipo_usuario}</Name>
      </PictureContainer>
      <RequestContainerButton>
        <RequestButton onPress={() => handleAcceptRequest(item)}>
          <RequestButtonText> Aceitar </RequestButtonText>
        </RequestButton>
        <RequestButton onPress={() => handleRejectRequest(item)}>
          <RequestButtonText> Rejeitar </RequestButtonText>
        </RequestButton>
      </RequestContainerButton>
    </RequestContainer>
  );
  useEffect(() => {
    UserRequests();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <FlatList data={requests} renderItem={renderItem} />
    </Container>
  );
}
