import React, {useState} from 'react';
import {
  Container,
  ContainerBackButton,
  GuildeContainer,
  GuildeImage,
  GuildeImageButton,
  Guildetitle,
  GuildetitleContainer,
  IconBack,
  ModalContent,
  ModalPicture,
  ModalPictureContainer,
  ModalTitle,
  Title,
  TitleCamera,
} from './styles';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import api from '../../services/api';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from '@env';
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
import CustomButton from '../CustomizeButton';

import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  OptionsCommon,
} from 'react-native-image-picker';
import {InputComponent} from '../Input';
import {useAuth} from '../../hooks/auth';
import {AutoExpandingTextInput} from '../InputAdapted';

interface Props {
  showModal: boolean;
  onDismiss: () => void;
}

export function ModalGuildeCreate({showModal, onDismiss}: Props) {
  const {user} = useAuth();
  const linkCameraFoto = 'https://apppid.s3.amazonaws.com/fotoCamera.png';
  const [fotoCapa, setFotoCapa] = useState(linkCameraFoto);
  const [fotoGuia, setFotoGuia] = useState(linkCameraFoto);
  const [tituloCapa, setTituloCapa] = useState('');
  const [textoGuia, setTextoGuia] = useState('');
  const [tituloGuia, setTituloGuia] = useState('');
  const tirarFoto = async (tipoFoto: string) => {
    Alert.alert('Escolha uma opção', 'De onde você quer selecionar a foto?', [
      {
        text: 'Galeria',
        onPress: () => handlePickImage('galeria', tipoFoto),
      },
      {
        text: 'Câmera',
        onPress: () => handlePickImage('camera', tipoFoto),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };
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
  const handlePickImage = async (source: string, tipoFoto: string) => {
    const options: OptionsCommon = {
      mediaType: 'photo',
      includeBase64: false,
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
        const {uri} = result.assets[0];

        if (uri) {
          // Salva o URI local da imagem no estado para pré-visualização
          if (tipoFoto === 'capa') {
            setFotoCapa(uri);
          } else {
            setFotoGuia(uri);
          }

          // Agora você pode chamar a função para fazer o upload para o AWS S3
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  // Função separada para o upload da imagem
  const uploadImagesToS3 = async () => {
    try {
      // Função para ler e preparar o upload de uma imagem para o S3
      const uploadImage = async (uri: string) => {
        const fileData = await RNFS.readFile(uri, 'base64');
        const buffer = Buffer.from(fileData, 'base64');
        const fileName = uri.split('/').pop() || `${Date.now()}.jpg`;

        const s3 = new AWS.S3();
        const params = {
          Bucket: 'apppid',
          Key: fileName,
          Body: buffer,
          ContentType: 'image/jpeg',
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.log('Erro ao fazer upload da imagem:', err);
              reject(err);
            } else {
              console.log('Upload realizado com sucesso:', data.Location);
              resolve(data.Location);
            }
          });
        });
      };

      // Executando os uploads em paralelo
      const [fotoCapaUrl, fotoGuiaUrl] = (await Promise.all([
        uploadImage(fotoCapa),
        uploadImage(fotoGuia),
      ])) as [string, string];

      // Após ambos os uploads serem concluídos, registrar a guia
      await RegisterGuide(fotoCapaUrl, fotoGuiaUrl);
      Alert.alert('Sucesso', 'Guia registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      Alert.alert('Erro', 'Não foi possível fazer upload das imagens.');
    }
  };

  // Ajustar a função RegisterGuide para receber as URLs das fotos
  const RegisterGuide = async (fotoCapaUrl: string, fotoGuiaUrl: string) => {
    try {
      const response = await api.post('/cadastrar/guia/', {
        titulo: tituloCapa,
        foto_url: fotoCapaUrl,
        id_usuario: user.id,
        foto_guia: fotoGuiaUrl,
        titulo_guia: tituloGuia,
        texto_guia: textoGuia,
      });
      console.log('Guia cadastrada com sucesso:', response.data);
      if (response.data) {
        setFotoCapa(linkCameraFoto);
        setFotoGuia(linkCameraFoto);
        setTextoGuia('');
        setTituloCapa('');
        setTituloGuia('');
        onDismiss();
      }
    } catch (error) {
      console.error('Erro ao registrar a guia:', error);
      Alert.alert('Erro', 'Não foi possível registrar a guia.');
    }
  };

  const handleItemPress = () => {
    uploadImagesToS3();
  };
  const Cancel = () => {
    onDismiss();
    setFotoCapa(linkCameraFoto);
    setFotoGuia(linkCameraFoto);
  };

  return (
    <Container
      isVisible={showModal}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}>
      <ModalContent>
        <ContainerBackButton onPress={Cancel}>
          <IconBack name="arrow-back" />
        </ContainerBackButton>
        <Title>Adicionar nova guia</Title>

        <InputComponent
          placeholder="Título da capa"
          placeholderTextColor={'silver'}
          value={tituloCapa}
          onChangeText={setTituloCapa}
          isFocused={false}
        />

        <GuildeContainer>
          <GuildetitleContainer>
            <Guildetitle adjustsFontSizeToFit numberOfLines={3}>
              {tituloCapa}
            </Guildetitle>
          </GuildetitleContainer>
          <TitleCamera>foto da foto capa</TitleCamera>
          <GuildeImageButton onPress={() => tirarFoto('capa')}>
            <GuildeImage source={{uri: fotoCapa}} resizeMode="cover" />
          </GuildeImageButton>
        </GuildeContainer>

        <InputComponent
          placeholder="Título do guia"
          placeholderTextColor={'silver'}
          value={tituloGuia}
          onChangeText={setTituloGuia}
          isFocused={false}
        />
        <ModalTitle>{tituloGuia}</ModalTitle>
        <TitleCamera>adicionar foto guia</TitleCamera>
        <ModalPictureContainer onPress={() => tirarFoto('guia')}>
          <ModalPicture source={{uri: fotoGuia}} resizeMode="cover" />
        </ModalPictureContainer>

        <AutoExpandingTextInput
          placeholder="Texto do guia"
          placeholderTextColor={'silver'}
          value={textoGuia}
          onChangeText={setTextoGuia}
          isFocused={false}
          multiline={true}
        />

        <CustomButton texto="Adicionar" onPress={handleItemPress} />
      </ModalContent>
    </Container>
  );
}
