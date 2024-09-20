import React, {useState} from 'react';
import {
  Container,
  GuildeContainer,
  GuildeImage,
  Guildetitle,
  GuildetitleContainer,
  ModalContent,
  ModalPicture,
  ModalPictureContainer,
  Title,
} from './styles';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
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

interface Props {
  showModal: boolean;
  onDismiss: () => void;
}

export function ModalGuildeCreate({showModal, onDismiss}: Props) {
  const linkCameraFoto = 'https://apppid.s3.amazonaws.com/fotoCamera.png';
  const [fotoCapa, setFotoCapa] = useState(linkCameraFoto);
  const [fotoGuia, setFotoGuia] = useState(linkCameraFoto);
  const [tituloCapa, setTituloCapa] = useState('');
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
  const uploadImageToS3 = async (uri: string) => {
    try {
      // Ler o arquivo como base64
      const fileData = await RNFS.readFile(uri, 'base64');
      const buffer = Buffer.from(fileData, 'base64');

      // Criar um nome de arquivo único para o upload
      const fileName = uri.split('/').pop() || `${Date.now()}.jpg`;

      // Configurar o upload para o S3
      const s3 = new AWS.S3();
      const params = {
        Bucket: 'apppid',
        Key: fileName,
        Body: buffer,
        ContentType: 'image/jpeg', // ou o tipo de imagem correto
      };

      // Enviar a imagem para o S3
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('Erro ao fazer upload da imagem:', err);
          Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
          return;
        }
        console.log('Upload realizado com sucesso:', data.Location);

        // Atualizar o estado com a URL do S3 após o upload
        setFotoCapa(data.Location);
      });
    } catch (error) {
      console.log('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
    }
  };

  const handleItemPress = () => {
    console.log('ok');
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
          <GuildeImage
            source={{uri: fotoCapa}}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </GuildeContainer>
        <CustomButton texto="Foto Capa" onPress={() => tirarFoto('capa')} />

        <ModalPictureContainer>
          <ModalPicture
            source={{uri: fotoGuia}}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </ModalPictureContainer>
        <CustomButton texto="Foto Guia" onPress={() => tirarFoto('guia')} />
        <CustomButton texto="Adicionar" onPress={handleItemPress} />
        <CustomButton texto="Cancelar" onPress={Cancel} />
      </ModalContent>
    </Container>
  );
}
