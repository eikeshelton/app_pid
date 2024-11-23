import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {
  Container,
  Header,
  PictureContainer,
  ProfilePicture,
  NameText,
  MessageText,
  TextContainer,
  SuperContainer,
} from './style';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';
import {FlatList} from 'react-native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useAuth} from '../../hooks/auth';
import {Loading} from '../../components/Loading';
interface Conversas {
  id_conversa: number;
  nome_remetente: string;
  nome_destinatario: string;
  id_usuario: number;
  foto_perfil: string | null;
  ultima_mensagem: String;
}
export function ScreenChat() {
  const [loading, setLoading] = useState(true);
  const [conversas, setConversas] = useState<Conversas[]>([]);
  const [pesquisar, setPesquisar] = useState('');
  const {user} = useAuth();
  const getConversation = async () => {
    try {
      const response = await api.get(`/conversas_usuario/${user.id}`);
      setConversas(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getConversation();
  }, []);
  const renderItem = ({item}: any) => (
    <SuperContainer>
      <PictureContainer>
        {item.foto_perfil ? (
          <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
        ) : (
          <ProfilePicture source={fotoPerfil} resizeMode="contain" />
        )}
      </PictureContainer>
      <TextContainer>
        <NameText>{item.nome_destinatario}</NameText>
        <MessageText>{item.ultima_mensagem}</MessageText>
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
        keyExtractor={item => item.id_conversa.toString()}
      />
    </Container>
  );
}
