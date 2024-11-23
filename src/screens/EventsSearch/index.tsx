import React, {useEffect, useState} from 'react';
import {Alert, Platform, FlatList, View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustonButton from '../../components/CustomizeButton';
import {
  BodyEvent,
  Container,
  ContainerButton,
  ContainerButtonEvent,
  ContainerSearchResult,
  ContainerEventIcon,
  ContainerInputRegister,
  EventText,
  EventTitle,
  Header,
  LabelText,
  PageTitleContainer,
  PageTitleText,
  ScreenBackgroundRegister,
  ContainerOrganizer,
  OrganizerPicture,
  ContainerOrganizerPicture,
  OrganizerText,
  ContainerEventIconButton,
} from './styles';
import BackButton from '../../components/BackButton';
import InputPicker from '../../components/InputPicker';
import LiteButton from '../../components/LiteButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
interface Event {
  organizador_id: number;
  nome: string;
  data_inicio: string;
  localizacao: string;
  quantidade_participantes: number;
  interesse_declarado: boolean;
  descricao: string;
  id: number;
  hora_inicio: string;
  municipio_id: number;
  organizador: {
    foto_perfil: string;

    nome: string;
  };
}
interface Estados {
  id: string;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}
interface Cidades {
  id: string;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
  };
}
export default function EventsRegister() {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [estado, setEstado] = useState('');
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidadeId, setCidadeId] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    requestLocationPermission();
    fetchEstadosFromAPI();
  }, []);
  const requestLocationPermission = async () => {
    try {
      const status = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (status === RESULTS.GRANTED) {
        //getLocation();
      } else {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (result === RESULTS.GRANTED) {
          //getLocation();
        } else {
          Alert.alert(
            'Permissão de Localização Negada',
            'A permissão para acessar a localização foi negada. Por favor, permita o acesso nas configurações do dispositivo.',
          );
        }
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de localização:', error);
    }
  };

  const fetchEstadosFromAPI = async () => {
    try {
      const response = await axios.get<Estados[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      // Formatando os estados para o formato que o InputPicker espera
      const estadosFormatted = response.data.map(estado => ({
        label: `${estado.nome} - ${estado.sigla}`,
        value: estado.sigla,
        id: estado.id,
      }));

      setEstados(estadosFormatted);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os estados. Verifique sua conexão.',
      );
    }
  };

  /*const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        Alert.alert(
          'Erro',
          'Não foi possível obter a sua localização. Verifique as configurações do GPS.',
        );
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 12000, maximumAge: 1000},
    );
  };
  */

  const fetchCidadesFromAPI = async () => {
    try {
      const response = await axios.get<Cidades[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`,
      );
      const data = response.data;
      const cidadesFormatted = data.map(cidade => ({
        label: cidade.nome,
        value: cidade.id,
        id: cidade.id,
      }));
      //console.log('cidadesFormatted:', cidadesFormatted);
      setCidades(cidadesFormatted);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };
  useEffect(() => {
    if (estado) {
      fetchCidadesFromAPI();
    }
  }, [estado]);
  const handleValueChangeState = (value: string) => {
    setEstado(value);
  };
  const handleValueChangeCity = (value: string) => {
    setCidadeId(value);
  };
  const handlePress = async () => {
    try {
      const response = await api.get(`/buscar/eventos/${cidadeId}/${user.id}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };
  const handlePressOrganizerasync = async (organizador_id: number) => {
    try {
      const responseUsuario = await api.get(`/usuarios/${organizador_id}`);
      navigation.navigate('UserSearch', {
        selectedItem: {
          id_usuario: responseUsuario.data.id, // Acesse a propriedade id corretamente
          tipo_usuario: responseUsuario.data.tipo_usuario,
          foto_perfil: responseUsuario.data.foto_perfil,
          nome_usuario: responseUsuario.data.nome_usuario,
          seguidores: responseUsuario.data.seguidores,
          seguidos: responseUsuario.data.seguidos,
          bio: responseUsuario.data.bio,
          login: responseUsuario.data.login,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };
  const handlePressInterest = async (
    eventoId: number,
    interesseDeclarado: boolean,
  ) => {
    Alert.alert(
      interesseDeclarado ? 'Remover Interesse' : 'Declarar Interesse',
      interesseDeclarado
        ? 'Tem certeza de que deseja remover seu interesse neste evento?'
        : 'Tem certeza de que deseja declarar interesse neste evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await api.patch(
                `/eventos/${eventoId}/interesse`,
                {
                  participante_id: user.id,
                  interesse_declarado: !interesseDeclarado,
                },
              );

              const eventoAtualizado = response.data;

              // Atualiza apenas o evento específico na lista de eventos
              setEvents(prevEvents =>
                prevEvents.map(event =>
                  event.id === eventoId
                    ? {
                        ...event,
                        interesse_declarado: !interesseDeclarado,
                        quantidade_participantes:
                          eventoAtualizado.quantidade_participantes,
                      }
                    : event,
                ),
              );
            } catch (error) {
              console.error('Erro ao atualizar interesse:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao alterar o interesse.');
            }
          },
        },
      ],
    );
  };
  const handlePressInterested = async (eventoId: number) => {
    navigation.navigate('EventParticipants', {eventoId});
  };
  const renderItem = ({item}: {item: Event}) => (
    <ContainerSearchResult>
      <BodyEvent>
        <EventTitle>{item.nome}</EventTitle>
        <ContainerOrganizer>
          <View>
            <ContainerEventIcon>
              <Ionicons name="calendar" size={20} color="#934dd2" />
              <EventText>Data: {item.data_inicio}</EventText>
            </ContainerEventIcon>

            <ContainerEventIcon>
              <Ionicons name="alarm" size={20} color="#934dd2" />
              <EventText>Horário: {item.hora_inicio}</EventText>
            </ContainerEventIcon>
          </View>
          <ContainerOrganizerPicture
            onPress={() => handlePressOrganizerasync(item.organizador_id)}>
            <OrganizerPicture source={{uri: item.organizador.foto_perfil}} />
            <OrganizerText>Organizador: {item.organizador.nome}</OrganizerText>
          </ContainerOrganizerPicture>
        </ContainerOrganizer>
        <ContainerEventIcon>
          <Ionicons name="location" size={20} color="#934dd2" />
          <EventText>Local: {item.localizacao}</EventText>
        </ContainerEventIcon>

        <ContainerEventIcon>
          <Ionicons name="pencil" size={20} color="#934dd2" />
          <EventText>Descrição: {item.descricao}</EventText>
        </ContainerEventIcon>

        <ContainerEventIconButton
          onPress={() => handlePressInterested(item.id)}>
          <Ionicons name="person" size={20} color="#934dd2" />
          <EventText>Interessados: {item.quantidade_participantes}</EventText>
        </ContainerEventIconButton>

        <ContainerButtonEvent>
          <LiteButton
            texto={
              item.interesse_declarado
                ? 'Interesse Declarado'
                : 'Declarar Interesse'
            }
            onPress={() =>
              handlePressInterest(item.id, item.interesse_declarado)
            }
          />
        </ContainerButtonEvent>
      </BodyEvent>
    </ContainerSearchResult>
  );

  // Header da lista

  return (
    <ScreenBackgroundRegister>
      <FlatList
        data={events}
        renderItem={renderItem}
        ListHeaderComponent={
          <Container>
            <Header>
              <BackButton />
            </Header>

            <PageTitleContainer>
              <PageTitleText>Mural de Eventos</PageTitleText>
            </PageTitleContainer>

            <ContainerInputRegister>
              <LabelText>Estado</LabelText>
              <InputPicker
                items={estados}
                onValueChange={handleValueChangeState}
                placeholder={{label: 'Selecione seu estado', value: null}}
              />

              <LabelText>Cidade</LabelText>
              <InputPicker
                items={cidades}
                onValueChange={handleValueChangeCity}
                placeholder={{label: 'Selecione sua cidade', value: null}}
                itemKey="id"
              />

              <ContainerButton>
                <CustonButton texto="Buscar" onPress={handlePress} />
              </ContainerButton>
            </ContainerInputRegister>
          </Container>
        }
      />
    </ScreenBackgroundRegister>
  );
}
