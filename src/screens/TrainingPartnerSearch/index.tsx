import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustonButton from '../../components/CustomizeButton';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
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
  SelectLocation,
  SelectLocationTitle,
  SelectLocationSubTitle,
  PictureContainer,
  ProfilePicture,
  Name,
} from './style';
import {InputComponent} from '../../components/Input';
import BackButton from '../../components/BackButton';
import InputPicker from '../../components/InputPicker';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';

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
interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
}

export default function TrainingPartnerSearch() {
  const [modalidade, setModalidade] = useState('');
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [estado, setEstado] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidadeId, setCidadeId] = useState('');
  const [local, setLocal] = useState<string | undefined>(undefined);
  const [grupamentoMuscular, setGrupamentoMuscular] = useState<string | null>(
    null,
  );

  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [duracao, setDuracao] = useState<string | null>(null);
  const [sexo, setSexo] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {PartnerSearch, usersPartner, RegisterSearch, user} = useAuth();

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

  const duracaoItems = [
    {label: '30min', value: '00:30'},
    {label: '1h', value: '01:00'},
    {label: '1h 30min', value: '01:30'},
    {label: '2h', value: '02:00'},
    {label: '2h 30min', value: '02:30'},
    {label: '3h', value: '03:00'},
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
  const navigation = useNavigation();
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
  };*/

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
                key: 'AIzaSyBHCKxygf6ny6ek3q2LmQvFS75JYNISMwY',
              },
            },
          );
          //console.log('latitude api', latitude, 'longitude api', longitude);
          setPlaces(response.data.results);
          console.log(response.data.results);
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
      setEstadoId(estadoSelecionada.id); // Aqui definimos o ID selecionado
      console.log('estado selecionado:', estadoSelecionada.label);
      console.log('id estado:', estadoSelecionada.id);
    }
  };
  const handleValueChangeCity = async (value: string) => {
    const cidadeSelecionada = cidades.find(cidade => cidade.value === value);
    if (cidadeSelecionada) {
      setCidadeId(cidadeSelecionada.id); // Aqui definimos o ID selecionado
      console.log('Cidade selecionada:', cidadeSelecionada.label);
      console.log('id Cidade:', value);
      try {
        const response = await axios.get(
          `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${cidadeSelecionada.id}/metadados`,
        );
        //console.log('Dados da cidade:', response.data);
        const {latitude, longitude} = response.data[0].centroide;
        console.log('latitude da cidade:', latitude);
        console.log('longitude da cidade:', longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (err) {
        console.error('Erro ao buscar dados da cidade:', err);
      }
    }
  };
  const renderItem = ({item}: any) => (
    <PictureContainer onPress={() => handleItemPress(item)}>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.nome_usuario}</Name>
      <Name>{item.modalidade}</Name>
    </PictureContainer>
  );
  const handleItemPress = (item: any) => {
    navigation.navigate('UserSearch', {selectedItem: item});
    RegisterSearch({
      usuario_id: user.id,
      pesquisado_id: item.id_usuario,
    });
  };
  const handlePress = () => {
    PartnerSearch({
      modalidade: modalidade,
      dia_da_semana: dia,
      estado_codigo_ibge: parseInt(estadoId, 10),
      local: local,
      municipio_codigo_ibge: parseInt(cidadeId, 10),
      agrupamento_muscular: grupamentoMuscular,
      tempo_treino: duracao,
      horario: hora,
      sexo: sexo,
    });
    console.log('Modalidade:', modalidade);
    console.log('Dia da Semana:', dia);
    console.log('Estado Código IBGE:', parseInt(estadoId, 10));
    console.log('Município Código IBGE:', parseInt(cidadeId, 10));
    console.log('Agrupamento Muscular:', grupamentoMuscular);
    console.log('Horário:', hora);
    console.log('ID Usuário:', user.id);
    console.log('Tempo de Treino:', duracao);
    console.log('Local:', local);
  };

  return (
    <ScreenBackgroundRegister>
      <Header>
        <BackButton />
      </Header>

      <ScrollView scrollEnabled={scrollEnabled}>
        <PageTitleContainer>
          <PageTitleText>Buscar Parceiro</PageTitleText>
        </PageTitleContainer>

        <ContainerInputRegister>
          <LabelText>Modalidade</LabelText>
          <InputPicker
            items={modalidadeItems}
            onValueChange={(value: string) => setModalidade(value)}
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
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={places}
            renderItem={({item}) => (
              <SelectLocation onPress={() => setLocal(item.name)}>
                <SelectLocationTitle>{item.name}</SelectLocationTitle>
                <SelectLocationSubTitle>{item.vicinity}</SelectLocationSubTitle>
              </SelectLocation>
            )}
            keyExtractor={item => item.name}
          />

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
                  onOpen={() => toggleScroll(false)}
                  onClose={() => toggleScroll(true)}
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
              onOpen={() => toggleScroll(false)}
              onClose={() => toggleScroll(true)}
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
              onOpen={() => toggleScroll(false)}
              onClose={() => toggleScroll(true)}
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
              onOpen={() => toggleScroll(false)}
              onClose={() => toggleScroll(true)}
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
              onOpen={() => toggleScroll(false)}
              onClose={() => toggleScroll(true)}
            />
          )}

          <ContainerButton>
            <CustonButton texto="Buscar" onPress={handlePress} />
          </ContainerButton>
        </ContainerInputRegister>

        <PageTitleContainer>
          <PageTitleText>Resultado da Busca</PageTitleText>
        </PageTitleContainer>

        <ContainerSearchResult>
          <FlatList
            scrollEnabled={false}
            data={usersPartner}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </ContainerSearchResult>
      </ScrollView>
    </ScreenBackgroundRegister>
  );
}
