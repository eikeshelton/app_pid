import React, {useEffect, useState} from 'react';
import {Input} from '../../components/Input/style';
import {FlatList} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Background,
  Container,
  Name,
  PictureContainer,
  ProfilePicture,
} from './style';

import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useNavigation} from '@react-navigation/native';
export default function Research() {
  const navigation = useNavigation();
  const {userssearch, Search} = useAuth();
  const [pesquisar, setPesquisar] = useState('');

  const handleChangeText = (text: string) => {
    setPesquisar(text);
  };
  useEffect(() => {
    if (pesquisar.length > 0) {
      handleChangeText(pesquisar);
      handleLogin();
    }
  }, [pesquisar]);
  const handleLogin = React.useCallback(() => {
    Search({
      login: pesquisar,
    }).catch(_error => {
      console.error(_error);
    });
  }, [Search, pesquisar]);
  const handleItemPress = (item: any) => {
    navigation.navigate('UserSearch', {selectedItem: item});
  };
  const renderItem = ({item}: any) => (
    <PictureContainer onPress={() => handleItemPress(item)}>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="contain" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.login}</Name>
      <Name>{item.tipo_usuario}</Name>
    </PictureContainer>
  );

  return (
    <Background>
      <Container>
        <Input
          onChangeText={handleChangeText}
          value={pesquisar}
          placeholderTextColor={'white'}
          placeholder="Pesquisar"
        />

        <FlatList
          data={userssearch}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </Container>
    </Background>
  );
}
