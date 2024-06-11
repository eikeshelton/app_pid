import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView, Text, View, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustonButton from '../../components/CustomizeButton';
import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {InputComponent} from '../../components/Input';

interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
}

export default function TrainingPartner() {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [grupamentoMuscular, setGrupamentoMuscular] = useState('');
  const [local, setLocal] = useState('');
  const [sexo, setSexo] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);
  console.log(latitude, longitude);
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
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <InputComponent
            onChangeText={text => setData(text)}
            value={data}
            placeholderTextColor={'white'}
            placeholder="Data:"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setHorario(text)}
            value={horario}
            placeholderTextColor={'white'}
            placeholder="Horário:"
            isFocused={true}
          />

          <InputComponent
            onChangeText={text => setGrupamentoMuscular(text)}
            value={grupamentoMuscular}
            placeholderTextColor={'white'}
            placeholder="Grupamento muscular:"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setLocal(text)}
            value={local}
            placeholderTextColor={'white'}
            placeholder="Local:"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setSexo(text)}
            value={sexo}
            placeholderTextColor={'white'}
            placeholder="Sexo:"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setModalidade(text)}
            value={modalidade}
            placeholderTextColor={'white'}
            placeholder="Modalidade:"
            isFocused={true}
          />

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
                  nome:{item.name}
                </Text>
                <Text>endereço:{item.vicinity}</Text>
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

        <CustonButton texto="Procurar" onPress={handlePress} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}
