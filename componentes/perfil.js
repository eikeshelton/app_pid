import React from "react";
import { Image, StyleSheet, View, Dimensions, SafeAreaView, Text,Linking } from "react-native";
import foto from "../assets/imagens/fotoperfil.png";
import { tela_login_fundo } from "./tela_login_fundo";
import { TouchableOpacity } from "react-native-gesture-handler";
import BotaoPersonalizado from './botaoPersonalizado';
import GaleriaDeImagens from "./postagens_perfil";



export default function FotoPerfil({ }) {
    const url = 'https://www.gsuplementos.com.br';

  const abrirLink = () => {
    Linking.openURL(url);
};
    return (<>
        <SafeAreaView style={tela_login_fundo.fundo_tela}>
            <View style={estilo.container}>
                <View style={estilo.container_foto_nome}>
                    <Image source={foto} style={estilo.foto}
                        resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível// 

                    />
                    <Text style={estilo.nomeusuario}>Eike</Text>
                </View>
                <View style={estilo.container_pub_seg}>
                    <View style={estilo.container_publicacoes}>
                        <Text style={estilo.numero}>8</Text>
                        <Text style={estilo.publi_seg}>Publicações</Text>
                    </View>
                    <View style={estilo.container_seguidores}>
                        <Text style={estilo.numero}>0</Text>
                        <Text style={estilo.publi_seg}>Seguidores</Text>
                    </View>
                    <View style={estilo.container_seguidos}>
                        <Text style={estilo.numero}>0</Text>
                        <Text style={estilo.publi_seg}>Seguidos</Text>
                    </View>
                </View>
            </View>
            <View style={estilo.container_bio}>
            <Text  style={estilo.bio}>Atleta de fisiculturismo</Text>
            <Text  style={estilo.bio}>Use o cupon maromba e ganhe 10% de desconto</Text>
            <TouchableOpacity onPress={abrirLink}>
            <Text  style={estilo.link}>www.gsuplementos.com.br</Text>
            </TouchableOpacity>
            </View>
            <View  style={estilo.container_botoes}>
                <View style = {estilo.botao_seguir}>
                <BotaoPersonalizado texto="Seguir"/>
                </View>
                <View style = {estilo.botao_mensagem}>
                <BotaoPersonalizado texto="Mensagem"/>
                </View>
            </View>
            
            <GaleriaDeImagens/>
           

        </SafeAreaView>
    </>
    );

}
const estilo = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.20,// Ajuste a altura conforme necessário
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    container_foto_nome: {
        width: Dimensions.get('window').width * 0.22, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.20,// Ajuste a altura conforme necessário
        marginTop:"1%",
        backgroundColor:"blue   "
        
    },
    foto: {
        width: Dimensions.get('window').width * 0.16, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.14, // Ajuste a altura conforme necessário
        borderRadius: 100,
        


    },
    nomeusuario: {
        color: "white",
        flex: 1,
        fontSize: 18,
    },
    container_pub_seg: {
        width: Dimensions.get('window').width * 0.75, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.10, // Ajuste a altura conforme necessário
        flexDirection: "row",


    },
    container_publicacoes: {
        flex: 1,

    },
    container_seguidores: {
        flex: 1,
    },
    container_seguidos: {
        flex: 1,
    },
    numero: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    publi_seg: {
        textAlign: "center",
        fontSize: 15,
        color: "white",

    },
    container_bio:{
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.15,// Ajuste a altura conforme necessário
        
    },
    bio:{
        fontSize:14,
        color:"white"
    },
    link:{
        color: '#0077FF',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    container_botoes:{
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07, // Ajuste a altura conforme necessário
        flexDirection:"row",
    },
    botao_seguir:{
        width: Dimensions.get('window').width * 0.35, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07,// Ajuste a altura conforme necessário
        marginLeft:"2%",
    },
    botao_mensagem:{
        width: Dimensions.get('window').width * 0.35, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.07,// Ajuste a altura conforme necessário
        marginLeft:"5%",
        
        
    },
});
