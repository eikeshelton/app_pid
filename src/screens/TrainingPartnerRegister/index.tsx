import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView, Text, View, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
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
} from './style';
import {InputComponent} from '../../components/Input';
import BackButton from '../../components/BackButton';
import InputPicker from '../../components/InputPicker';

interface TreinoCreate {
  modalidade: string;
  estado: string;
  cidade: string;
  local: string;
  agrupamento_muscular: string;
  dia_da_semana: string;
  horario: string;
  tempo_treino: string;
  observacoes: string;
}

interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
}

export default function TrainingPartnerRegister() {
  const [modalidade, setModalidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [local, setLocal] = useState('');
  const [grupamentoMuscular, setGrupamentoMuscular] = useState('');
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [duracao, setDuracao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const treinoCreate: TreinoCreate = {
    modalidade: modalidade,
    estado: estado,
    cidade: cidade,
    local: local,
    agrupamento_muscular: grupamentoMuscular,
    dia_da_semana: dia,
    horario: hora,
    tempo_treino: duracao,
    observacoes: observacoes,
  };

  const modalidadeItems = [
    {label: 'Calistenia', value: 'Calistenia'},
    {label: 'Caminhada', value: 'Caminhada'},
    {label: 'Ciclismo', value: 'Ciclismo'},
    {label: 'Corrida', value: 'Corrida'},
    {label: 'Musculação', value: 'Musculacao'},
  ];

  const grupamentoMuscularItems = [
    {label: 'Membros Inferiores', value: 'Inferiores'},
    {label: 'Membros Superiores', value: 'Superiores'},
    {label: 'Abdome', value: 'Abdome'},
    {label: 'Bíceps', value: 'Biceps'},
    {label: 'Costas', value: 'Costas'},
    {label: 'Coxa', value: 'Coxa'},
    {label: 'Ombros', value: 'Ombros'},
    {label: 'Panturrilha', value: 'Panturrilha'},
    {label: 'Peito', value: 'Peito'},
    {label: 'Tríceps', value: 'Triceps'},
  ];

  const diaItems = [
    {label: 'Domingo', value: 'Domingo'},
    {label: 'Segunda', value: 'Segunda'},
    {label: 'Terça', value: 'Terça'},
    {label: 'Quarta', value: 'Quarta'},
    {label: 'Quinta', value: 'Quinta'},
    {label: 'Sexta', value: 'Sexta'},
    {label: 'Sábado', value: 'Sabado'},
  ];

  const horaItems = [
    {label: 'Manhã', value: 'Manha'},
    {label: 'Tarde', value: 'Tarde'},
    {label: 'Noite', value: 'Noite'},
  ];

  const duracaoItems = [
    {label: '30min', value: '30'},
    {label: '1h', value: '60'},
    {label: '1h 30min', value: '90'},
    {label: '2h', value: '120'},
    {label: '2h 30min', value: '150'},
    {label: '3h', value: '180'},
  ];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const status = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (status === RESULTS.GRANTED) {
        getLocation();
      } else {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (result === RESULTS.GRANTED) {
          getLocation();
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

  const getLocation = () => {
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

  const handlePress = async () => {
    if (latitude && longitude) {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 500,
              keyword: local,
              key: 'AIzaSyBHCKxygf6ny6ek3q2LmQvFS75JYNISMwY',
            },
          },
        );
        setPlaces(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Erro', 'Aguarde enquanto a localização é obtida.');
    }
  };

  return (
    <ScreenBackgroundRegister>
      <Header>
        <BackButton />
      </Header>

      <PageTitleContainer>
        <PageTitleText>Cadastrar Treino</PageTitleText>
      </PageTitleContainer>

      <ContainerInputRegister>
        <ScrollView>
          <LabelText>Modalidade</LabelText>
          <InputPicker
            items={modalidadeItems}
            onValueChange={(value: string) => setModalidade(value)}
            placeholder={{label: 'Obrigatório', value: null}}
          />

          <LabelText>Estado</LabelText>
          <InputComponent
            onChangeText={text => setEstado(text)}
            value={estado}
            placeholderTextColor={'silver'}
            placeholder="Obrigatório"
            isFocused={true}
          />

          <LabelText>Cidade</LabelText>
          <InputComponent
            onChangeText={text => setCidade(text)}
            value={cidade}
            placeholderTextColor={'silver'}
            placeholder="Obrigatório"
            isFocused={true}
          />

          <LabelText>Local</LabelText>
          <InputComponent
            onChangeText={text => setLocal(text)}
            value={local}
            placeholderTextColor={'silver'}
            placeholder="Opcional"
            isFocused={true}
          />

          {modalidade === 'Musculacao' && (
            <>
              <LabelText>Grupamento Muscular</LabelText>
              <InputPicker
                items={grupamentoMuscularItems}
                onValueChange={(value: string) => setGrupamentoMuscular(value)}
                placeholder={{label: 'Opcional', value: null}}
              />
            </>
          )}

          <LabelText>Dia da Semana</LabelText>
          <InputPicker
            items={diaItems}
            onValueChange={(value: string) => setDia(value)}
            placeholder={{label: 'Opcional', value: null}}
          />

          <LabelText>Horário do Treino</LabelText>
          <InputPicker
            items={horaItems}
            onValueChange={(value: string) => setHora(value)}
            placeholder={{label: 'Opcional', value: null}}
          />

          <LabelText>Duração do Treino</LabelText>
          <InputPicker
            items={duracaoItems}
            onValueChange={(value: string) => setDuracao(value)}
            placeholder={{label: 'Opcional', value: null}}
          />

          <LabelText>Observações</LabelText>
          <InputComponent
            onChangeText={text => setObservacoes(text)}
            value={observacoes}
            placeholderTextColor={'silver'}
            placeholder="Qualquer informação adicional"
            isFocused={true}
          />

          <ContainerButton>
            <CustonButton texto="Realizar cadastro" onPress={handlePress} />
          </ContainerButton>

          <View>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
          </View>

          <FlatList
            data={places}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  padding: 10,
                  backgroundColor: '#e0e0e0',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  nome: {item.name}
                </Text>
                <Text>endereço: {item.vicinity}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Total Ratings: {item.user_ratings_total}</Text>
                {item.opening_hours && item.opening_hours.open_now ? (
                  <Text style={{color: 'green'}}>Open Now</Text>
                ) : (
                  <Text style={{color: 'red'}}>Closed</Text>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}
