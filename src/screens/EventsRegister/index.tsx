import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Platform, FlatList} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustonButton from '../../components/CustomizeButton';
import {
  ContainerButton,
  ContainerInputRegister,
  Header,
  LabelText,
  PageTitleContainer,
  PageTitleText,
  ScreenBackgroundRegister,
  SelectLocation,
  SelectLocationSubTitle,
  SelectLocationTitle,
} from './styles';
import {InputComponent} from '../../components/Input';
import BackButton from '../../components/BackButton';
import InputPicker from '../../components/InputPicker';
import {GOOGLE_PLACE_API_KEY} from '@env';
import {AutoExpandingTextInput} from '../../components/InputAdapted';
import {format} from 'date-fns';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';
interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
  place_id: string;
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
  const {user} = useAuth();
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [estado, setEstado] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidadeId, setCidadeId] = useState('');
  const [local, setLocal] = useState<string | undefined>(undefined);
  const [observacoes, setObservacoes] = useState<string | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [hora, setHora] = useState<string | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const gerarHorarios = () => {
    let horarios = [];
    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        let horaFormatada = String(hora).padStart(2, '0');
        let minutoFormatado = String(minuto).padStart(2, '0');
        horarios.push({
          label: `${horaFormatada}:${minutoFormatado}`,
          value: `${horaFormatada}:${minutoFormatado}`,
        });
      }
    }
    return horarios;
  };
  const [horaItems] = useState(gerarHorarios());
  const CleanLocation = () => {
    if (local?.length === 0) {
      setPlaces([]);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    fetchEstadosFromAPI();
    CleanLocation();
  }, [local]);
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

  useEffect(() => {
    const fetchPlaces = async () => {
      if (latitude && longitude && local) {
        try {
          const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            {
              params: {
                location: `${latitude},${longitude}`,
                radius: 225347,
                keyword: local,
                key: GOOGLE_PLACE_API_KEY,
              },
            },
          );
          //console.log('latitude api', latitude, 'longitude api', longitude);
          setPlaces(response.data.results);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPlaces();
  }, [local, latitude, longitude]);
  const toggleScroll = (enabled: boolean) => {
    setScrollEnabled(enabled);
  };
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
    const estadoSelecionada = estados.find(estado => estado.value === value);
    if (estadoSelecionada) {
      setEstado(estadoSelecionada.value); // Aqui definimos o valor selecionado

      //console.log('estado selecionado:', estadoSelecionada.label);
      //console.log('id estado:', estadoSelecionada.id);
    }
  };
  const handleValueChangeCity = async (value: string) => {
    const cidadeSelecionada = cidades.find(cidade => cidade.value === value);
    if (cidadeSelecionada) {
      setCidadeId(cidadeSelecionada.id); // Aqui definimos o ID selecionado
      //console.log('Cidade selecionada:', cidadeSelecionada.label);
      //console.log('id Cidade:', value);
      try {
        const response = await axios.get(
          `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${cidadeSelecionada.id}/metadados`,
        );
        //console.log('Dados da cidade:', response.data);
        const {latitude, longitude} = response.data[0].centroide;
        //console.log('latitude da cidade:', latitude);
        //console.log('longitude da cidade:', longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (err) {
        console.error('Erro ao buscar dados da cidade:', err);
      }
    }
  };
  const handlePress = async () => {
    try {
      // Limpa a data de nascimento
      const cleanedText = dataNascimento.replace(/\D/g, '');
      const dia = cleanedText.substring(0, 2);
      const mes = cleanedText.substring(2, 4);
      const ano = cleanedText.substring(4, 8);

      const novaData = new Date(
        parseInt(ano, 10),
        parseInt(mes, 10) - 1,
        parseInt(dia, 10),
      );

      const dataFormatada = format(novaData, 'yyyy-MM-dd');

      // Aguarda a resposta da API
      const response = await api.post('/evento/cadastrar/', {
        organizador_id: user.id,
        nome: nome,
        descricao: observacoes,
        data_inicio: dataFormatada,
        hora_inicio: hora,
        localizacao: local,
        municipio_id: cidadeId,
      });

      // Loga a resposta da API
      Alert.alert('Sucesso', response.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Events'), // Navega para a tela de eventos
        },
      ]);
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error);
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar o evento. Tente novamente mais tarde.',
      );
    }
  };

  return (
    <ScreenBackgroundRegister>
      <Header>
        <BackButton />
      </Header>

      <PageTitleContainer>
        <PageTitleText>Cadastrar Evento</PageTitleText>
      </PageTitleContainer>

      <ContainerInputRegister>
        <ScrollView scrollEnabled={scrollEnabled}>
          <LabelText>Nome do Evento</LabelText>
          <InputComponent
            onChangeText={text => setNome(text)}
            value={nome}
            placeholderTextColor={'silver'}
            placeholder="ex: corrida no parque da cidade"
            isFocused={true}
          />
          <LabelText>Descrição do Evento</LabelText>
          <AutoExpandingTextInput
            textAlignVertical="top"
            onChangeText={text => setObservacoes(text)}
            value={observacoes}
            placeholderTextColor={'silver'}
            placeholder="ex: corrida beneficente para arrecadar dinheiro
            para o hospital da criança "
            isFocused={true}
          />
          <LabelText>Data do Evento</LabelText>
          <InputComponent
            onChangeText={(extracted: any) => {
              return setDataNascimento(extracted);
            }}
            mask="[00]/[00]/[0000]"
            placeholderTextColor={'silver'}
            placeholder="(DD/MM/AAAA)"
            keyboardType="numeric"
            isFocused={true}
          />
          <LabelText>Horário do Evento</LabelText>
          <InputPicker
            items={horaItems}
            onValueChange={(value: string) => setHora(value)}
            placeholder={{label: 'Obrigatório', value: null}}
            onOpen={() => toggleScroll(false)}
            onClose={() => toggleScroll(true)}
          />
          <LabelText>Estado</LabelText>
          <InputPicker
            items={estados}
            onValueChange={handleValueChangeState}
            placeholder={{label: 'Obrigatório', value: null}}
            onOpen={() => toggleScroll(false)}
            onClose={() => toggleScroll(true)}
          />
          <LabelText>Cidade</LabelText>
          <InputPicker
            items={cidades}
            onValueChange={handleValueChangeCity}
            placeholder={{label: 'Obrigatório', value: null}}
            onOpen={() => toggleScroll(false)}
            onClose={() => toggleScroll(true)}
            itemKey="id"
          />

          <LabelText>Local</LabelText>
          <InputComponent
            onChangeText={text => setLocal(text)}
            value={local}
            placeholderTextColor={'silver'}
            placeholder="Opcional"
            isFocused={true}
          />

          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={places}
            renderItem={({item}) => (
              <SelectLocation
                onPress={() => {
                  setLocal(item.name);
                  setPlaces([]);
                }}>
                <SelectLocationTitle>{item.name}</SelectLocationTitle>
                <SelectLocationSubTitle>{item.vicinity}</SelectLocationSubTitle>
              </SelectLocation>
            )}
            keyExtractor={item => item.place_id}
          />

          <ContainerButton>
            <CustonButton texto="Realizar cadastro" onPress={handlePress} />
          </ContainerButton>
        </ScrollView>
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}
