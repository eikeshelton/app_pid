// EditProfileScreen.js
import React, {useState} from 'react';
import {Alert} from 'react-native';
import TopImage from '../../components/TopImage';
import CustonButton from '../../components/CustomizeButton';
import {
  OptionsCommon,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  ButtonSave,
  Container,
  ContainerInputBio,
  ProfileImageContainer,
  TextAlterImage,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';

const EditProfile = () => {
  const navigation = useNavigation();
  const {editAvatar, user} = useAuth();

  const [bio, setBio] = useState(user.bio);
  const [usuario, setUsuario] = useState(user.nome_usuario);
  const [tipoUsuario, setTipoUsuario] = useState(user.tipo_usuario);
  const [fotoPerfil, setFotoPerfil] = useState(user.foto_perfil);

  const tirarFoto = async () => {
    Alert.alert('Escolha uma opção', 'De onde você quer selecionar a foto?', [
      {
        text: 'Galeria',
        onPress: () => handlePickImage('galeria'),
      },
      {
        text: 'Câmera',
        onPress: () => handlePickImage('camera'),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  async function handleUpdateUser() {
    await editAvatar({
      email: user.email,
      bio: bio,
      foto_perfil: fotoPerfil,
      nome_usuario: usuario,
      tipo_usuario: tipoUsuario,
    }).then(() => {
      navigation.goBack();
    });
  }

  const handlePickImage = async (source: string) => {
    const options: OptionsCommon = {
      mediaType: 'photo',
      includeBase64: true,
    };

    try {
      const result =
        source === 'camera'
          ? await launchCamera(options)
          : await launchImageLibrary(options);

      if (result.errorCode || result.errorMessage) {
        console.log(
          'Erro ao capturar a nova foto:',
          result.errorCode,
          result.errorMessage,
        );

        return true;
      }

      if (result.assets) {
        const {base64} = result.assets[0];

        if (base64) {
          return setFotoPerfil(base64);
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar a imagem da galeria:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem da galeria.');
    }
  };

  return (
    <Container>
      <BackButton />
      <TopImage />
      <ContainerInputBio showsVerticalScrollIndicator={false}>
        <InputComponent
          onChangeText={text => setUsuario(text)}
          value={usuario}
          placeholderTextColor={'white'}
          placeholder="Nome do usuário:"
          isFocused={true} // O campo está focado quando esta prop é true
          inputId={3}
        />
        <InputComponent
          onChangeText={text => setTipoUsuario(text)}
          value={tipoUsuario}
          placeholderTextColor={'white'}
          placeholder="Tipo de usuário:"
          isFocused={true} // O campo está focado quando esta prop é true
          inputId={4}
        />
        <InputComponent
          onChangeText={text => setBio(text)}
          value={bio}
          placeholderTextColor={'white'}
          placeholder="Bio:"
          isFocused={true} // O campo está focado quando esta prop é true
          inputId={5}
        />

        <ProfileImageContainer onPress={tirarFoto}>
          <TextAlterImage>alterar foto</TextAlterImage>
        </ProfileImageContainer>
      </ContainerInputBio>
      <ButtonSave>
        <CustonButton texto="Salvar alterações" onPress={handleUpdateUser} />
      </ButtonSave>
    </Container>
  );
};
export default EditProfile;
