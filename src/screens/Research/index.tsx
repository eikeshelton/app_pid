import React, {useEffect, useState} from 'react';
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
import {ModalHistory} from '../../components/ModalHistory';
import {InputComponent} from '../../components/Input';

export default function Research() {
  const navigation = useNavigation();
  const {userssearch, Search, clearUsersSearch, RegisterSearch, user} =
    useAuth();
  const [pesquisar, setPesquisar] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChangeText = (text: string) => {
    setPesquisar(text);
  };

  useEffect(() => {
    if (pesquisar.length > 0) {
      handleChangeText(pesquisar);
      handleLogin();
    } else {
      clearUsersSearch();
      // Chame a função para limpar userssearch
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
    RegisterSearch({
      usuario_id: user.id,
      pesquisado_id: item.id_usuario,
    });
  };

  const renderItem = ({item}: any) => (
    <PictureContainer onPress={() => handleItemPress(item)}>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.login}</Name>
      <Name>{item.tipo_usuario}</Name>
    </PictureContainer>
  );

  const showmodels = () => {
    if (pesquisar.length === 0) {
      setShowModal(true);
    }
  };

  return (
    <Background>
      <Container>
        <InputComponent
          onChangeText={handleChangeText}
          value={pesquisar}
          placeholderTextColor={'silver'}
          placeholder="Pesquisar"
          isFocused={true} // O campo está focado quando esta prop é true
          showModels={showmodels}
        />

        <FlatList
          data={userssearch}
          renderItem={renderItem}
          keyExtractor={item => item.id_usuario.toString()}
          numColumns={2}
        />
      </Container>
      <ModalHistory
        onDismiss={() => setShowModal(false)}
        showModal={showModal}
      />
    </Background>
  );
}
