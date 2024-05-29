import React, {useEffect, useState} from 'react';
import {Container, Header, PictureProfile} from './style';
import fotopropid from '../../assets/imagens/fotopropid.jpg';
import BackButton from '../../components/BackButton';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import {useAuth} from '../../hooks/auth';
import {useRoute} from '@react-navigation/native';
interface Params {
  selectedItem: {
    tipo_usuario: string;
    foto_perfil: string;
    nome_usuario: string;
    seguidores: number;
    seguidos: number;
    bio: string;
    id: number;

    // Adicione outras propriedades conforme necessário
  };
}
export function Chat() {
  const [mensagem, setMensagem] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const {user} = useAuth();
  const route = useRoute();
  const params = route.params as Params; // Converter para o tipo esperado
  const {selectedItem} = params;
  useEffect(() => {
    // Criando uma nova conexão WebSocket
    const ws = new WebSocket('ws://10.62.133.119:8000/ws');
    // Definindo callbacks de eventos da conexão WebSocket
    ws.onopen = () => {
      console.log('Conexão estabelecida com sucesso.');
      // Enviando uma mensagem para o servidor ao abrir a conexão
      setWebsocket(ws);
    };

    ws.onmessage = event => {
      console.log('Mensagem recebidaaaaa:', event.data);
      // Tratando a mensagem recebida do servidor
    };

    ws.onerror = error => {
      console.error('Erro na conexão WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada.');
    };

    // Retornando uma função de limpeza para fechar a conexão WebSocket quando o componente for desmontado
    return () => {
      ws.close();
    };
  }, []);
  const sendMessage = () => {
    if (websocket && mensagem.trim() !== '') {
      const messageData = {
        remetente_id: user.id, // Substitua pelo ID do remetente
        destinatario_id: selectedItem.id, // Substitua pelo ID do destinatário
        texto: mensagem.trim(),
      };
      websocket.send(JSON.stringify(messageData));
      setMensagem('');
    }
  };
  return (
    <Container>
      <Header>
        <BackButton />
        <PictureProfile source={fotopropid} />
      </Header>
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
