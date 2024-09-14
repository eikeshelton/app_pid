import React, {useEffect, useState} from 'react';
import axios from '../../services/api';
import {useRoute} from '@react-navigation/native';
import {
  Body,
  Container,
  ProfilePicture,
  Text,
  Title,
  UserContainer,
} from './styles';
import BackButton from '../../components/BackButton';
import {Loading} from '../../components/Loading';
import {ScrollView} from 'react-native';

interface Params {
  type: string; // Supondo que type seja uma string
  id: any;
}

export function Followers_Followed() {
  const route = useRoute();
  const params = route.params as Params;
  const {type, id} = params;
  const [userData, setUserData] = useState<any[]>([]); // Estado para armazenar os dados dos usuários seguidos
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Usuários Seguidos');
  useEffect(() => {
    // Função para buscar usuários seguidos se type for 'seguidos'
    async function fetchFollowedUsers() {
      if (type === 'seguidos') {
        try {
          const response = await axios.get(`/usuarios_seguidos/${id}`); // Substitua 'user.id' pelo ID do usuário logado
          if (!response.data) {
            throw new Error('Não foi possível obter os usuários seguidos');
          }
          setUserData(response.data);
          setTitle('Usuários Seguidos');
          setLoading(false); // Armazena os dados dos usuários seguidos no estado
        } catch (error) {
          console.error('Erro ao buscar usuários seguidos:', error);
          // Tratar erro, exibindo mensagem na interface ou fazendo outra ação necessária
        }
      } else {
        try {
          const response = await axios.get(`/usuarios_seguidores/${id}`); // Substitua 'user.id' pelo ID do usuário logado
          if (!response.data) {
            throw new Error('Não foi possível obter os usuários seguidore');
          }
          setUserData(response.data);
          setTitle('Seguidores');
          setLoading(false); // Armazena os dados dos usuários seguidos no estado
        } catch (error) {
          console.error('Erro ao buscar usuários seguidores:', error);
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
      <Title>{title}</Title>
      <ScrollView>
        <UserContainer>
          {userData.map(user => (
            <Body key={user.id_usuario}>
              <ProfilePicture
                source={{uri: user.foto_perfil}}
                resizeMode="cover"
              />
              <Text>{user.nome_usuario}</Text>
              <Text>{user.tipo_usuario}</Text>
            </Body>
          ))}
        </UserContainer>
      </ScrollView>
    </Container>
  );
}
