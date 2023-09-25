import React from "react";
import { Image, StyleSheet,View,Dimensions } from "react-native";
import logo from "../assets/imagens/logo4.png"
export default function Topo_imagem({ }) {
    return (<>
        <View style = {estilo.container}>
            <Image source={logo} style={estilo.logo}
            resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível// 
            />
        </View>
    </>
    );
}
const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.25, // Ajuste a altura conforme necessário
    },
});
