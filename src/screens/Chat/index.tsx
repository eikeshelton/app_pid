import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Container,
  ContainerBackButton,
  ContainerMessageUser,
  ContainerMessageUser2,
  Content,
  Header,
  Message,
  MessageUser2,
  Name,
  PictureContainerUser,
  PictureContainerUser2,
  PictureProfile,
} from './style';

import BackButton from '../../components/BackButton';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import {useAuth} from '../../hooks/auth';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {FlatList, KeyboardAvoidingView} from 'react-native';

import axios from '../../services/api';
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
  nome_remetente: string;
  nome_destinatario: string;
}

export function Chat() {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const {user} = useAuth();
  const route = useRoute();
  const params = route.params as Params;
  const {selectedItem} = params;
  const websocketRef = useRef<WebSocket | null>(null);

  // Chamada ao endpoint para recuperar mensagens ao abrir a tela
  useFocusEffect(
    useCallback(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `/chat/mensagens/${user.id}/${selectedItem.id}`,
          );

          setMensagens(response.data);
        } catch (error) {
          console.error('Erro ao recuperar mensagens:', error);
        }
      };

      fetchMessages();
    }, [user.id, selectedItem.id]),
  );

  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.15.170:8000/ws/${user.id}`);
    websocketRef.current = ws;

    ws.onopen = () => {
      console.log('Conexão estabelecida com sucesso.');
    };

    ws.onmessage = event => {
      try {
        const data: Mensagem[] = JSON.parse(event.data);
        console.log(event.data);
        setMensagens(prevMensagens => {
          const newData = Array.isArray(data) ? data : [data];
          return [...prevMensagens, ...newData];
        });

        flatListRef.current?.scrollToEnd({animated: true});
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
      websocketRef.current?.send(JSON.stringify(msg));
      setMensagem('');
    }
  };

  const renderItem = ({item, index}: {item: Mensagem; index: number}) => {
    const isSameUserAsPrevious =
      index > 0 && mensagens[index - 1].remetente_id === item.remetente_id;
    const isSameUserAsNext =
      index < mensagens.length - 1 &&
      mensagens[index + 1].remetente_id === item.remetente_id;

    const marginBottom = isSameUserAsNext ? 0 : 5;
    const marginTop = isSameUserAsPrevious ? 8 : 20;

    return (
      <Content
        remetente_id={item.remetente_id}
        user_id={user.id}
        marginBottom={marginBottom}
        marginTop={marginTop}>
        {item.remetente_id === user.id ? (
          <ContainerMessageUser>
            <PictureContainerUser>
              <Message>{item.texto}</Message>
            </PictureContainerUser>
          </ContainerMessageUser>
        ) : (
          <ContainerMessageUser2>
            <PictureContainerUser2>
              <MessageUser2>{item.texto}</MessageUser2>
            </PictureContainerUser2>
          </ContainerMessageUser2>
        )}
      </Content>
    );
  };

  return (
    <Container>
      <Header>
        <ContainerBackButton>
          <BackButton />
        </ContainerBackButton>
        <PictureProfile source={{uri: selectedItem.foto_perfil}} />
        <Name>{selectedItem.nome_usuario}</Name>
      </Header>
      <FlatList
        ref={flatListRef}
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
      <CustomButton texto="Enviar" onPress={sendMessage} />
    </Container>
  );
}
