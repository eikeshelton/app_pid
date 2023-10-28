import React from 'react';
import {Linking } from 'react-native';
import foto from '../../assets/imagens/fotoperfil.png';
import BotaoPersonalizado from '../BotaoPersonalizado';
import GaleriaDeImagens from '../Postagens_perfil';
import { Container, ContainerBioFoll,
     ContainerButtons,
     ContainerFollowed, ContainerFollowers, ContainerPub,
      ContainerPubFoll, FollowButton, LinkButton, MessageButton, PictureContainer, ProfileName,
       ProfilePicture, ScreenBackground, TextBio, TextLinkButton,
        TextNumber, TextPubFoll } from './style';




export default function FotoPerfil({ }) {
    const url = 'https://www.gsuplementos.com.br';

  const abrirLink = () => {
    Linking.openURL(url);
};
    return (<>
        <ScreenBackground>
            <Container>
                <PictureContainer>
                    <ProfilePicture source={foto}
                        resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//

                    />
                    <ProfileName>Eike</ProfileName>
                </PictureContainer>
                < ContainerPubFoll>
                    <ContainerPub>
                        <TextNumber >8</TextNumber>
                        <TextPubFoll >Publicações</TextPubFoll>
                    </ContainerPub>
                    <ContainerFollowers>
                        <TextNumber >0</TextNumber>
                        <TextPubFoll >Seguidores</TextPubFoll>
                    </ContainerFollowers>
                    <ContainerFollowed>
                        <TextNumber >0</TextNumber>
                        <TextPubFoll>Seguidos</TextPubFoll>
                    </ContainerFollowed>
                </ ContainerPubFoll>
            </Container>
            <ContainerBioFoll>
            <TextBio >Atleta de fisiculturismo</TextBio>
            <TextBio >Use o cupon maromba e ganhe 10% de desconto
            </TextBio>
            <LinkButton onPress={abrirLink}>
            <TextLinkButton >www.gsuplementos.com.br</TextLinkButton>
            </LinkButton>
            </ContainerBioFoll>
            <ContainerButtons >
                <FollowButton >
                <BotaoPersonalizado texto="Seguir"/>
                </FollowButton>
                <MessageButton >
                <BotaoPersonalizado  texto="Mensagem"/>
                </MessageButton>
            </ContainerButtons>

            <GaleriaDeImagens/>


        </ScreenBackground>
    </>
    );

}
