import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  Name,
  PictureContainer,
  PictureProfile,
  ProfilePicture,
} from './style';
import fotopropid from '../../assets/imagens/fotopropid.jpg';
import BackButton from '../../components/BackButton';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import {useAuth} from '../../hooks/auth';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
interface Params {
  selectedItem: {
    tipo_usuario: string;
    foto_perfil: string;
    nome_usuario: string;
    seguidores: number;
    seguidos: number;
    bio: string;
    id: number;
  };
}
interface Mensagem {
  id: number;
  remetente_id: number;
  destinatario_id: number;
  texto: string;
}
export function Chat() {
  const [mensagem, setMensagem] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const {user} = useAuth();
  const route = useRoute();
  const params = route.params as Params; // Converter para o tipo esperado
  const {selectedItem} = params;
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.15.170:8000/ws');

    ws.onopen = () => {
      console.log('Conexão estabelecida com sucesso.');
      setWebsocket(ws);
    };

    ws.onmessage = event => {
      console.log('Mensagem recebida:', event.data);
      try {
        // Analisa a mensagem JSON recebida
        const data: Mensagem[] = JSON.parse(event.data);
        console.log('Dados recebidos:', data);
        setMensagens(data);
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
      }
    };

    ws.onerror = error => {
      console.error('Erro na conexão WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada.');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (mensagem.trim() !== '') {
      const msg = {
        remetente_id: user.id,
        destinatario_id: selectedItem.id,
        texto: mensagem,
      };
      websocket?.send(JSON.stringify(msg));
      setMensagem('');
    }
  };
  const renderItem = ({item}: any) => (
    <PictureContainer>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="contain" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.nome_remetente}</Name>
      <Name>{item.texto}</Name>
    </PictureContainer>
  );
  return (
    <Container>
      <Header>
        <BackButton />
        <PictureProfile source={fotopropid} />
      </Header>
      <FlatList
        data={mensagens}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Input
        onChangeText={text => setMensagem(text)}
        value={mensagem}
        placeholderTextColor={'white'}
        placeholder="Mensagem..."
      />
      <CustomButton texto="enviar" onPress={sendMessage} />
    </Container>
  );
}
