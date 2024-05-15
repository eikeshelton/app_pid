import React, {useState} from 'react';
import {Input} from '../../components/Input/style';
import {Alert, FlatList} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Background,
  Container,
  Name,
  PictureContainer,
  ProfilePicture,
} from './style';
import CustomButton from '../../components/CustomizeButton';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
export default function Research() {
  const {usersearch, Search} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [pesquisar, setPesquisar] = useState('');

  const handleLogin = React.useCallback(() => {
    Search({
      login: pesquisar,
    }).catch(_error => {
      setShowAlert(true);
    });
  }, [Search, pesquisar]);

  if (showAlert === true) {
    Alert.alert('Erro ', 'Usuário não encontrado', [
      {
        text: 'OK',
        onPress: () => setShowAlert(false),
      },
    ]);
  }
  const handleChangeText = (text: string) => {
    // Atualizar o estado de 'pesquisar' e chamar handleLogin
    setPesquisar(text);
    handleLogin();
  };
  const renderItem = ({item}: any) => (
    <PictureContainer>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="contain" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.nome_usuario}</Name>
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
        <CustomButton texto="pesquisar" onPress={handleLogin} />
        <FlatList
          data={usersearch}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </Container>
    </Background>
  );
}
