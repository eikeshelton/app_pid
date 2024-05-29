import React from 'react';
import {
  Container,
  ModalContent,
  Name,
  PictureContainer,
  ProfilePicture,
} from './styles';
import {useAuth} from '../../hooks/auth';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
interface Props {
  showModal: boolean;
  onDismiss: () => void;
}

export function ModalHistory({showModal, onDismiss}: Props) {
  const {registerSearch} = useAuth();
  const navigation = useNavigation();
  const handleItemPress = (item: any) => {
    navigation.navigate('UserSearch', {selectedItem: item});
  };
  const renderItem = ({item}: any) => {
    return (
      <PictureContainer onPress={() => handleItemPress(item)}>
        {item.foto_perfil ? (
          <ProfilePicture
            source={{uri: item.foto_perfil}}
            resizeMode="contain"
          />
        ) : (
          <ProfilePicture source={fotoPerfil} resizeMode="contain" />
        )}
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
        <FlatList
          data={registerSearch}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          numColumns={2}
        />
      </ModalContent>
    </Container>
  );
}
