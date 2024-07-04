import React, {useEffect, useState} from 'react';
import axios from '../../services/api';
import {useRoute} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import {Body, Container, Name, ProfilePicture} from './styles';
import BackButton from '../../components/BackButton';
import {Loading} from '../../components/Loading';

interface Params {
  type: string; // Supondo que type seja uma string
}

export function Followers_Followed() {
  const route = useRoute();
  const params = route.params as Params;
  const {type} = params;
  const {user} = useAuth();
  const [userData, setUserData] = useState<any[]>([]); // Estado para armazenar os dados dos usuários seguidos
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Função para buscar usuários seguidos se type for 'seguidos'
    async function fetchFollowedUsers() {
      if (type === 'seguidos') {
        try {
          const response = await axios.get(`/usuarios_seguidos/${user.id}`); // Substitua 'user.id' pelo ID do usuário logado
          if (!response.data) {
            throw new Error('Não foi possível obter os usuários seguidos');
          }
          setUserData(response.data);
          setLoading(false); // Armazena os dados dos usuários seguidos no estado
        } catch (error) {
          console.error('Erro ao buscar usuários seguidos:', error);
          // Tratar erro, exibindo mensagem na interface ou fazendo outra ação necessária
        }
      }
    }

    fetchFollowedUsers(); // Chama a função ao montar o componente

    // Limpeza de efeitos caso necessário
    return () => {
      // Limpeza, se necessário
    };
  }, [type]);
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <BackButton />
      {userData.map(user => (
        <Body key={user.id_usuario}>
          <ProfilePicture source={{uri: user.foto_perfil}} resizeMode="cover" />
          <Name>ID: {user.id_usuario}</Name>
          <Name>Nome: {user.nome_usuario}</Name>
          <Name>Tipo: {user.tipo_usuario}</Name>
        </Body>
      ))}
    </Container>
  );
}
