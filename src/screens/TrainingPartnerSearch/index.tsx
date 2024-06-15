import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustonButton from '../../components/CustomizeButton';
import {
  ContainerInputRegister,
  Header,
  PageTitleContainer,
  PageTitleText,
  ScreenBackgroundRegister,
  ClickableText,
  ContainerButton,
  LabelText,
  ContainerSearchResult,
} from './style';
import {InputComponent} from '../../components/Input';
import BackButton from '../../components/BackButton';
import InputPicker from '../../components/InputPicker';

interface BuscaParceiroCreate {
  modalidade: string;
  estado: string;
  cidade: string;
  local: string;
  agrupamento_muscular: string;
  dia_da_semana: string;
  horario: string;
  tempo_treino: string;
  sexo: string;
}

interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
}

export default function TrainingPartnerSearch() {
  const [modalidade, setModalidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [local, setLocal] = useState('');
  const [grupamentoMuscular, setGrupamentoMuscular] = useState('');
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [duracao, setDuracao] = useState('');
  const [sexo, setSexo] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const buscaParceiroCreate: BuscaParceiroCreate = {
    modalidade: modalidade,
    estado: estado,
    cidade: cidade,
    local: local,
    agrupamento_muscular: grupamentoMuscular,
    dia_da_semana: dia,
    horario: hora,
    tempo_treino: duracao,
    sexo: sexo,
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

  const sexoItems = [
    {label: 'Masculino', value: 'Masculino'},
    {label: 'Feminino', value: 'Feminino'},
  ];

  const [showLocal, setShowLocal] = useState(false);
  const [showGrupamentoMuscular, setShowGrupamentoMuscular] = useState(false);
  const [showDia, setShowDia] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [showDuracao, setShowDuracao] = useState(false);
  const [showSexo, setShowSexo] = useState(false);

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

      <ScrollView>
        <PageTitleContainer>
          <PageTitleText>Buscar Parceiro</PageTitleText>
        </PageTitleContainer>

        <ContainerInputRegister>
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

          <TouchableOpacity onPress={() => setShowLocal(!showLocal)}>
            <ClickableText>Local</ClickableText>
          </TouchableOpacity>
          {showLocal && (
            <InputComponent
              onChangeText={text => setLocal(text)}
              value={local}
              placeholderTextColor={'silver'}
              placeholder="Opcional"
              isFocused={true}
            />
          )}

          {modalidade === 'Musculacao' && (
            <>
              <TouchableOpacity
                onPress={() =>
                  setShowGrupamentoMuscular(!showGrupamentoMuscular)
                }>
                <ClickableText>Grupamento Muscular</ClickableText>
              </TouchableOpacity>
              {showGrupamentoMuscular && (
                <InputPicker
                  items={grupamentoMuscularItems}
                  onValueChange={(value: string) =>
                    setGrupamentoMuscular(value)
                  }
                  placeholder={{label: 'Opcional', value: null}}
                />
              )}
            </>
          )}

          <TouchableOpacity onPress={() => setShowDia(!showDia)}>
            <ClickableText>Dia da Semana</ClickableText>
          </TouchableOpacity>
          {showDia && (
            <InputPicker
              items={diaItems}
              onValueChange={(value: string) => setDia(value)}
              placeholder={{label: 'Opcional', value: null}}
            />
          )}

          <TouchableOpacity onPress={() => setShowHora(!showHora)}>
            <ClickableText>Horário do Treino</ClickableText>
          </TouchableOpacity>
          {showHora && (
            <InputPicker
              items={horaItems}
              onValueChange={(value: string) => setHora(value)}
              placeholder={{label: 'Opcional', value: null}}
            />
          )}

          <TouchableOpacity onPress={() => setShowDuracao(!showDuracao)}>
            <ClickableText>Duração do Treino</ClickableText>
          </TouchableOpacity>
          {showDuracao && (
            <InputPicker
              items={duracaoItems}
              onValueChange={(value: string) => setDuracao(value)}
              placeholder={{label: 'Opcional', value: null}}
            />
          )}

          <TouchableOpacity onPress={() => setShowSexo(!showSexo)}>
            <ClickableText>Sexo</ClickableText>
          </TouchableOpacity>
          {showSexo && (
            <InputPicker
              items={sexoItems}
              onValueChange={(value: string) => setSexo(value)}
              placeholder={{label: 'Opcional', value: null}}
            />
          )}

          <ContainerButton>
            <CustonButton texto="Buscar" onPress={handlePress} />
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
        </ContainerInputRegister>

        <PageTitleContainer>
          <PageTitleText>Resultado da Busca</PageTitleText>
        </PageTitleContainer>

        <ContainerSearchResult>
          <LabelText>...</LabelText>
        </ContainerSearchResult>
      </ScrollView>
    </ScreenBackgroundRegister>
  );
}
