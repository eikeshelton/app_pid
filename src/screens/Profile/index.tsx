import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import messaging from '@react-native-firebase/messaging';
import CustomButton from '../../components/CustomizeButton';
import LiteButton from '../../components/LiteButton';
import {
  Container,
  ScreenBackground,
  ContainerFollowed,
  ContainerFollowers,
  ContainerPub,
  ContainerPubFoll,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextNumber,
  TextPubFoll,
  ButtonFollow,
  ContainerNameBio,
  SettingContainer,
  SettingButton,
  SettingIcon,
  CountContainer,
  Header,
  RequestsButton,
  RequestsIcon,
  Number,
  Guildetitle,
  GuildeImage,
  GuildeContainer,
  GuideButton,
  GuideFlex,
  ModalContainer,
  ModalTitle,
  ModalPicture,
  ModalPictureContainer,
  ModalText,
  ModalTextContainer,
  GuildetitleContainer,
  AddFoodContainer,
  DeleteIcon,
  DeleteIconContainer,
  DeleteButton,
} from './style';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useAuth} from '../../hooks/auth';
import {Loading} from '../../components/Loading';
import PushNotification from 'react-native-push-notification';
import {Alert, FlatList, Modal, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FotoGuia from '../../assets/imagens/logo.png';
import {ModalGuildeCreate} from '../../components/ModalGuildeCreate';
interface GuiaCapa {
  id_guias: number;
  titulo: string;
  foto_url: string | 'https://apppid.s3.amazonaws.com/logo.png';
  id_usuario: number;
  isIcon?: boolean;
}
interface Guia {
  id_usuario: number;
  titulo_guia: string;
  id_guia: number;
  foto_guia: string;
  id: number;
  texto_guia: string;
}
export default function Profile() {
  const {user, updateUser} = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const [focado, setFocado] = useState(false);
  const [guias, setGuias] = useState<GuiaCapa[]>([]);
  const [guiaData, setGuiaData] = useState<Guia | null>(null);
  /*const [imageSizes, setImageSizes] = useState<{
    [key: number]: {width: number; height: number};
  }>({});*/

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateVisible, setmodalCreateVisibleVisible] = useState(false);
  /*const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;*/
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações:', error);
    }
  };

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        try {
          await api.post('/atualizar-fcm-token/', {
            fcm_token: fcmToken,
            id_usuario: user.id,
          });
        } catch (error) {
          console.error('Erro ao enviar o token FCM:', error);
        }
      }
    } catch (error) {
      console.error('Erro ao obter o token FCM:', error);
    }
  };

  const getCoverGuilde = async () => {
    try {
      const response = await api.get(`/buscar/capas/guias/${user.id}`);
      setGuias(response.data);
      /*response.data.forEach((guia: GuiaCapa) => {
        Image.getSize(
          guia.foto_url,
          (width, height) => {
            const aspectRatio = width / height;
            let newWidth = screenWidth;
            let newHeight = screenWidth / aspectRatio;

            if (newHeight > screenHeight) {
              newHeight = screenHeight;
              newWidth = screenHeight * aspectRatio;
            }

            setImageSizes(prev => ({
              ...prev,
              [guia.id_guias]: {width: newWidth, height: newHeight},
            }));
          },
          error => console.error('Erro ao obter o tamanho da imagem:', error),
        );
      });*/
    } catch (error) {
      console.error('Erro ao buscar guias:', error);
    }
  };

  const fetchProfileData = () => {
    updateUser({
      id: user.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!isFocused) {
      return; // Retorna sem fazer nada se não estiver focado
    }
    fetchProfileData();
    requestUserPermission();
    getToken();
    getCoverGuilde();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        // Verifique se o campo android e imageUrl existem
        const imageUrl = remoteMessage.notification.android?.imageUrl || '';

        setFocado(true);
        PushNotification.localNotification({
          channelId: 'notificacao',
          title: remoteMessage.notification.title || 'Nova Notificação',
          message: remoteMessage.notification.body || '',
          playSound: true,
          importance: 'default',
          largeIconUrl: imageUrl, // Utilizando a imagem corretamente
          smallIcon: 'custon_smart_icon',
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      setFocado(true);
      console.log('Notificação em segundo plano:', remoteMessage);
    });

    return unsubscribe;
  }, [isFocused, modalVisible]);

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const handleRequests = () => {
    setFocado(false);
    navigation.navigate('Requests');
  };

  const handleGuidePress = (item: any) => {
    getGuilde(item); // Chama a requisição
  };
  const getGuilde = async (item: number) => {
    try {
      const response = await api.get(`/buscar/guias/id/${item}`);
      setGuiaData(response.data);
    } catch (error) {
      console.error('Erro ao buscar guias:', error);
    } finally {
      // Finaliza o carregamento após a requisição (com sucesso ou erro)
      setModalVisible(true);
    }
  };

  const deleteGuia = async () => {
    try {
      // Exibe o alerta de confirmação
      Alert.alert(
        'Confirmar Deleção',
        'Você tem certeza que deseja apagar este guia?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              // Chamada à função de deleção no backend
              try {
                const response = await api.delete(`/guia/${guiaData?.id_guia}`);
                console.log(response.data);
                setModalVisible(false);
                // Aqui você pode adicionar lógica adicional, como atualizar a lista de guias
              } catch (error) {
                console.error('Erro ao deletar guia:', error);
                // Aqui você pode adicionar lógica para exibir um erro ao usuário
              }
            },
          },
        ],
      );
    } catch (error) {
      console.error('Erro ao exibir alerta:', error);
    }
  };

  const renderItem = ({item}: {item: GuiaCapa}) => {
    return (
      <GuideButton onPress={() => handleGuidePress(item.id_guias)}>
        <GuildeContainer>
          <GuildetitleContainer>
            <Guildetitle adjustsFontSizeToFit numberOfLines={3}>
              {item.titulo}
            </Guildetitle>
          </GuildetitleContainer>
          <GuildeImage
            source={{uri: item.foto_url}}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </GuildeContainer>
      </GuideButton>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <ScreenBackground>
      <ScrollView>
        <Container>
          <Header>
            <RequestsButton onPress={handleRequests}>
              <RequestsIcon name="addusergroup" focado={focado} />
              <Number focado={focado}>{1}</Number>
            </RequestsButton>
            <SettingContainer>
              <SettingButton onPress={handleSettings}>
                <SettingIcon name="menu" />
              </SettingButton>
            </SettingContainer>
          </Header>

          <PictureContainer>
            {user.foto_perfil ? (
              <ProfilePicture
                source={{uri: user.foto_perfil}}
                resizeMode="cover"
              />
            ) : (
              <ProfilePicture source={fotoPerfil} resizeMode="cover" />
            )}
            <ProfileName>{user.nome_usuario}</ProfileName>
          </PictureContainer>

          <CountContainer>
            <ContainerPubFoll>
              <ContainerPub>
                <TextNumber>{user.publicacoes}</TextNumber>
                <TextPubFoll>Publicações</TextPubFoll>
              </ContainerPub>
              <ContainerFollowers
                onPress={() =>
                  navigation.navigate('Followers_Followed', {
                    type: 'seguidores',
                    id: user.id,
                  })
                }>
                <TextNumber>{user.seguidores}</TextNumber>
                <TextPubFoll>Seguidores</TextPubFoll>
              </ContainerFollowers>

              <ContainerFollowed
                onPress={() =>
                  navigation.navigate('Followers_Followed', {
                    type: 'seguidos',
                    id: user.id,
                  })
                }>
                <TextNumber>{user.seguidos}</TextNumber>
                <TextPubFoll>Seguidos</TextPubFoll>
              </ContainerFollowed>
            </ContainerPubFoll>
          </CountContainer>
        </Container>
        <ContainerNameBio>
          <TextBio>{user.bio}</TextBio>
        </ContainerNameBio>
        <ButtonFollow>
          <LiteButton
            texto="Editar Perfil"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <LiteButton
            texto="Abrir Chat"
            onPress={() => navigation.navigate('ScreenChat')}
          />
        </ButtonFollow>
        <GuideFlex>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={[...guias, {isIcon: true} as GuiaCapa]} // Adiciona um item extra no final da lista
            renderItem={({item}) => {
              if (item.isIcon) {
                // Renderiza o ícone
                return (
                  <AddFoodContainer>
                    <Ionicons
                      name="add"
                      size={100}
                      color="#934dd2"
                      onPress={() => {
                        setmodalCreateVisibleVisible(true);
                      }}
                    />
                  </AddFoodContainer>
                );
              }

              // Renderiza os outros itens normalmente
              return renderItem({item: item as GuiaCapa});
            }}
            keyExtractor={(item, index) =>
              item.isIcon ? `icon-${index}` : item.id_guias.toString()
            }
            numColumns={2}
          />
        </GuideFlex>

        <Modal visible={modalVisible} animationType="slide">
          <ModalContainer>
            <ScrollView>
              <DeleteIconContainer>
                <DeleteButton onPress={deleteGuia}>
                  <DeleteIcon name="delete" color="#934dd2" size={35} />
                </DeleteButton>
              </DeleteIconContainer>
              <ModalTitle>{guiaData?.titulo_guia}</ModalTitle>
              <ModalPictureContainer>
                <ModalPicture
                  source={
                    guiaData?.foto_guia ? {uri: guiaData?.foto_guia} : FotoGuia
                  }
                  resizeMode="cover"
                />
              </ModalPictureContainer>
              <ModalTextContainer>
                <ModalText>{guiaData?.texto_guia}</ModalText>
              </ModalTextContainer>
            </ScrollView>
            <CustomButton
              texto="Cancelar"
              onPress={() => setModalVisible(false)}
            />
          </ModalContainer>
        </Modal>
      </ScrollView>
      <ModalGuildeCreate
        onDismiss={() => setmodalCreateVisibleVisible(false)}
        showModal={modalCreateVisible}
      />
    </ScreenBackground>
  );
}
