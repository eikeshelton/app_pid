import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  NameText,
  PictureContainer,
  ProfilePicture,
  SuperContainer,
  TextContainer,
} from './styles';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import api from '../../services/api';
import {Loading} from '../../components/Loading';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';
import {FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
interface Params {
  eventoId: number;
}
interface Conversas {
  id: number;
  nome_usuario: number;
  foto_perfil: string;
}
export function EventParticipants() {
  const route = useRoute();
  const params = route.params as Params;
  const [loading, setLoading] = useState(true);
  const [conversas, setConversas] = useState<Conversas[]>([]);
  const [pesquisar, setPesquisar] = useState('');

  const HandleParticipants = async () => {
    try {
      const response = await api.get(
        `/lista/participantes/evento/${params.eventoId}`,
      );
      setConversas(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    HandleParticipants();
  }, []);
  const renderItem = ({item}: {item: Conversas}) => (
    <SuperContainer>
      <PictureContainer>
        {item.foto_perfil ? (
          <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
        ) : (
          <ProfilePicture source={fotoPerfil} resizeMode="contain" />
        )}
      </PictureContainer>
      <TextContainer>
        <NameText>{item.nome_usuario}</NameText>
      </TextContainer>
    </SuperContainer>
  );
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <InputComponent
        onChangeText={setPesquisar}
        value={pesquisar}
        placeholderTextColor={'silver'}
        placeholder="Pesquisar conversas"
        isFocused={true} // O campo está focado quando esta prop é true
      />
      <FlatList
        data={conversas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
}
