import React from 'react';
import {StyleSheet, View, Dimensions, Text,Linking } from 'react-native';
import foto from '../../assets/imagens/fotoperfil.png';

import { TouchableOpacity } from 'react-native-gesture-handler';
import BotaoPersonalizado from '../BotaoPersonalizado';
import GaleriaDeImagens from '../postagens_perfil';
import { Container, ContainerBioFoll, ContainerFollowed, ContainerFollowers, ContainerPub, ContainerPubFoll, LinkButton, PictureContainer, ProfileName, ProfilePicture, ScreenBackground, TextBio, TextNumber, TextPubFoll } from './style';




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
            <Text  style={estilo.link}>www.gsuplementos.com.br</Text>
            </LinkButton>
            </ContainerBioFoll>
            <View  style={estilo.container_botoes}>
                <View style = {estilo.botao_seguir}>
                <BotaoPersonalizado texto="Seguir"/>
                </View>
                <View style = {estilo.botao_mensagem}>
                <BotaoPersonalizado  texto="Mensagem"/>
                </View>
            </View>

            <GaleriaDeImagens/>


        </ScreenBackground>
    </>
    );

}
const estilo = StyleSheet.create({
    link:{
        color: '#0077FF',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    container_botoes:{
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07, // Ajuste a altura conforme necessário
        flexDirection:'row',
    },
    botao_seguir:{
        width: Dimensions.get('window').width * 0.35, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07,// Ajuste a altura conforme necessário
        marginLeft:'2%',
    },
    botao_mensagem:{
        width: Dimensions.get('window').width * 0.35, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07,// Ajuste a altura conforme necessário
        marginLeft:'5%',


    },
});
