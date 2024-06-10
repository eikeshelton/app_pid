import React, {useState} from 'react';
import {
  Container,
  Header,
  PictureContainer,
  ProfilePicture,
  Name,
} from './style';
import BackButton from '../../components/BackButton';
import {useAuth} from '../../hooks/auth';
import {InputComponent} from '../../components/Input';
import {FlatList} from 'react-native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
export function ScreenChat() {
  const {userssearch} = useAuth();
  const [pesquisar, setPesquisar] = useState('');
  const renderItem = ({item}: any) => (
    <PictureContainer>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="contain" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.nome_usuario}</Name>
    </PictureContainer>
  );
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <InputComponent
        onChangeText={setPesquisar}
        value={pesquisar}
        placeholderTextColor={'white'}
        placeholder="Pesquisar:"
        isFocused={true} // O campo está focado quando esta prop é true
        inputId={22}
      />
      <FlatList
        data={userssearch}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
}
