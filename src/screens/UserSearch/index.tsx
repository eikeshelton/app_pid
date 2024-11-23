import React, {useState, useEffect} from 'react';
import {
  Container,
  ScreenBackground,
  ContainerPub,
  ContainerPubFoll,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextNumber,
  TextPubFoll,
  ContainerNameBio,
  ContainerBackbutton,
  ProfileUser,
  HeaderContainer,
  CountContainer,
  ContainerFollowers,
  ContainerFollowed,
  ButtonFollow,
  GuideFlex,
  GuideButton,
  GuildeContainer,
  GuildetitleContainer,
  Guildetitle,
  GuildeImage,
  DeleteIconContainer,
  DeleteButton,
  DeleteIcon,
  ModalContainer,
  ModalTitle,
  ModalPictureContainer,
  ModalPicture,
  ModalTextContainer,
  ModalText,
} from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FotoGuia} from '../../assets/imagens/logo.png';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import BackButton from '../../components/BackButton';
import LiteButton from '../../components/LiteButton';
import axios from '../../services/api';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {Alert, FlatList, Modal, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomizeButton';
import {Loading} from '../../components/Loading';
interface Params {
  selectedItem: {
    id_usuario: number;
    tipo_usuario: string;
    foto_perfil: string;
    nome_usuario: string;
    seguidores: number;
    seguidos: number;
    bio: string;
    login: string;
  };
}
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
export default function UserSearch() {
  const route = useRoute();
  const {user} = useAuth();
  const navigation = useNavigation();
  const params = route.params as Params; // Converter para o tipo esperado
  const {selectedItem: initialSelectedItem} = params;
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [seguindo, Setseguindo] = useState(false);
  const [guias, setGuias] = useState<GuiaCapa[]>([]);
  const [guiaData, setGuiaData] = useState<Guia | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const getCoverGuilde = async () => {
    try {
      const response = await api.get(
        `/buscar/capas/guias/${selectedItem.id_usuario}`,
      );
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
  useEffect(() => {
    getCoverGuilde();
    verificarSeguimento();
    setLoading(false);
  }, [route.params, user, selectedItem]);
  // Chamada para verificar se o usuário segue o outro ao montar o componente
  async function verificarSeguimento() {
    try {
      const response = await axios.get(
        `/verificar_seguimento/${user.id}/${params.selectedItem.id_usuario}`,
      );
      Setseguindo(response.data);
      // Aqui você pode atualizar o estado ou fazer qualquer outra ação com base na resposta
    } catch (error) {
      console.error('Erro ao verificar seguimento:', error);
    }
  }

  if (user && params.selectedItem) {
    verificarSeguimento();
  }

  async function handleFollow() {
    try {
      let response;
      if (seguindo) {
        // Chame o endpoint de deletar (cancelar seguir)
        response = await axios.delete('/seguidores/', {
          data: {
            id_seguidor: user.id,
            id_seguido: selectedItem?.id_usuario,
          },
        });
        Setseguindo(response.data);
      } else {
        // Chame o endpoint de seguir
        response = await axios.post('/seguidores/', {
          id_seguidor: user.id,
          id_seguido: selectedItem?.id_usuario,
        });
        Setseguindo(response.data);
      }

      // Após seguir/desseguir, chame a função para verificar seguidores e seguidos
      await checkFollowers_Followed();
    } catch (error) {
      console.error('Erro ao seguir/desseguir usuário:', error);
    }
  }

  async function checkFollowers_Followed() {
    try {
      const response = await axios.get(
        `/seguidores_seguidos/${selectedItem.id_usuario}`,
      );

      setSelectedItem(prevSelectedItem => ({
        ...prevSelectedItem,
        seguidores: response.data.seguidores,
        seguidos: response.data.seguidos,
      }));
    } catch (error) {
      console.error('Erro ao verificar seguidores e seguidos:', error);
    }
  }
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
            source={
              item.foto_url
                ? {uri: item.foto_url}
                : require('../../assets/imagens/logo.png')
            }
          />
        </GuildeContainer>
      </GuideButton>
    );
  };
  return loading ? (
    <Loading />
  ) : (
    <ScreenBackground>
      <ContainerBackbutton>
        <BackButton />
        <ProfileUser>{selectedItem.login}</ProfileUser>
      </ContainerBackbutton>
      <Container>
        <HeaderContainer>
          <PictureContainer>
            {selectedItem.foto_perfil ? (
              <ProfilePicture
                source={{uri: selectedItem.foto_perfil}}
                resizeMode="cover"
              />
            ) : (
              <ProfilePicture source={fotoPerfil} resizeMode="cover" />
            )}
            <ProfileName>{selectedItem.nome_usuario}</ProfileName>
          </PictureContainer>
        </HeaderContainer>
        <CountContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidores',
                  id: selectedItem.id_usuario,
                })
              }>
              <TextNumber>{selectedItem.seguidores}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed
              onPress={() =>
                navigation.navigate('Followers_Followed', {
                  type: 'seguidos',
                  id: selectedItem.id_usuario,
                })
              }>
              <TextNumber>{selectedItem.seguidos}</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerFollowed>
          </ContainerPubFoll>
        </CountContainer>
      </Container>
      <ContainerNameBio>
        <TextBio>{selectedItem.bio}</TextBio>
      </ContainerNameBio>
      <ButtonFollow>
        <LiteButton
          texto={seguindo ? 'Seguindo' : 'Seguir'}
          onPress={() => {
            handleFollow();
          }}
        />
        <LiteButton
          texto="Mensagem"
          onPress={() => navigation.navigate('Chat', {selectedItem})}
        />
      </ButtonFollow>
      <GuideFlex>
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={false}
          data={[...guias, {isIcon: true} as GuiaCapa]} // Adiciona um item extra no final da lista
          renderItem={({item}) => (item.foto_url ? renderItem({item}) : null)}
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
    </ScreenBackground>
  );
}
