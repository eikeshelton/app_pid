import React, {useEffect, useState} from 'react';
import {
  Container,
  ModalContent,
  Name,
  PictureContainer,
  ProfilePicture,
  Title,
} from './styles';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';

interface Props {
  showModal: boolean;
  onDismiss: () => void;
}

interface User {
  id_usuario: number;
  nome_usuario: string;
  foto_perfil: string | null;
  tipo_usuario: string;
}

export function ModalHistory({showModal, onDismiss}: Props) {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [registeredUsers, setUserRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (showModal) {
      callRegistered();
    }
  }, [showModal]);

  const handleItemPress = (item: User) => {
    navigation.navigate('UserSearch', {selectedItem: item});
  };

  async function callRegistered() {
    try {
      const usuario_id = user.id;
      const response = await api.get(`/usuarios-pesquisados/${usuario_id}`);
      if (response.data) {
        setUserRegisteredUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({item}: {item: User}) => {
    return (
      <PictureContainer onPress={() => handleItemPress(item)}>
        <ProfilePicture
          source={item.foto_perfil ? {uri: item.foto_perfil} : fotoPerfil}
          resizeMode="cover"
        />
        <Name>{item.nome_usuario}</Name>
        <Name>{item.tipo_usuario}</Name>
      </PictureContainer>
    );
  };

  return (
    <Container
      isVisible={showModal}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}>
      <ModalContent>
        <Title>Pesquisados Recentemente</Title>
        <FlatList
          data={registeredUsers}
          renderItem={renderItem}
          keyExtractor={item => item.id_usuario.toString()}
          numColumns={2}
        />
      </ModalContent>
    </Container>
  );
}
