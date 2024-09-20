import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
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
  Header,
  PageTitleContainer,
  PageTitleText,
  ProfileImageContainer,
  TextAlterImage,
  ProfilePicture,
  ClickableText,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';
import InputPicker from '../../components/InputPicker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from '@env';
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
const EditProfile = () => {
  const navigation = useNavigation();
  const {editAvatar, user} = useAuth();

  const [bio, setBio] = useState(user.bio);
  const [usuario, setUsuario] = useState(user.nome_usuario);
  const [tipoUsuario, setTipoUsuario] = useState(user.tipo_usuario);
  const [fotoPerfil, setFotoPerfil] = useState(user.foto_perfil);

  const [showBio, setShowBio] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showTipoUsuario, setShowTipoUsuario] = useState(false);
  const [showFotoPerfil, setShowFotoPerfil] = useState(false);

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

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão de Câmera',
            message: 'Este aplicativo precisa acessar sua câmera',
            buttonNeutral: 'Perguntar Depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS ou outras plataformas que não requerem permissão manual
    }
  };
  const handlePickImage = async (source: string) => {
    const options: OptionsCommon = {
      mediaType: 'photo',
      includeBase64: false, // Não precisamos da base64 se vamos enviar o arquivo
    };

    try {
      if (source === 'camera') {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          Alert.alert(
            'Permissão Negada',
            'Permissão para acessar a câmera foi negada.',
          );
          return;
        }
      }

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
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const {uri, fileName} = result.assets[0];

        if (uri) {
          // Criar um nome de arquivo único para evitar conflitos
          const uniqueFileName = `${Date.now()}_${fileName}`;

          // Ler o arquivo usando react-native-fs
          const fileData = await RNFS.readFile(uri, 'base64');
          const buffer = Buffer.from(fileData, 'base64'); // Usando a biblioteca `buffer`

          // Configurar os parâmetros de upload
          const s3 = new AWS.S3();
          const params = {
            Bucket: 'apppid',
            Key: uniqueFileName,
            Body: buffer,
            ContentType: result.assets[0].type, // Define o tipo de conteúdo corretamente
          };

          // Enviar a imagem para o S3
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.log('Erro ao fazer upload da imagem:', err);
              Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
              return;
            }
            console.log('Upload realizado com sucesso:', data.Location);

            // Salvar a URL da imagem no estado
            setFotoPerfil(data.Location);
          });
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <PageTitleContainer>
        <PageTitleText>Editar Perfil de Usuário</PageTitleText>
      </PageTitleContainer>

      <ContainerInputBio showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View>
            <TouchableOpacity onPress={() => setShowUsuario(!showUsuario)}>
              <ClickableText>Nome</ClickableText>
            </TouchableOpacity>
            {showUsuario && (
              <InputComponent
                onChangeText={text => setUsuario(text)}
                value={usuario}
                placeholderTextColor={'silver'}
                placeholder="Nome do usuário"
                isFocused={true}
              />
            )}
          </View>

          <View>
            <TouchableOpacity
              onPress={() => setShowTipoUsuario(!showTipoUsuario)}>
              <ClickableText>Tipo de usuário</ClickableText>
            </TouchableOpacity>
            {showTipoUsuario && (
              <InputPicker
                items={[
                  {label: 'Atleta', value: 'Atleta'},
                  {label: 'Entusiasta', value: 'Entusiasta'},
                  {label: 'Nutricionista', value: 'Nutricionista'},
                  {label: 'Treinador', value: 'Treinador'},
                ]}
                onValueChange={(value: string) => setTipoUsuario(value)}
                placeholder={{
                  label: 'Selecione o tipo de usuário',
                  value: null,
                }}
              />
            )}
          </View>

          <View>
            <TouchableOpacity onPress={() => setShowBio(!showBio)}>
              <ClickableText>Bio</ClickableText>
            </TouchableOpacity>
            {showBio && (
              <InputComponent
                onChangeText={text => setBio(text)}
                value={bio}
                placeholderTextColor={'silver'}
                placeholder="Bio"
                isFocused={true}
              />
            )}
          </View>

          <View>
            <TouchableOpacity
              onPress={() => setShowFotoPerfil(!showFotoPerfil)}>
              <ClickableText>Foto de perfil</ClickableText>
            </TouchableOpacity>
            {showFotoPerfil && (
              <ProfileImageContainer onPress={tirarFoto}>
                {fotoPerfil ? (
                  <ProfilePicture source={{uri: fotoPerfil}} />
                ) : (
                  <>
                    <ProfilePicture source={{uri: fotoPerfil}} />
                    <TextAlterImage>Adicionar foto</TextAlterImage>
                  </>
                )}
                <TextAlterImage>Alterar foto</TextAlterImage>
              </ProfileImageContainer>
            )}
          </View>
          <ButtonSave>
            <CustonButton
              texto="Salvar alterações"
              onPress={handleUpdateUser}
            />
          </ButtonSave>
        </ScrollView>
      </ContainerInputBio>
    </Container>
  );
};

export default EditProfile;
