import React, {useState} from 'react';
import {Linking} from 'react-native';
import foto from '../../assets/imagens/fotoperfil.png';
import CustonButton from '../../components/CustomizeButton';
import ProfilePost from '../../components/ProfilePost';
import {
  Container,
  ContainerBioFoll,
  ContainerButtons,
  ScreenBackground,
  ContainerFollowed,
  ContainerFollowers,
  ContainerPub,
  ContainerPubFoll,
  LinkButton,
  PictureContainer,
  ProfileName,
  ProfilePicture,
  TextBio,
  TextLinkButton,
  TextNumber,
  TextPubFoll,
  ButtonFollow,
} from './style';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params{
  selectedImage: string
}



export default function Profile() {
  const route = useRoute();



  const [avatar, setAvatar] = useState(foto);

  const url = 'https://www.gsuplementos.com.br';
  const onPress =  () => {
    // Esta função não faz nada, apenas retorna undefined
  };
  const [seguidor, setSeguidor] = useState(0);
  const navigation = useNavigation();

  const abrirLink = () => {
    Linking.openURL(url);
  };
  return (
    <>
      <ScreenBackground>
        <Container>
          <PictureContainer>
            <ProfilePicture
              source={avatar}
              resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
            <ProfileName>Eike</ProfileName>
          </PictureContainer>
          <ContainerPubFoll>
            <ContainerPub>
              <TextNumber>8</TextNumber>
              <TextPubFoll>Publicações</TextPubFoll>
            </ContainerPub>
            <ContainerFollowers>
              <TextNumber>{seguidor}</TextNumber>
              <TextPubFoll>Seguidores</TextPubFoll>
            </ContainerFollowers>
            <ContainerFollowed>
              <TextNumber>0</TextNumber>
              <TextPubFoll>Seguidos</TextPubFoll>
            </ContainerFollowed>
          </ContainerPubFoll>
        </Container>
        <ContainerBioFoll>
          <TextBio>Atleta de fisiculturismo</TextBio>
          <TextBio>Use o cupon maromba e ganhe 10% de desconto</TextBio>
          <LinkButton onPress={abrirLink}>
            <TextLinkButton>www.gsuplementos.com.br</TextLinkButton>
          </LinkButton>
        </ContainerBioFoll>
        <ContainerButtons>
          <ButtonFollow>
            <CustonButton texto="Editar perfil" onPress={() => navigation.navigate('EditProfile')}/>
          </ButtonFollow>

        </ContainerButtons>

        <ProfilePost />
      </ScreenBackground>
    </>
  );
}

